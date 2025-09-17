Grandioso. Ecco uno **scheletro Node.js (JavaScript + CommonJS)** che legge il tuo CSV “Risk ↔ Control Mapping” e genera:

1. un **OSCAL Profile (overlay)** da applicare alla baseline (53B),
2. un **OSCAL Implementation (SSP extract)** con `implemented-requirements` mappati ai rischi.

È **self-contained** (usa solo `fs`), con un parser CSV minimale.

---

### File: `generate_oscal_from_csv.js`

```js
/* eslint-disable no-console */
/*
 * generate_oscal_from_csv.js
 * Node.js (CommonJS) — converte un CSV "Risk ↔ Control" in:
 *  - profilo OSCAL (overlay) da applicare alla baseline 53B
 *  - estratto SSP/Implementation con mapping Risk → Control → Evidence
 *
 * USO:
 *   node generate_oscal_from_csv.js \
 *     --csv ./risk_control_mapping.csv \
 *     --baseline-profile ./profiles/800-53b_moderate_profile.json \
 *     --out-profile ./out/ics_overlay_profile.json \
 *     --out-ssp ./out/ics_implementation.json \
 *     --system-id "ICS-PLANT-01"
 *
 * CSV atteso (header esatto):
 * Risk-ID,Risk-Description,Asset/Scenario,NIST-Control-ID,NIST-Control-Title,Overlay-Action (82r3),Tailoring/Compensation,Evidence/Assessment (53A),POA&M-Status
 */

const fs = require('fs');
const path = require('path');

// -------------------- util: parse args --------------------
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 2) {
    const key = argv[i];
    const val = argv[i + 1];
    if (!key || !val) break;
    if (!key.startsWith('--')) continue;
    args[key.slice(2)] = val;
  }
  return args;
}

// -------------------- util: simple CSV parser --------------------
// Supporta:
// - separatore virgola
// - "quote" con virgole interne
// - doppie virgolette escape "" dentro celle quotate
function parseCSV(text) {
  const rows = [];
  let i = 0;
  const n = text.length;
  let cell = '';
  let row = [];
  let inQuotes = false;

  function pushCell() {
    row.push(cell);
    cell = '';
  }
  function pushRow() {
    rows.push(row);
    row = [];
  }

  while (i < n) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        // possibile escape "" o chiusura
        const next = text[i + 1];
        if (next === '"') {
          cell += '"';
          i += 2;
        } else {
          inQuotes = false;
          i += 1;
        }
      } else {
        cell += ch;
        i += 1;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i += 1;
      } else if (ch === ',') {
        pushCell();
        i += 1;
      } else if (ch === '\r') {
        // normalizza CRLF/LF
        i += 1;
      } else if (ch === '\n') {
        pushCell();
        pushRow();
        i += 1;
      } else {
        cell += ch;
        i += 1;
      }
    }
  }
  // ultima cella/riga
  pushCell();
  if (row.length > 1 || (row.length === 1 && row[0] !== '')) pushRow();

  return rows;
}

// -------------------- mapping helpers --------------------
const ACTION = {
  AS_IS: 'AS-IS',
  TAILORED: 'TAILORED',
  REMOVED_NA: 'REMOVED/NA',
  SUPPLEMENTED: 'SUPPLEMENTED',
  ADDED: 'ADDED',
};

function normalizeAction(a) {
  if (!a) return ACTION.AS_IS;
  const s = a.trim().toUpperCase();
  if (s.includes('TAILOR')) return ACTION.TAILORED;
  if (s.includes('REMOVE') || s === 'NA' || s.includes('NOT APPLICABLE')) return ACTION.REMOVED_NA;
  if (s.includes('SUPPLEMENT')) return ACTION.SUPPLEMENTED;
  if (s.includes('ADD')) return ACTION.ADDED;
  return ACTION.AS_IS;
}

// enhancement? es. "sc-7(3)"
function isEnhancement(controlId) {
  return /\([0-9]+\)$/.test(controlId);
}
function baseControlId(controlId) {
  // sc-7(3) -> sc-7
  const m = controlId.match(/^([a-z]{2}-\d+)\(/i);
  return m ? m[1].toLowerCase() : controlId.toLowerCase();
}

// -------------------- builders OSCAL (semplificati / compatibili) --------------------

// Profile skeleton (overlay applicato alla baseline importata)
function buildEmptyProfile(baselineProfileHref, title = 'ICS/OT Overlay (82r3) on Baseline') {
  return {
    profile: {
      uuid: genUuidLike(),
      metadata: {
        title,
        version: '1.0.0',
      },
      imports: [
        {
          href: baselineProfileHref, // es. "./profiles/800-53b_moderate_profile.json"
        },
      ],
      merge: { 'as-is': true, combine: { method: 'keep' } },
      // Le sezioni operative:
      'modify': [],              // array di alters per controlli già inclusi in baseline
      'back-matter': { resources: [] },
    },
  };
}

// Implementation (SSP extract) skeleton
function buildEmptyImplementation(systemId = 'SYSTEM-UNKNOWN', title = 'System Security Plan - Implementation Extract') {
  return {
    'system-security-plan': {
      uuid: genUuidLike(),
      metadata: { title, version: '1.0.0' },
      'system-characteristics': {
        'system-ids': [{ id: systemId }],
        'system-name': systemId,
      },
      'control-implementation': {
        'implemented-requirements': [],
      },
      'back-matter': { resources: [] },
    },
  };
}

// Aggiunge alter/props/parts secondo overlay action
function pushProfileAlter(profileJson, controlId, action, tailoringNote) {
  const overlay = profileJson.profile;
  const cId = baseControlId(controlId);
  const enh = isEnhancement(controlId) ? controlId : null;

  // Cerca se c'è già un alter per quel controllo
  let entry = overlay.modify.find(m => m['control-id'] === cId);
  if (!entry) {
    entry = { 'control-id': cId, alters: [] };
    overlay.modify.push(entry);
  }

  // Costruiamo l'alter
  const props = [];
  const statements = [];

  if (enh) {
    // per enhancements: aggiunta esplicita
    entry.alters.push({
      adds: { 'by-ids': [enh] },
    });
  }

  switch (action) {
    case ACTION.REMOVED_NA:
      props.push({
        name: 'applicability',
        ns: 'https://example/ns/overlay/ics',
        value: 'not-applicable',
        remarks: tailoringNote || 'Marked NA by ICS overlay',
      });
      break;

    case ACTION.TAILORED:
      if (tailoringNote) {
        statements.push({
          where: 'control',
          part: { name: 'guidance', prose: tailoringNote },
        });
      }
      break;

    case ACTION.SUPPLEMENTED:
    case ACTION.ADDED:
      // per la profile: gli "added" che NON sono in baseline
      // — semplificazione: aggiungiamo una prop che traccia la provenienza overlay
      props.push({
        name: 'added-by-overlay',
        ns: 'https://example/ns/overlay/ics',
        value: 'NIST SP 800-82r3',
      });
      if (tailoringNote) {
        statements.push({
          where: 'control',
          part: { name: 'guidance', prose: tailoringNote },
        });
      }
      break;

    case ACTION.AS_IS:
    default:
      if (tailoringNote) {
        // anche "as-is" può avere una guidance aggiuntiva
        statements.push({
          where: 'control',
          part: { name: 'guidance', prose: tailoringNote },
        });
      }
      break;
  }

  const alterObj = {};
  if (props.length) alterObj.adds = Object.assign(alterObj.adds || {}, { props });
  if (statements.length) alterObj.adds = Object.assign(alterObj.adds || {}, { statements });

  if (alterObj.adds) entry.alters.push(alterObj);
}

// implemented-requirement con props di tracciabilità
function pushImplementedRequirement(implJson, row) {
  const impl = implJson['system-security-plan']['control-implementation'];
  const controlId = row['NIST-Control-ID'].trim();
  const cId = baseControlId(controlId);
  const enh = isEnhancement(controlId) ? controlId : null;

  const props = [
    { name: 'risk-id', ns: 'https://example/ns/risk', value: (row['Risk-ID'] || '').trim() },
    { name: 'risk-desc', ns: 'https://example/ns/risk', value: (row['Risk-Description'] || '').trim() },
    { name: 'asset', ns: 'https://example/ns/risk', value: (row['Asset/Scenario'] || '').trim() },
    { name: 'overlay-action', ns: 'https://example/ns/overlay/ics', value: normalizeAction(row['Overlay-Action (82r3)']) },
  ];

  const tailoring = (row['Tailoring/Compensation'] || '').trim();
  if (tailoring) props.push({ name: 'tailoring-note', ns: 'https://example/ns/overlay/ics', value: tailoring });

  const poam = (row['POA&M-Status'] || '').trim();
  if (poam) props.push({ name: 'poam-status', ns: 'https://example/ns/poam', value: poam });

  const evid = (row['Evidence/Assessment (53A)'] || '').trim();
  const implementedReq = {
    uuid: genUuidLike(),
    'control-id': cId,
    props,
  };

  if (enh) {
    implementedReq['by-components'] = [
      {
        uuid: genUuidLike(),
        description: `Enhancement ${enh} implementation`,
        'set-parameters': [],
        remarks: '',
      },
    ];
    // traccia enhancement come prop
    implementedReq.props.push({ name: 'enhancement', ns: 'https://example/ns/overlay/ics', value: enh });
  }

  if (evid) {
    implementedReq.links = [
      {
        rel: 'evidence',
        href: `evidence://${sanitizeRef(evid)}`,
      },
    ];
  }

  impl['implemented-requirements'].push(implementedReq);
}

// -------------------- main --------------------
(async function main() {
  const args = parseArgs(process.argv);
  const csvPath = args.csv || './risk_control_mapping.csv';
  const baselineProfileHref = args['baseline-profile'] || './profiles/800-53b_moderate_profile.json';
  const outProfile = args['out-profile'] || './out/ics_overlay_profile.json';
  const outSSP = args['out-ssp'] || './out/ics_implementation.json';
  const systemId = args['system-id'] || 'ICS-SYSTEM';

  // lettura CSV
  const csvText = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csvText);
  if (!rows.length) {
    console.error('CSV vuoto o non valido.');
    process.exit(1);
  }

  const header = rows[0].map(h => h.trim());
  const dataRows = rows.slice(1).map(r => {
    const obj = {};
    header.forEach((h, i) => { obj[h] = (r[i] ?? '').trim(); });
    return obj;
  });

  // costrutti OSCAL
  const profileJson = buildEmptyProfile(baselineProfileHref);
  const implJson = buildEmptyImplementation(systemId);

  // indicizzazione per "controllo" per evitare alter duplicati identici
  const seenProfileAlterKey = new Set();
  const seenImplKey = new Set();

  for (const row of dataRows) {
    const controlIdRaw = (row['NIST-Control-ID'] || '').trim();
    if (!controlIdRaw) continue;

    const action = normalizeAction(row['Overlay-Action (82r3)']);
    const tailoring = (row['Tailoring/Compensation'] || '').trim();

    // PROFILE: crea alter/add/remove in base all'azione
    const pKey = `${controlIdRaw}|${action}|${tailoring}`;
    if (!seenProfileAlterKey.has(pKey)) {
      pushProfileAlter(profileJson, controlIdRaw, action, tailoring);
      seenProfileAlterKey.add(pKey);
    }

    // IMPLEMENTATION: implemented-requirement con props e evidence
    const iKey = `${row['Risk-ID']}|${controlIdRaw}|${row['Evidence/Assessment (53A)']}`;
    if (!seenImplKey.has(iKey)) {
      pushImplementedRequirement(implJson, row);
      seenImplKey.add(iKey);
    }
  }

  // output
  ensureDir(path.dirname(outProfile));
  ensureDir(path.dirname(outSSP));

  fs.writeFileSync(outProfile, JSON.stringify(profileJson, null, 2), 'utf8');
  fs.writeFileSync(outSSP, JSON.stringify(implJson, null, 2), 'utf8');

  console.log('OK:');
  console.log('  Overlay profile  →', outProfile);
  console.log('  Implementation   →', outSSP);
})().catch(err => {
  console.error(err);
  process.exit(1);
});

// -------------------- misc helpers --------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
function sanitizeRef(s) {
  return s.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '').toLowerCase();
}
function genUuidLike() {
  // UUID-like (non-crypto) per semplicità
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
```

---

### Come usarlo

1. Salva il codice come `generate_oscal_from_csv.js`.
2. Prepara il CSV con l’header indicato (puoi partire dal template che ti ho dato).
3. Lancia:

```bash
node generate_oscal_from_csv.js \
  --csv ./risk_control_mapping.csv \
  --baseline-profile ./profiles/800-53b_moderate_profile.json \
  --out-profile ./out/ics_overlay_profile.json \
  --out-ssp ./out/ics_implementation.json \
  --system-id "ICS-PLANT-01"
```

* `--baseline-profile` è l’**href** che finirà dentro l’overlay (può essere un path relativo o URL interno al tuo repo di profili).
* L’output sono **due file JSON** pronti da dare in pasto al tuo pipeline OSCAL:

  * `./out/ics_overlay_profile.json` (da *risolvere* contro il catalogo 53r5 + baseline 53B)
  * `./out/ics_implementation.json` (estratto SSP con `implemented-requirements` e props di tracciabilità)

---

### Note di aderenza OSCAL

* Ho usato campi `modify.alters.adds.props/statements` per *annotare* `not-applicable`, `tailoring-note`, `added-by-overlay`.
* Se il tuo risolutore supporta `exclude-controls`, puoi estendere lo script per emettere **esclusioni hard** quando `Overlay-Action=REMOVED/NA`. In assenza, la marcatura con prop `applicability=not-applicable` + giustificazione è pratica e auditabile.
* Gli **enhancements** (es. `sc-7(3)`) vengono aggiunti con `adds.by-ids`.
* L’Implementation (`implemented-requirements`) include **props** per: `risk-id`, `risk-desc`, `asset`, `overlay-action`, `tailoring-note`, `poam-status` e un link “fittizio” all’evidenza (`evidence://…`). Adatta questi metadati al tuo toolchain (ad es. puoi spostare le evidenze in `back-matter.resources` se preferisci).

---

Se vuoi, posso estendere lo script per:

* generare anche uno **scheletro di Test Plan 800-53A** per i controlli coinvolti (in base alla colonna Evidence/Assessment),
* supportare **parametri** (es. `set-parameters`) leggendo ulteriori colonne CSV (es. `Param-ID`, `Param-Value`).

Assolutamente non è tardi 🙂. Ti lascio qui una **versione estesa** dello script Node.js (CommonJS) che aggiunge:

1. **Generazione di uno scheletro di Test Plan 800-53A** per i controlli coinvolti, derivando i metodi da `Evidence/Assessment (53A)` (“Interview”, “Examine”, “Test”, anche combinati).
2. **Supporto parametri**: legge dal CSV le colonne opzionali `Param-IDs` e `Param-Values` (separate da `|`) e:

   * le inserisce in `set-parameters` dell’**Implementation** (SSP extract),
   * e, se vuoi, anche come `set-parameter` nell’**Overlay Profile** (flag attivabile).

---

# 🚀 Script: `generate_oscal_from_csv_ext.js`

> È un drop-in replacement del precedente. Cambiano solo:
>
> * nuovi argomenti `--out-ap` per il test plan 53A, `--set-params-in-profile true|false`,
> * parsing di `Param-IDs` e `Param-Values`,
> * generazione dell’**assessment plan**.

```js
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

/*
USO:
node generate_oscal_from_csv_ext.js \
  --csv ./risk_control_mapping.csv \
  --baseline-profile ./profiles/800-53b_moderate_profile.json \
  --out-profile ./out/ics_overlay_profile.json \
  --out-ssp ./out/ics_implementation.json \
  --out-ap ./out/ics_assessment_plan_53A.json \
  --system-id "ICS-PLANT-01" \
  --set-params-in-profile true

CSV atteso (header):
Risk-ID,Risk-Description,Asset/Scenario,NIST-Control-ID,NIST-Control-Title,Overlay-Action (82r3),Tailoring/Compensation,Evidence/Assessment (53A),POA&M-Status,Param-IDs,Param-Values

Note sui parametri:
- Param-IDs: es. "ac-11_prm_lock_timeout|si-4_prm_monitoring_scope"
- Param-Values: es. "15m su uffici; NA su HMI|Segmenti OT L2-L3"
  (stesso numero di elementi, separatore "|")
*/

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 2) {
    const k = argv[i]; const v = argv[i + 1];
    if (!k || !v || !k.startsWith('--')) continue;
    args[k.slice(2)] = v;
  }
  return args;
}

// --- CSV parser minimale (quote, virgole, CRLF) ---
function parseCSV(text) {
  const rows = [];
  let i = 0; let cell = ''; let row = []; let inQ = false;
  while (i < text.length) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i += 2; }
        else { inQ = false; i += 1; }
      } else { cell += ch; i += 1; }
    } else {
      if (ch === '"') { inQ = true; i += 1; }
      else if (ch === ',') { row.push(cell); cell = ''; i += 1; }
      else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; i += 1; }
      else if (ch === '\r') { i += 1; }
      else { cell += ch; i += 1; }
    }
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const ACTION = {
  AS_IS: 'AS-IS',
  TAILORED: 'TAILORED',
  REMOVED_NA: 'REMOVED/NA',
  SUPPLEMENTED: 'SUPPLEMENTED',
  ADDED: 'ADDED',
};
function normalizeAction(a) {
  if (!a) return ACTION.AS_IS;
  const s = a.trim().toUpperCase();
  if (s.includes('TAILOR')) return ACTION.TAILORED;
  if (s.includes('REMOVE') || s === 'NA' || s.includes('NOT APPLIC')) return ACTION.REMOVED_NA;
  if (s.includes('SUPPLEMENT')) return ACTION.SUPPLEMENTED;
  if (s.includes('ADD')) return ACTION.ADDED;
  return ACTION.AS_IS;
}
function isEnhancement(id) { return /\([0-9]+\)$/.test(id); }
function baseControlId(id) { const m = id.match(/^([a-z]{2}-\d+)\(/i); return (m ? m[1] : id).toLowerCase(); }

function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }
function genUuidLike() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0; const v = c === 'x' ? r : (r & 0x3) | 0x8; return v.toString(16);
  });
}
function sanitizeRef(s) { return (s || '').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '').toLowerCase(); }

// ---- OSCAL skeletons ----
function buildEmptyProfile(baselineHref, title = 'ICS/OT Overlay (82r3) on Baseline') {
  return {
    profile: {
      uuid: genUuidLike(),
      metadata: { title, version: '1.1.0' },
      imports: [{ href: baselineHref }],
      merge: { 'as-is': true, combine: { method: 'keep' } },
      modify: [],
      'back-matter': { resources: [] },
    },
  };
}
function buildEmptyImplementation(systemId = 'SYSTEM', title = 'System Security Plan - Implementation Extract') {
  return {
    'system-security-plan': {
      uuid: genUuidLike(),
      metadata: { title, version: '1.1.0' },
      'system-characteristics': { 'system-ids': [{ id: systemId }], 'system-name': systemId },
      'control-implementation': { 'implemented-requirements': [] },
      'back-matter': { resources: [] },
    },
  };
}
function buildEmptyAssessmentPlan(systemId = 'SYSTEM', title = 'Assessment Plan (SP 800-53A) - Skeleton') {
  return {
    'assessment-plan': {
      uuid: genUuidLike(),
      metadata: { title, version: '1.0.0' },
      'import-profile': { href: './out/ics_overlay_profile.json' }, // aggiornalo se serve
      'local-definitions': {},
      'assessment-subjects': [
        { type: 'system', 'subject-uuid': genUuidLike(), title: systemId }
      ],
      'assessment-activities': {
        'test-methods': [], // definizioni riusabili
        'assessments': [],  // istanze per controllo
      },
      'back-matter': { resources: [] },
    },
  };
}

// ---- Overlay alters & parameters ----
function pushProfileAlter(profileJson, controlId, action, tailoringNote, setParamsInProfile, paramPairs) {
  const overlay = profileJson.profile;
  const cId = baseControlId(controlId);
  const enh = isEnhancement(controlId) ? controlId : null;

  let entry = overlay.modify.find(m => m['control-id'] === cId);
  if (!entry) { entry = { 'control-id': cId, alters: [] }; overlay.modify.push(entry); }

  // Enhancement explicit add
  if (enh) entry.alters.push({ adds: { 'by-ids': [enh] } });

  const adds = {};
  // Applicabilità / note
  if (action === ACTION.REMOVED_NA) {
    adds.props = (adds.props || []).concat([{
      name: 'applicability', ns: 'https://example/ns/overlay/ics',
      value: 'not-applicable', remarks: tailoringNote || 'Marked NA by ICS overlay',
    }]);
  } else {
    if (tailoringNote) {
      adds.statements = (adds.statements || []).concat([{
        where: 'control', part: { name: 'guidance', prose: tailoringNote },
      }]);
    }
    if (action === ACTION.SUPPLEMENTED || action === ACTION.ADDED) {
      adds.props = (adds.props || []).concat([{
        name: 'added-by-overlay', ns: 'https://example/ns/overlay/ics', value: 'NIST SP 800-82r3',
      }]);
    }
  }

  // Parametri nel PROFILE (opzionale, default OFF)
  if (setParamsInProfile && paramPairs && paramPairs.length) {
    const setParams = paramPairs.map(([pid, val]) => ({
      'set-parameter': { 'param-id': pid, values: [val] }
    }));
    // Molti tool usano alters[].sets per parametri; qui li aggiungiamo come 'sets'
    entry.alters.push({ sets: { parameters: setParams } });
  }

  if (Object.keys(adds).length) entry.alters.push({ adds });
}

// ---- Implementation (SSP) ----
function pushImplementedRequirement(implJson, row, paramPairs) {
  const impl = implJson['system-security-plan']['control-implementation'];
  const controlId = (row['NIST-Control-ID'] || '').trim();
  const cId = baseControlId(controlId);
  const enh = isEnhancement(controlId) ? controlId : null;

  const props = [
    { name: 'risk-id', ns: 'https://example/ns/risk', value: (row['Risk-ID'] || '').trim() },
    { name: 'risk-desc', ns: 'https://example/ns/risk', value: (row['Risk-Description'] || '').trim() },
    { name: 'asset', ns: 'https://example/ns/risk', value: (row['Asset/Scenario'] || '').trim() },
    { name: 'overlay-action', ns: 'https://example/ns/overlay/ics', value: normalizeAction(row['Overlay-Action (82r3)']) },
  ];
  const tailoring = (row['Tailoring/Compensation'] || '').trim();
  if (tailoring) props.push({ name: 'tailoring-note', ns: 'https://example/ns/overlay/ics', value: tailoring });
  const poam = (row['POA&M-Status'] || '').trim();
  if (poam) props.push({ name: 'poam-status', ns: 'https://example/ns/poam', value: poam });

  const evid = (row['Evidence/Assessment (53A)'] || '').trim();

  const implReq = {
    uuid: genUuidLike(),
    'control-id': cId,
    props,
  };

  // set-parameters lato Implementation (utile per audit)
  if (paramPairs && paramPairs.length) {
    implReq['set-parameters'] = paramPairs.map(([pid, val]) => ({
      'param-id': pid, values: [val],
    }));
  }

  if (enh) {
    implReq.props.push({ name: 'enhancement', ns: 'https://example/ns/overlay/ics', value: enh });
  }
  if (evid) {
    implReq.links = [{ rel: 'evidence', href: `evidence://${sanitizeRef(evid)}` }];
  }
  impl['implemented-requirements'].push(implReq);
}

// ---- Assessment Plan (53A) ----
function parseAssessmentMethods(evidenceStr) {
  // es: "Interview + Examine", "Test", "Examine, Test", "Interview/Examine/Test"
  const s = (evidenceStr || '').toLowerCase();
  const meth = [];
  if (/(interview)/.test(s)) meth.push('INTERVIEW');
  if (/(examine|review|inspect)/.test(s)) meth.push('EXAMINE');
  if (/(test|technical)/.test(s)) meth.push('TEST');
  return Array.from(new Set(meth));
}

function pushAssessmentForControl(apJson, controlId, evidenceStr) {
  const ap = apJson['assessment-plan'];
  const methods = parseAssessmentMethods(evidenceStr);
  const cId = baseControlId(controlId);
  const enh = isEnhancement(controlId) ? controlId : null;

  // definiamo (se manca) un test-method riusabile per la tripletta di metodi
  const key = methods.sort().join('+') || 'EXAMINE';
  let tm = ap['assessment-activities']['test-methods'].find(t => t.id === key);
  if (!tm) {
    tm = {
      id: key,
      title: `Procedure: ${key}`,
      description: `Procedura generica ${key} per controlli NIST SP 800-53A.`,
      steps: methods.map(m => ({ id: `${key}-${m}`, title: m, description: `Eseguire ${m} secondo 53A.` })),
    };
    ap['assessment-activities']['test-methods'].push(tm);
  }

  // aggiungiamo una "assessment" entry per il controllo
  const assessEntry = {
    uuid: genUuidLike(),
    title: `Assess ${cId}${enh ? ` ${enh}` : ''}`,
    description: `Valutazione del controllo ${cId}${enh ? ` enhancement ${enh}` : ''} secondo SP 800-53A.`,
    subjects: [{ type: 'system', 'include-all': true }],
    methods: [ key ],
    'related-controls': [{ 'control-id': cId }].concat(enh ? [{ 'control-id': enh }] : []),
  };
  ap['assessment-activities']['assessments'].push(assessEntry);
}

// ---- Parametri dal CSV ----
function readParamPairs(row) {
  const ids = (row['Param-IDs'] || '').trim();
  const vals = (row['Param-Values'] || '').trim();
  if (!ids || !vals) return [];
  const a = ids.split('|').map(s => s.trim()).filter(Boolean);
  const b = vals.split('|').map(s => s.trim()).filter(Boolean);
  const out = [];
  for (let i = 0; i < Math.min(a.length, b.length); i++) out.push([a[i], b[i]]);
  return out;
}

// ---- MAIN ----
(async function main() {
  const args = parseArgs(process.argv);
  const csvPath = args.csv || './risk_control_mapping.csv';
  const baselineProfileHref = args['baseline-profile'] || './profiles/800-53b_moderate_profile.json';
  const outProfile = args['out-profile'] || './out/ics_overlay_profile.json';
  const outSSP = args['out-ssp'] || './out/ics_implementation.json';
  const outAP = args['out-ap'] || './out/ics_assessment_plan_53A.json';
  const systemId = args['system-id'] || 'ICS-SYSTEM';
  const setParamsInProfile = String(args['set-params-in-profile'] || 'false').toLowerCase() === 'true';

  const csvText = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csvText);
  if (!rows.length) { console.error('CSV vuoto.'); process.exit(1); }

  const header = rows[0].map(h => h.trim());
  const dataRows = rows.slice(1).map(r => {
    const o = {}; header.forEach((h, i) => o[h] = (r[i] ?? '').trim()); return o;
  });

  const profileJson = buildEmptyProfile(baselineProfileHref);
  const implJson = buildEmptyImplementation(systemId);
  const apJson = buildEmptyAssessmentPlan(systemId);

  const seenAlter = new Set();
  const seenImpl = new Set();
  const seenAP = new Set();

  for (const row of dataRows) {
    const controlIdRaw = (row['NIST-Control-ID'] || '').trim();
    if (!controlIdRaw) continue;

    const action = normalizeAction(row['Overlay-Action (82r3)']);
    const tailoring = (row['Tailoring/Compensation'] || '').trim();
    const paramPairs = readParamPairs(row);

    // PROFILE
    const pKey = `${controlIdRaw}|${action}|${tailoring}|${JSON.stringify(paramPairs)}|${setParamsInProfile}`;
    if (!seenAlter.has(pKey)) {
      pushProfileAlter(profileJson, controlIdRaw, action, tailoring, setParamsInProfile, paramPairs);
      seenAlter.add(pKey);
    }

    // IMPLEMENTATION
    const iKey = `${row['Risk-ID']}|${controlIdRaw}|${row['Evidence/Assessment (53A)']}|${JSON.stringify(paramPairs)}`;
    if (!seenImpl.has(iKey)) {
      pushImplementedRequirement(implJson, row, paramPairs);
      seenImpl.add(iKey);
    }

    // ASSESSMENT PLAN (53A)
    const evi = (row['Evidence/Assessment (53A)'] || '').trim();
    const aKey = `${controlIdRaw}|${evi}`;
    if (!seenAP.has(aKey)) {
      pushAssessmentForControl(apJson, controlIdRaw, evi);
      seenAP.add(aKey);
    }
  }

  ensureDir(path.dirname(outProfile));
  ensureDir(path.dirname(outSSP));
  ensureDir(path.dirname(outAP));
  fs.writeFileSync(outProfile, JSON.stringify(profileJson, null, 2), 'utf8');
  fs.writeFileSync(outSSP, JSON.stringify(implJson, null, 2), 'utf8');
  fs.writeFileSync(outAP, JSON.stringify(apJson, null, 2), 'utf8');

  console.log('OK:');
  console.log('  Overlay profile     →', outProfile);
  console.log('  Implementation (SSP)→', outSSP);
  console.log('  Assessment plan 53A →', outAP);
})();
```

---

## 📋 Nuove colonne CSV (opzionali)

Aggiungi queste due colonne all’header:

* `Param-IDs` → ID parametri separati da `|` (es. `ac-11_prm_lock_timeout|si-4_prm_monitoring_scope`)
* `Param-Values` → valori corrispondenti separati da `|` (es. `15 min uffici; NA HMI|Segmenti OT L2-L3`)

Esempio riga completa:

```csv
R2,"Lock HMI safety-critical","HMI sala controllo","AC-11","Session Lock","Tailored","Timeout disabilitato su HMI; lock manuale","Interview + Examine","Implemented","ac-11_prm_lock_timeout","15 min su workstation uffici; NA su HMI"
```

> Se imposti `--set-params-in-profile true`, i parametri finiranno **sia** nel Profile (alters → sets) **sia** nell’Implementation (set-parameters). In caso contrario, solo nell’Implementation (scelta spesso preferita dagli auditor perché mostra lo stato operativo).

---

## 🧪 Test Plan 53A generato (scheletro)

Lo script crea `ics_assessment_plan_53A.json` con:

* una lista di **metodi** riusabili (es. `INTERVIEW+EXAMINE+TEST`),
* un’**assessment** per ogni controllo incontrato nel CSV, collegata ai metodi dedotti da `Evidence/Assessment (53A)`.

Puoi poi rifinire:

* descrizioni dei passi,
* artefatti richiesti (evidence),
* mapping a specifiche parti del controllo (se vuoi spingerti oltre).

---

## ▶️ Esecuzione tipica

```bash
node generate_oscal_from_csv_ext.js \
  --csv ./risk_control_mapping.csv \
  --baseline-profile ./profiles/800-53b_moderate_profile.json \
  --out-profile ./out/ics_overlay_profile.json \
  --out-ssp ./out/ics_implementation.json \
  --out-ap ./out/ics_assessment_plan_53A.json \
  --system-id "ICS-PLANT-01" \
  --set-params-in-profile false
```

---

Se vuoi, posso anche aggiungere:

* un flag per **emettere exclude-controls hard** nel profile quando `Overlay-Action = REMOVED/NA`;
* un mapping più fine **Evidence → passi 53A** (es. se contiene “firewall” aggiungere step “verifica regole SC-7”).
