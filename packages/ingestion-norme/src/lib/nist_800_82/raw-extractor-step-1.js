const fs = require('fs');
const path = require('path');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync, writeFileSync,
    isRegExp, parseRegExp, cleanHiddenUnicodeCharacters} = require('../utils');
const { parseElement } = require('./element_parser');

const isDebug = true;

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

const START_RE = null;
const START_NEXT_RE = null;
const END_RE = null;
const END_NEXT_RE = null;
const PAGE_RE = /^\s*(\d+)\s*$/
const L1_RE = /^([A-Z]+\.\d+\.\d+)\.\s+(.+?)\s+–\s+([A-Z]+)$/;
const L2_RE = /^([A-Z]+-\d+)\s+(.+?)$/;

function parseRawLines(lines) {
  const retval = {
    linesOutOfCHUNKs: [],
    chunks: []
  };
  let page = 1;
  let currentCHUNK_L1 = null;
  let currentCHUNK_L2 = null;
  for (let i = 0; i < lines.length; i++) {
    const line = cleanPdfText(lines[i]);
    const prevLine1 = lines[i-1] ? cleanPdfText(lines[i-1]) : lines[i-1];  
    const nextLine1 = lines[i+1] ? cleanPdfText(lines[i+1]) : lines[i+1];  
    const nextLine2 = lines[i+2] ? cleanPdfText(lines[i+2]) : lines[i+2];  
    const nextLine3 = lines[i+3] ? cleanPdfText(lines[i+3]) : lines[i+3];  
    let skip = false;
    skip = skip || line.trim() == "Guide to Operational Technology (OT) Security";
    skip = skip || line.trim() == "September 2023";
    skip = skip || line.trim() == "NIST SP 800-82r3";
    // if (isDebug) console.log("line, skip", line, skip);
    const pageMatch = line.match(PAGE_RE);
    if (pageMatch) {
      const testNext = prevLine1 ? prevLine1.trim() == "September 2023" : false;
      if (pageMatch && testNext) {
        page = parseInt(pageMatch[1]);
        // if (isDebug) console.log("pageMatch", pageMatch, page);
        skip = true;
      }
    } 
    // skip = true;
    if (!skip) {
        if (parseFlags.seen_start && !parseFlags.seen_end) {
            if(line.trim() == "Appendix G. Change Log") {
                parseFlags.seen_end = true;
            }
        }
        if (parseFlags.seen_start && !parseFlags.seen_end) {
            let L1_REMatch = line.trim().match(L1_RE);
            let L2_REMatch = line.trim().match(L2_RE);
            // console.log("line", line);
            let L1_lines = 1;
            let L2_lines = 1;
            let check_CNTL = false;
            if (!L1_REMatch) {
                L1_REMatch = (line.trim()+ ' ' + nextLine1).match(L1_RE);
                if (L1_REMatch) L1_lines = 2;
            }
            if (!L2_REMatch) {
                L2_REMatch = (line.trim()+ ' ' + nextLine1).match(L2_RE);
                if (L2_REMatch) {
                    L2_lines = 2;
                    check_CNTL = nextLine2 && nextLine2.trim() == 'CNTL'
                    // console.log("check_CNTL", check_CNTL, nextLine1.trim(), nextLine2.trim(), nextLine3.trim());
                }
            } else {
                check_CNTL = nextLine1 && nextLine1.trim() == 'CNTL'
            }
            // console.log("L1_REMatch", L1_REMatch);
            // console.log("L2_REMatch", L2_REMatch, check_CNTL);
            if (L1_REMatch) {
                // if (isDebug) console.log("L1_REMatch", line, L1_REMatch);
                if (currentCHUNK_L1) {
                    retval.chunks.push(currentCHUNK_L1);
                }
                currentCHUNK_L1 = {
                    level: 1,
                    l1_chapter: L1_REMatch[1],
                    l1_title: L1_REMatch[2],
                    l1_section: L1_REMatch[3],
                    lines: [],
                    controls: []
                }
                currentCHUNK_L2 = null;
                if (L1_lines == 2) i++;
              } else if (line.trim() == "CNTL") {
                // caso (raro) in cui manca la intestazione di controllo
                // il titolo comunque viene catturato dal parseElement
                if (currentCHUNK_L2) {
                    parseElement(currentCHUNK_L2);
                    currentCHUNK_L1.controls.push(currentCHUNK_L2);
                }
                currentCHUNK_L2 = {
                    level: 2,
                    l1_chapter: currentCHUNK_L1.l1_chapter,
                    l1_title: currentCHUNK_L1.l1_title,
                    l1_section: currentCHUNK_L1.l1_section,
                    l2_number: null,
                    l2_title: null,
                    discussion: null,
                    low: null,
                    mod: null,
                    high: null,
                    rationale: null,
                    page: page,
                    enhancements:[],
                    lines: [],
                }
              } else if (L2_REMatch && check_CNTL) {
                if (currentCHUNK_L2) {
                    parseElement(currentCHUNK_L2);
                    currentCHUNK_L1.controls.push(currentCHUNK_L2);
                }
                currentCHUNK_L2 = {
                    level: 2,
                    l1_chapter: currentCHUNK_L1.l1_chapter,
                    l1_title: currentCHUNK_L1.l1_title,
                    l1_section: currentCHUNK_L1.l1_section,
                    l2_number: L2_REMatch[1],
                    l2_title: L2_REMatch[2],
                    discussion: null,
                    low: null,
                    mod: null,
                    high: null,
                    rationale: null,
                    page: page,
                    enhancements:[],
                    lines: [],
                }
                i++
                if (L2_lines == 2) i++;
            } else if (currentCHUNK_L2) {
                currentCHUNK_L2.lines.push({
                    page: page,
                    indent: line.length - line.trimStart().length,
                    text: line.trim()        
                })
            } else if (currentCHUNK_L1) {
                currentCHUNK_L1.lines.push({
                    page: page,
                    indent: line.length - line.trimStart().length,
                    text: line.trim()        
                })
            }
        } else {
            if (line.trim() == "Fig. 22. Detailed overlay control specifications illustrated") {
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
  if (currentCHUNK_L2) {
    parseElement(currentCHUNK_L2);
    currentCHUNK_L1.controls.push(currentCHUNK_L2);
  }
  if (currentCHUNK_L1) {
    retval.chunks.push(currentCHUNK_L1);
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
  if (!config || typeof config !== 'object' || !config.nist_800_82) {
    exitWithError('Configurazione non valida: proprietà radice "nist_800_82" mancante.');
  }
  const params = config.nist_800_82["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62442_1_1.step"' + stepNumber + ' mancante.');
  }
  console.log("params", params);
  extractRequirements(params);
}
if (require.main === module) {
  main();
}
