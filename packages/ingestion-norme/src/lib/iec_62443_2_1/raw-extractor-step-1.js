const fs = require('fs');
const path = require('path');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync, writeFileSync,
    isRegExp, parseRegExp, cleanHiddenUnicodeCharacters} = require('../utils');
const { parseElement, parseElementRequirement} = require('./element_parser');

const isDebug = true;
/*
            "blockHeaders": [
                "4",
                "Annex A",
                "Annex B",
                "Bibliography"
                ],
*/

function cleanPdfText(text) {
  return text
    // Rimuovi caratteri invisibili problematici
    .replace(/[\u00AD\u200B\u200C\u200D\uFEFF]/g, '')
    // Sostituisci non-breaking spaces con spazi normali
    .replace(/\u00A0/g, ' ')
    // Normalizza altri tipi di whitespace a spazi normali
    .replace(/[\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    // Collassa spazi multipli in uno solo
    // .replace(/\s+/g, ' ')
    // Rimuovi spazi all'inizio e alla fine
    // .trim();
}

const parseFlags = {
    seen_start: false,
    seen_end: false,
    extract_out_of_chunks: false
}

const START_RE = /^\s*4\s*$/
const START_NEXT_RE = /^\s*Zone, conduit and risk assessment requirements\s*$/
const END_RE = /^\s*Annex A\s*$/
const END_NEXT_RE = /^\s*\(informative\)\s*$/
const PAGE_RE = /^\s*–\s*(\d+)\s*–\s*$/
const L2_RE = /^\s*(?<l1>\d+)\.(?<l2>\d+)\s*$/;
const L3_RE = /^\s*(?<l1>\d+)\.(?<l2>\d+)\.(?<l3>\d+)\s*$/;
const L4_RE = /^\s*(?<l1>\d+)\.(?<l2>\d+)\.(?<l3>\d+)\.(?<l4>\d+)\s*$/;
const L5_RE = /^\s*(?<l1>\d+)\.(?<l2>\d+)\.(?<l3>\d+)\.(?<l4>\d+)\.(?<l5>\d+)\s*$/;

function getKind(title) {
  let kind = null;
  if (title.startsWith("Description of category")) {
      kind = "Description of category";
  } else if (title.startsWith("Description of element")) {
      kind = "Description of element group";
  } else if (title.startsWith("Element:")) {
      kind = "Element";
  } else if (title.startsWith("Element group:")) {
      kind = "ElementGroup";
  }
  return kind;
}

function parseRawLines(lines) {
  const retval = {
    linesOutOfCHUNKs: [],
    chunks: []
  };
  let page = 1;
  let currentCHUNK_L1 = null;
  let currentCHUNK_L2 = null;
  let currentCHUNK_L3 = null;
  let currentCHUNK_L4 = null;
  let currentCHUNK_L5 = null;
  for (let i = 0; i < lines.length; i++) {
    const line = cleanPdfText(lines[i]);
    const prevLine1 = lines[i-1] ? cleanPdfText(lines[i-1]) : lines[i-1];  
    const nextLine1 = lines[i+1] ? cleanPdfText(lines[i+1]) : lines[i+1];  
    const nextLine2 = lines[i+2] ? cleanPdfText(lines[i+2]) : lines[i+2];  
    let skip = false;
    skip = skip || line.trim() == "62443-2-1 Ó IEC:2010(E)";
    skip = skip || line.trim() == "BS EN IEC 62443‑3‑2:2020";
    // if (isDebug) console.log("line, skip", line, skip);
    const pageMatch = line.match(PAGE_RE);
    if (pageMatch) {
      // if (isDebug) console.log("pageMatch", pageMatch, page, nextLine1.trim() == "IEC 62443-3-2:2020 © IEC 2020" || prevLine1.trim() == "IEC 62443-3-2:2020 © IEC 2020");
      const testPrev = prevLine1 ? prevLine1.trim() == "62443-2-1 Ó IEC:2010(E)" : false;
      const testNext = nextLine1 ? nextLine1.trim() == "62443-2-1 Ó IEC:2010(E)" : false;
      if (pageMatch && (testPrev || testNext)) {
        page = parseInt(pageMatch[1]);
        // if (isDebug) console.log("pageMatch", pageMatch, page);
        skip = true;
      }
    } 
    // skip = true;
    if (!skip) {
        if (parseFlags.seen_start && !parseFlags.seen_end) {
            const END_REMatch = line.match(END_RE);
            if (END_REMatch) {
                const END_NEXT_REMatch = nextLine1.match(END_NEXT_RE);
                if (END_NEXT_REMatch) {
                    parseFlags.seen_end = true;
                }
            }
        }
        if (parseFlags.seen_start && !parseFlags.seen_end) {
            const L2_REMatch = line.match(L2_RE);
            const L3_REMatch = line.match(L3_RE);
            const L4_REMatch = line.match(L4_RE);
            const L5_REMatch = line.match(L5_RE);
            // if (isDebug) console.log("L1_REMatch", L1_REMatch);
            // if (isDebug) console.log("L2_REMatch", L2_REMatch);
            if (L2_REMatch) {
                if (currentCHUNK_L5) {
                    currentCHUNK_L4.items.push(currentCHUNK_L5);
                }
                if (currentCHUNK_L4) {
                    parseElement(currentCHUNK_L4);
                    currentCHUNK_L3.items.push(currentCHUNK_L4);
                }
                if (currentCHUNK_L3) {
                    parseElement(currentCHUNK_L3);
                    retval.chunks.push(currentCHUNK_L3);
                }
                if (currentCHUNK_L2) {
                    retval.chunks.push(currentCHUNK_L2);
                }
                currentCHUNK_L2 = {
                    level: 2,
                    l1_number: currentCHUNK_L1.l1_number,
                    l2_number: L2_REMatch.groups.l2,
                    l1_title: currentCHUNK_L1.l1_title,
                    l2_title: nextLine1.trim(),
                    lines: []
                }
                currentCHUNK_L3 = null;
                currentCHUNK_L4 = null;
                currentCHUNK_L5 = null;
                i++;
            } else if (L3_REMatch) {
                if (currentCHUNK_L5) {
                    currentCHUNK_L4.items.push(currentCHUNK_L5);
                }
                if (currentCHUNK_L4) {
                    parseElement(currentCHUNK_L4);
                    currentCHUNK_L3.items.push(currentCHUNK_L4);
                }
                if (currentCHUNK_L3) {
                    parseElement(currentCHUNK_L3);
                    retval.chunks.push(currentCHUNK_L3);
                }
                currentCHUNK_L3 = {
                    level: 3,
                    l1_number: currentCHUNK_L1.l1_number,
                    l2_number: currentCHUNK_L2.l2_number,
                    l3_number: L3_REMatch.groups.l3,
                    l1_title: currentCHUNK_L1.l1_title,
                    l2_title: currentCHUNK_L2.l2_title,
                    l3_title: nextLine1.trim(),
                    kind: getKind(nextLine1.trim()),
                    description: null,
                    objective: null,
                    rationale: null,
                    page: page,
                    parsed: {},
                    lines: [],
                    items: []
                }
                currentCHUNK_L4 = null;
                currentCHUNK_L5 = null;
            } else if (L4_REMatch) {
                if (currentCHUNK_L5) {
                    currentCHUNK_L4.items.push(currentCHUNK_L5);
                }
                if (currentCHUNK_L4) {
                    parseElement(currentCHUNK_L4);
                    currentCHUNK_L3.items.push(currentCHUNK_L4);
                }
                currentCHUNK_L4 = {
                    level: 4,
                    l1_number: currentCHUNK_L1.l1_number,
                    l2_number: currentCHUNK_L2.l2_number,
                    l3_number: currentCHUNK_L3.l3_number,
                    l4_number: L4_REMatch.groups.l4,
                    l1_title: currentCHUNK_L1.l1_title,
                    l2_title: currentCHUNK_L2.l2_title,
                    l3_title: currentCHUNK_L3.l3_title,
                    l4_title: nextLine1.trim(),
                    kind: getKind(nextLine1.trim()),
                    requirement: null,
                    description: null,
                    objective: null,
                    rationale: null,
                    page: page,
                    parsed: {},
                    lines: [],
                    items: []
                }
                if (currentCHUNK_L3.kind == 'Element') {
                    parseElementRequirement(lines, i, currentCHUNK_L4);
                }
                currentCHUNK_L5 = null;
              } else if (L5_REMatch) {
                if (currentCHUNK_L5) {
                    currentCHUNK_L4.items.push(currentCHUNK_L5);
                }
                currentCHUNK_L5 = {
                    level: 5,
                    l1_number: currentCHUNK_L1.l1_number,
                    l2_number: currentCHUNK_L2.l2_number,
                    l3_number: currentCHUNK_L3.l3_number,
                    l4_number: currentCHUNK_L4.l4_number,
                    l5_number: L5_REMatch.groups.l5,
                    l1_title: currentCHUNK_L1.l1_title,
                    l2_title: currentCHUNK_L2.l2_title,
                    l3_title: currentCHUNK_L3.l3_title,
                    l4_title: currentCHUNK_L4.l4_title,
                    l5_title: nextLine1.trim(),
                    requirement: null,
                    kind: getKind(nextLine1.trim()),
                    page: page,
                    parsed: {},
                    lines: [],
                    items: []
                }
                if (currentCHUNK_L4.kind == 'Element') {
                    parseElementRequirement(lines, i, currentCHUNK_L5);
                }
              } else if (currentCHUNK_L5) {
                currentCHUNK_L5.lines.push({
                    page: page,
                    indent: line.length - line.trimStart().length,
                    text: line.trim()        
                })
              } else if (currentCHUNK_L4) {
                currentCHUNK_L4.lines.push({
                    page: page,
                    indent: line.length - line.trimStart().length,
                    text: line.trim()        
                })
              } else if (currentCHUNK_L3) {
                currentCHUNK_L3.lines.push({
                    page: page,
                    indent: line.length - line.trimStart().length,
                    text: line.trim()        
                })
            } else if (currentCHUNK_L2) {
                currentCHUNK_L2.lines.push({
                    page: page,
                    indent: line.length - line.trimStart().length,
                    text: line.trim()        
                })
            }
        } else {
            const START_REMatch = line.match(START_RE);
            // console.log("START_REMatch",START_REMatch);
            if (START_REMatch && nextLine1.trim() == "Elements of a cyber security management system") {
                currentCHUNK_L1 = {
                    l1_number: 4,
                    l1_title: nextLine1.trim(),
                }
                parseFlags.seen_start = true;
            }
        }
    } else {
        if (parseFlags.extract_out_of_chunks) {
            retval.linesOutOfCHUNKs.push({
                page: page,
                text: line
            })
        }
    }
  }
  if (currentCHUNK_L5) {
    currentCHUNK_L4.items.push(currentCHUNK_L5);
  }
  if (currentCHUNK_L4) {
    parseElement(currentCHUNK_L4);
    currentCHUNK_L3.items.push(currentCHUNK_L4);
  }
  if (currentCHUNK_L3) {
    parseElement(currentCHUNK_L3);
    retval.chunks.push(currentCHUNK_L3);
  }
  if (currentCHUNK_L2) {
      retval.chunks.push(currentCHUNK_L2);
  }
  return retval;
}

function extractRequirements(params) {
    const {
      inputTextPath,
      outputJSONPath,
    } = params;
    if (!inputTextPath || !outputJSONPath) {
      exitWithError('Parametri mancanti: servono "inputTextPath" e "outputJSONPath" dentro ' + __filename);
    }
    const rawText = readTextSync(inputTextPath);
    const allLines = rawText.split(/\r?\n/);
    if (isDebug) console.log("allLines", allLines.length);
    const parsedLines = parseRawLines(allLines);
    if (isDebug) console.log("parsedLines.linesOutOfCHUNKs", parsedLines.linesOutOfCHUNKs.length);
    if (isDebug) console.log("parsedLines.chunks", parsedLines.chunks.length);
    // parseChunkSections(parsedLines)
    // if (isDebug) console.log("parsedLines.chunks", parsedLines.chunks);
    ensureDirSync(params.outputJSONPath);
    writeJSONSync(params.outputJSONPath, parsedLines);
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
  if (!config || typeof config !== 'object' || !config.iec_62443_2_1) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62443_2_1" mancante.');
  }
  const params = config.iec_62443_2_1["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62442_1_1.step"' + stepNumber + ' mancante.');
  }
  console.log("params", params);
  extractRequirements(params);
}
if (require.main === module) {
  main();
}
