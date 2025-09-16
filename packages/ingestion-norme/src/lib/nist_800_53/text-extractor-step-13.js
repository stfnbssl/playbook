#!/usr/bin/env node
/**
 * Extract IDs from a large JSON instance, guided by a JSON Schema (Draft-07+ assumed).
 * CommonJS JavaScript. Includes verbose debug and optional instance $ref resolution.
 *
 * Usage
 *   node extract-ids-from-json-instance-v2.cjs \
 *     --schema schema.json \
 *     --data data.json \
 *     --out ids.json \
 *     [--idNames id,_id,uuid,guid,role-id,party-uuid,location-uuid,identifier] \
 *     [--maxDepth 1000] \
 *     [--debug] \
 *     [--resolveInstanceRefs]
 */

const fs = require('fs');
const path = require('path');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync, writeFileSync,
  isRegExp, parseRegExp, cleanHiddenUnicodeCharacters} = require('../utils');

// ------------------ CLI ------------------
function parseArgs(argv) {
  const opts = {
    schemaPath: '',
    dataPath: undefined,
    outPath: undefined,
    idNames: ['id','_id','uuid','guid','role-id','party-uuid','location-uuid','identifier'],
    maxDepth: 1000,
    debug: false,
    resolveInstanceRefs: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    switch (a) {
      case '--schema': opts.schemaPath = next(); break;
      case '--data': opts.dataPath = next(); break;
      case '--out': opts.outPath = next(); break;
      case '--idNames': opts.idNames = next().split(',').map(s=>s.trim()).filter(Boolean); break;
      case '--maxDepth': opts.maxDepth = parseInt(next(),10); break;
      case '--debug': opts.debug = true; break;
      case '--resolveInstanceRefs': opts.resolveInstanceRefs = true; break;
      case '-h': case '--help': printHelp(); process.exit(0);
      default:
        if (a && a.startsWith('--')) console.warn(`Unknown option: ${a}`);
    }
  }
  if (!opts.schemaPath) {
    console.error('Error: --schema <schema.json> is required');
    printHelp();
    process.exit(1);
  }
  return opts;
}

function printHelp() {
  console.log(`\nExtract IDs from JSON guided by a JSON Schema (CommonJS)\n\nUsage:\n  node extract-ids-from-json-instance-v2.cjs \\
    --schema schema.json \\
    [--data data.json] \\
    [--out ids.json] \\
    [--idNames id,_id,uuid,guid,role-id,party-uuid,location-uuid,identifier] \\
    [--maxDepth 1000] \\
    [--debug] \\
    [--resolveInstanceRefs]\n\nOptions:\n  --resolveInstanceRefs  Resolve local JSON Pointers found as "$ref" inside the DATA instance.\n`);
}

// ------------------ Schema utilities ------------------
function SchemaResolver(root) {
  this.root = root || {};
  this.byAbs = new Map();
  const defs = Object.assign({}, root.$defs || {}, root.definitions || {});
  Object.entries(defs).forEach(([k,v])=>{
    this.byAbs.set(`#/$defs/${k}`, v);
    this.byAbs.set(`#/definitions/${k}`, v);
  });
}
SchemaResolver.prototype.deref = function(schema){
  if (!schema || !schema.$ref) return schema;
  const ref = schema.$ref;
  if (typeof ref === 'string' && ref.startsWith('#/')) {
    const got = this.byAbs.get(ref);
    if (got) return this.deref(got);
    const target = resolvePointer(this.root, ref.substring(1));
    return target ? this.deref(target) : schema;
  }
  return schema; // external refs not resolved
};

function resolvePointer(obj, pointer) {
  const parts = String(pointer).split('/').filter(Boolean).map(p=>p.replace(/~1/g,'/').replace(/~0/g,'~'));
  let cur = obj;
  for (const part of parts) {
    if (cur && typeof cur === 'object' && part in cur) cur = cur[part]; else return undefined;
  }
  return cur;
}

function isObjectType(s) {
  const t = s && s.type;
  if (!t) return true; // unspecified -> permissive
  if (Array.isArray(t)) return t.includes('object');
  return t === 'object';
}

function mergeAllOf(s) {
  if (!s || !s.allOf) return s;
  const base = Object.assign({}, s);
  delete base.allOf;
  s.allOf.forEach(sub => Object.assign(base, sub));
  return base;
}

function discoverIDBearingSchemas(root, idNames) {
  const res = new SchemaResolver(root);
  const out = [];
  const idNameSet = new Set(idNames.map(n=>n.toLowerCase()));

  function looksLikeIDName(pName){
    const pn = String(pName).toLowerCase();
    if (idNameSet.has(pn)) return true;
    if (/(^|[\-_])id$/.test(pn)) return true; // id or -id
    if (/(^|[\-_])uuid$/.test(pn)) return true; // uuid or -uuid
    return false;
  }

  function isScalarSchema(p){
    const t = p && p.type;
    if (!t) return true;
    if (typeof t === 'string') return ['string','integer','number'].includes(t);
    if (Array.isArray(t)) return t.some(x=>['string','integer','number'].includes(x));
    return false;
  }

  function looksLikeIDFormat(p){
    if (!p) return false;
    if (p.format && ['uuid','uri','uri-reference'].includes(p.format)) return true;
    if (typeof p.pattern === 'string' && /[0-9a-fA-F-]{8,}/.test(p.pattern)) return true;
    if (p.$ref && typeof p.$ref === 'string' && /UUIDDatatype|TokenDatatype/.test(p.$ref)) return true;
    return false;
  }

  function walk(node, pathParts){
    const s = mergeAllOf(res.deref(node) || {});
    console.log(1, node, pathParts)

    if (s.items) {
      const items = Array.isArray(s.items) ? s.items : [s.items];
      items.forEach((it, idx) => walk(it, pathParts.concat(`items[${idx}]`)));
    }

    ['anyOf','oneOf'].forEach(k=>{
      const arr = s[k];
      if (Array.isArray(arr)) arr.forEach((sub, idx)=>walk(sub, pathParts.concat(`${k}[${idx}]`)));
    });

    if (isObjectType(s)) {
      const props = s.properties || {};
      const ids = [];
      for (const [pName, pSchema] of Object.entries(props)) {
        console.log(1, pName, pSchema)
        const p = res.deref(pSchema) || {};
        console.log(2, p)
        const nameLooks = looksLikeIDName(pName);
        const formatLooks = looksLikeIDFormat(p);
        const scalar = isScalarSchema(p);
        const arrayOfScalars = p && p.type === 'array' && p.items && isScalarSchema(res.deref(p.items));
        if ((scalar && (nameLooks || formatLooks)) || (arrayOfScalars && (nameLooks || formatLooks))) {
          ids.push(pName);
        }
      }
      if (ids.length) {
        const key = s.title || pathParts.join('/') || '(root)';
        out.push({ key, path: `#/${pathParts.join('/')}`, schema: s, idProps: ids });
        console.log(3, key)
      }

      if (s.patternProperties) {
        Object.entries(s.patternProperties).forEach(([pat, sub])=>{
          walk(sub, pathParts.concat(`patternProperties(${pat})`));
        });
      }
      if (s.additionalProperties && typeof s.additionalProperties === 'object') {
        walk(s.additionalProperties, pathParts.concat('additionalProperties'));
      }
    }
  }

  walk(root, []);

  const dedup = new Map();
  for (const d of out) {
    const sig = `${d.key}|${d.idProps.slice().sort().join(',')}`;
    if (!dedup.has(sig)) dedup.set(sig, d);
  }
  return Array.from(dedup.values());
}

// ------------------ Instance traversal ------------------
function collectIDsFromData(data, idSchemas, maxDepth, debug, opts){
  const buckets = {};
  const counters = {};
  idSchemas.forEach(s=> {
    buckets[s.key] = new Set();
    counters[s.key] = 0;
  });

  const rootData = data;

  function resolveInstancePointer(pointer){
    if (typeof pointer !== 'string') return undefined;
    let p = pointer;
    if (p.startsWith('#/')) p = p.slice(1);
    const parts = p.split('/').filter(Boolean).map(x=>x.replace(/~1/g,'/').replace(/~0/g,'~'));
    let cur = rootData;
    for (const part of parts) {
      if (cur && typeof cur === 'object' && part in cur) cur = cur[part]; else return undefined;
    }
    return cur;
  }

  function addVal(key, v){
    if (v === undefined || v === null) return;
    const str = String(v);
    if (str && str.trim()) {
      buckets[key].add(str.trim());
      counters[key]++;
    }
  }

  function visit(node, depth){
    if (depth <= 0) return;

    // resolve instance-level { "$ref": "#/..." }
    if (opts && opts.resolveInstanceRefs && node && typeof node === 'object' && !Array.isArray(node) && Object.prototype.hasOwnProperty.call(node, '$ref')) {
      const refVal = node['$ref'];
      if (typeof refVal === 'string' && refVal.startsWith('#/')) {
        const target = resolveInstancePointer(refVal);
        if (target !== undefined) node = target;
      }
    }

    if (Array.isArray(node)) { node.forEach(it=>visit(it, depth-1)); return; }
    if (node && typeof node === 'object') {
      const obj = node;
      for (const s of idSchemas) {
        for (const p of s.idProps) {
          if (Object.prototype.hasOwnProperty.call(obj, p)) {
            const val = obj[p];
            if (Array.isArray(val)) val.forEach(v=>addVal(s.key, v));
            else if (typeof val !== 'object') addVal(s.key, val);
          }
        }
      }
      for (const v of Object.values(obj)) visit(v, depth-1);
    }
  }

  visit(data, maxDepth);

  const out = {};
  for (const [k, set] of Object.entries(buckets)) {
    out[k] = Array.from(set.values()).sort();
  }

  if (debug) {
    console.error("\n[DEBUG] ID collection summary:");
    for (const k of Object.keys(buckets)) {
      console.error(`  ${k}: ${counters[k]} values seen, ${out[k].length} unique.`);
      if (out[k].length) {
        console.error(`    Sample: ${out[k].slice(0,5).join(', ')}${out[k].length>5?' ...':''}`);
      }
    }
  }

  return out;
}

// ------------------ Main ------------------
(function main(){
  const opts = parseArgs2(process.argv);
  const schemaText = fs.readFileSync(path.resolve(opts.schemaPath), 'utf8');
  const schema = JSON.parse(schemaText);

  const idSchemas = discoverIDBearingSchemas(schema, opts.idNames);

  if (!opts.dataPath) {
    const preview = { candidates: idSchemas.map(s=>({ key: s.key, path: s.path, idProps: s.idProps })) };
    console.log(JSON.stringify(preview, null, 2));
    return;
  }

  const dataText = fs.readFileSync(path.resolve(opts.dataPath), 'utf8');
  const data = JSON.parse(dataText);
  const result = collectIDsFromData(data, idSchemas, opts.maxDepth, opts.debug, opts);

  if (opts.outPath) {
    fs.writeFileSync(path.resolve(opts.outPath), JSON.stringify(result, null, 2));
    console.log(`Wrote ${opts.outPath}`);
  } else {
    console.log(JSON.stringify(result, null, 2));
  }
})();

function parseArgs2() {
  const [, , configPath, stepArg] = process.argv;
  if (!configPath || !stepArg) {
    console.log('Uso: node raw-extractor-step-1 <config.json> <stepNumber>');
    process.exit(2);
  }
  const stepNumber = Number(stepArg);
  if (!Number.isInteger(stepNumber)) exitWithError('Il numero di step deve essere un intero.');

  const config = readJSONSync(configPath);
  if (!config || typeof config !== 'object' || !config.nist_800_53) {
    exitWithError('Configurazione non valida: proprietà radice "nist_800_53" mancante.');
  }
  const params = config.nist_800_53["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "nist_800_53.step' + stepNumber + '" mancante.');
  }
  console.log("params", params);
  const {
      inputJSONPath,
      inputJSONSchemaPath,
      outputJSONPath,
  } = params;
  if (!inputJSONPath || !inputJSONSchemaPath || !outputJSONPath) {
      exitWithError('Parametri mancanti: servono "inputJSONPath", "inputJSONSchemaPath" e "outputJSONPath" dentro ' + __filename);
  }
  const opts = {
    schemaPath: inputJSONSchemaPath,
    // dataPath: inputJSONPath,
    outPath: outputJSONPath,
    idNames: ['id','_id','uuid','guid','role-id','party-uuid','location-uuid','identifier'],
    maxDepth: 1000,
    debug: true,
    resolveInstanceRefs: true,
  };
  ensureDirSync(outputJSONPath);
  return opts;
}