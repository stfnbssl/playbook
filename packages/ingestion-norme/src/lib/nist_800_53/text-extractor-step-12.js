// extractor.js (CommonJS)
// Uso: node extractor.js /path/to/config.json 1
const fs = require('fs');
const path = require('path');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync, writeFileSync,
  isRegExp, parseRegExp, cleanHiddenUnicodeCharacters} = require('../utils');

const isDebug = true;

function safeArray(x) {
  return Array.isArray(x) ? x : [];
}

function textualize(items, propName) {
  return items ? items.map(item => item[propName]).join(' ') : null;
}

function interpolateTemplate(template, params, options = {}) {
  const { 
    strict = false,           // Se true, lancia errore per variabili mancanti
    placeholder = '',         // Valore di default per variabili mancanti
    logMissing = true       // Se true, logga le variabili mancanti
  } = options;
  
  const missing = [];
  const paramsGuidelines = [];
  
  const result = template.replace(/\{\{\s*insert:\s*param,\s*([^}]+?)\s*\}\}/g, (match, paramName) => {
    const cleanParamName = paramName.trim();
    
    if (params.hasOwnProperty(cleanParamName)) {
      if (params[cleanParamName].guidelines) {
        paramsGuidelines.push({
          param: paramName,
          guidelines: params[cleanParamName].guidelines
        })
      }
      return '[insert: ' + params[cleanParamName].label + ' ('+ paramName + ')]';
    } else {
      missing.push(cleanParamName);
      
      if (strict) {
        throw new Error(`Missing parameter: ${cleanParamName}`);
      }
      
      return placeholder;
    }
  });
  
  if (logMissing && missing.length > 0) {
    console.warn('Missing parameters:', missing);
  }
  
  return [result, paramsGuidelines];
}

// Esempio d'uso
// const template = "Text with {{ insert: param, existing }} and {{ insert: param, missing }}";
// const params = { existing: 'FOUND' };

function normalizeCatalog(json) {
  // La forma canonica è { catalog: { metadata, groups, controls? } }
  const cat = json.catalog || json;
  const metadata = cat.metadata || {};
  const groups = safeArray(cat.groups);

  // Alcuni cataloghi possono avere controlli a livello root
  const rootControls = safeArray(cat.controls);

  return { metadata, groups, rootControls };
}

function collectProseByName(parts, name) {
  const out = [];
  (function walk(arr) {
    safeArray(arr).forEach((p) => {
      if (p && typeof p === "object") {
        if (p.name === name && p.prose) out.push(p.prose);
        if (p.parts) walk(p.parts);
      }
    });
  })(parts);
  return out;
}

function getParamsList(params, ctx) {
  if (!params || !params.length) return null;
  const retval = [];
  params.forEach(param =>{
    const paramObj = {
      count: ctx.paramCount++,
      json: JSON.stringify(param),
      id: param.id,
      class: param.class,
      label: param.label,
      usage: param.usage,
      // props: param.props,
      links: param.links,
      constraints: param.constraints,
      guidelines: textualize(param.guidelines, 'prose'),
      values: param.values,
      select: param.select,
      remarks: param.remarks,
    }
    if (paramObj.select) {
      if (paramObj.select["how-many"] == "one-or-more") {
        paramObj.label = 'one or more of `' + paramObj.select.choice.join('`, `') + '`'
      } else if (!paramObj.select["how-many"]) {
        paramObj.label = 'one or none of `' + paramObj.select.choice.join('`, `') + '`'
      } else {
        throw new Error("Missing: " + paramObj.select["how-many"]);
      }
    }
    ctx.params[param.id] = paramObj; 
    retval.push(paramObj.id);
  });
  return retval;
}

const checkids = {}

function getPartsList(parts, ctx, parentObj) {
  if (!parts || !parts.length) return null;
  const retval = {};
  parts.forEach(part =>{
    if (part.name == "statement") {
      const statementArray = [];
      if (part.parts) {
        part.parts.forEach(part2 =>{
          if (part2.name == "item") {
            if (part2.prose && part2.prose.endsWith(':')) {
              part2.parts.forEach(part3 =>{
                if (part3.prose && part3.prose.endsWith(':')) {
                    part3.parts.forEach(part4 =>{
                      statementArray.push({
                        count: ctx.controlCount++,
                        id: part4.id,
                        text: part2.prose + ' ' + part3.prose  + ' ' + part4.prose 
                      })
                    });
                } else {
                  statementArray.push({
                    count: ctx.controlCount++,
                    id: part3.id,
                    text: part2.prose + ' ' + part3.prose 
                  })
                }
              })
            } else {
              statementArray.push({
                count: ctx.controlCount++,
                id: part2.id,
                text: part2.prose
              })
            }
          }
        });
      }
      retval.statements = statementArray;
    } else {
      let partObj = {
          count: ctx.partCount++, json: JSON.stringify(part),
          id: part.id, name: part.name, prose: part.prose, /*parts: [ part.parts ],*/
          parentId: parentObj ? parentObj.id : null
      }
      if (part.parts) {
        partObj = Object.assign({}, 
          partObj, 
          getPartsList(part.parts, ctx, partObj)
        );
      }
      let partTypeObj = retval[part.name];
      if (!partTypeObj) {
        retval[part.name] = [partObj];
        partTypeObj = retval[part.name];
      } else {
        partTypeObj.push(partObj);
      }
      if (part.id) {
        if (checkids[part.id]) throw new Error(part.id);
        checkids[part.id] = true;
        ctx.parts[part.id] = partTypeObj;
      } else {
        console.log("assessment-object-" + ctx.partCount);
        ctx.parts["assessment-object-" + ctx.partCount] = partTypeObj;
      }
    }
  });
  return retval;
}

function getControlsList(controls, ctx) {
  if (!controls || !controls.length) return null;
  const retval = [];
  controls.forEach(control => {
    // console.log("control", Object.keys(control));
    let controlObj = {
      count: ctx.controlCount++,
      id: control.id,
      class: control.class,
      title: control.title,
      params: getParamsList(control.params, ctx),
    }
    controlObj.controls = getControlsList(control.controls, ctx);
    controlObj = Object.assign({}, 
      controlObj, 
      getPartsList(control.parts, ctx, controlObj)
    );
    // ctx.controls.push(controlObj);
    retval.push(controlObj);
  });
  return retval;
}

function extractRequirements(params) {
    const {
      inputJSONPath,
      outputJSONPath,
    } = params;
    if (!inputJSONPath || !outputJSONPath) {
      exitWithError('Parametri mancanti: servono "inputJSONPath" e "outputJSONPath" dentro ' + __filename);
    }
    // see https://pages.nist.gov/OSCAL/learn/concepts/layer/control/catalog/sp800-53rev5-example/
    let json = readJSONSync(inputJSONPath);
    json = normalizeCatalog(json);
    console.log(Object.keys(json));
    console.log(Object.keys(json.rootControls));
    console.log(Object.keys(json.metadata));
    console.log(Object.keys(json.groups));
    let ctx = {
      controlCount: 1,
      paramCount: 1,
      partCount: 1,
      controls: [],
      params: {},
      props: {},
      parts: {},
    };
    json.groups.forEach(group => {
        // console.log("group", Object.keys(group));
        // console.log("group.parts", Object.keys(group.parts || {}));
        group.controls.forEach(control => {
            const controlObj = {
              count: ctx.controlCount++,
              groupId: group.id,
              // groupClass: group.class,
              groupTitle: group.title,
              id: control.id,
              // class: control.class,
              title: control.title,
              params: getParamsList(control.params, ctx),
              controlEnhancements: getControlsList(control.controls, ctx),
            }
            // console.log("control.parts", Object.keys(control.parts || {}));
            ctx.controls.push(
              Object.assign({}, controlObj, 
                getPartsList(control.parts, ctx, controlObj))
            );
        });
    });
    ctx.controls.forEach(control=> {
      if (control.statements) {
        control.statements.forEach(stm => {
          const results = interpolateTemplate(stm.text, ctx.params);
          stm.textDisplay = results[0];
          stm.paramGuidelines = results[1];
          if (control.controlEnhancements && control.controlEnhancements.length) {
            control.controlEnhancements.forEach(controlEnh => {
              if (controlEnh.statements) {
                controlEnh.statements.forEach(stm2 => {
                  const results = interpolateTemplate(stm2.text, ctx.params);
                  stm2.textDisplay = results[0];
                  stm2.paramGuidelines = results[1];
                })
              }
            })
          }
        })
      }
    })
    if (ctx.parts) {
      console.log("parts.lebgth", Object.values(ctx.parts).length);
      Object.values(ctx.parts).forEach(partArray=> {
        partArray.forEach(part => {
          if (part && part.prose) {
              const results = interpolateTemplate(part.prose, ctx.params);
              if (part.prose != results[0]) {
                part.proseDisplay = results[0];
                part.proseGuidelines = results[1];
                console.log(results);
              }
          }
        })
      })
    }
    ensureDirSync(params.outputJSONPath);
    writeJSONSync(params.outputJSONPath, ctx);
    writeJSONSync(path.join(path.dirname(params.outputJSONPath), 'controls.json'), ctx.controls);
    writeJSONSync(path.join(path.dirname(params.outputJSONPath), 'params.json'), ctx.params);
    writeJSONSync(path.join(path.dirname(params.outputJSONPath), 'parts.json'), ctx.parts);
    console.log(`✅ Creato file ${params.outputJSONPath} con successo!`);
}

function main() {
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
  extractRequirements(params);
}
if (require.main === module) {
  main();
}
