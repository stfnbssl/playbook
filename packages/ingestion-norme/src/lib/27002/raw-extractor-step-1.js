const fs = require('fs');
const path = require('path');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync, writeFileSync,
    isRegExp, parseRegExp, cleanHiddenUnicodeCharacters} = require('../utils');
const { processChunk } = require('./chunk_analizer');

const isDebug = true;
/*
    "dirtyLines": [
        "ISO/IEC 27002:2022(E)",
        "© ISO/IEC 2022",
        "© ISO/IEC 2022 – All rights reserved",
        "INTERNATIONAL STANDARD",
        "﻿",
        "/^\\s*-?\\d+\\s*$/"
    ],
    "blockHeaders": [
        "4\t Structure of this document",
        "5\t Organizational controls",
        "/^\\s*Annex A\\s*$/",
        "/^\\s*Annex B\\s*$/",
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
    .replace(/\s+/g, ' ')
    // Rimuovi spazi all'inizio e alla fine
    // .trim();
}

const parseFlags = {
    seen_start: false,
    seen_end: false,
    extract_out_of_chunks: false
}

const START_RE = /^\s*5\s*Organizational controls\s*$/
const END_RE = /^\s*Annex A\s*$/
const END_NEXT_RE = /^\s*\(informative\)\s*$/
const L1_RE = /^\s*(?<l1>\d+)(?!\.)[\t ]+(?<title>.+)$/;
const L2_RE = /^\s*(?<l1>\d+)\.(?<l2>\d+)[\t ]+(?<title>.+)$/;
  
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
    const nextLine1 = lines[i+1] ? cleanPdfText(lines[i+1]) : lines[i+1];  
    const prevLine1 = lines[i-1] ? cleanPdfText(lines[i-1]) : lines[i-1];  
    let skip = false;
    skip = skip || line.trim() == "© ISO/IEC 2022";
    skip = skip || line.trim() == "© ISO/IEC 2022 – All rights reserved";
    skip = skip || line.trim() == "ISO/IEC 27002:2022(E)";
    skip = skip || line.trim() == "INTERNATIONAL STANDARD";
    skip = skip || line.trim() == "﻿";
    // if (isDebug) console.log("line, skip", line, skip);
    const pageMatch = line.match(/^\s*(\d+)\s*$/);
    if (pageMatch && (nextLine1.trim() == "ISO/IEC 27002:2022(E)" || prevLine1.trim() == "ISO/IEC 27002:2022(E)")) {
      page = parseInt(pageMatch[1]);
      // if (isDebug) console.log("pageMatch", pageMatch, page);
      // if (isDebug) console.log("pageMatch test", nextLine1.trim() == "ISO/IEC 27002:2022(E)");
      skip = true;
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
            const L1_REMatch = line.match(L1_RE);
            const L2_REMatch = line.match(L2_RE);
            // if (isDebug) console.log("L1_REMatch", L1_REMatch);
            // if (isDebug) console.log("L2_REMatch", L2_REMatch);
            if (L1_REMatch && ['5','6','7','8'].indexOf(L1_REMatch.groups.l1)) {
                if (currentCHUNK_L2) {
                    retval.chunks.push(processChunk(currentCHUNK_L2));
                }
                currentCHUNK_L1 = {
                    level: 1,
                    l1_number: L1_REMatch.groups.l1,
                    l1_title: L1_REMatch.groups.title,
                    lines: []
                }
                currentCHUNK_L2 = null;
            } else if (L2_REMatch) {
                if (currentCHUNK_L2) {
                    retval.chunks.push(processChunk(currentCHUNK_L2));
                }
                currentCHUNK_L2 = {
                    level: 2,
                    l1_number: currentCHUNK_L1.l1_number,
                    l1_title: currentCHUNK_L1.l1_title,
                    l2_number: L2_REMatch.groups.l2,
                    l2_title: L2_REMatch.groups.title,
                    page: page,
                    lines: []
                }
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
            const START_REMatch = line.match(START_RE);
            // console.log("START_REMatch",START_REMatch);
            if (START_REMatch) {
                currentCHUNK_L1 = {
                    level: 1,
                    l1_number: '5',
                    l1_title: 'Organizational controls',
                    lines: []
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
  if (currentCHUNK_L2) {
    // analizeCHUNK(currentCHUNK_L1);
    // analizeChunk(currentCHUNK_L1);
    // retval.chunks.push(parseChunkSections(currentCHUNK_L1.lines))
    retval.chunks.push(processChunk(currentCHUNK_L2));
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
  if (!config || typeof config !== 'object' || !config.iec_27002) {
    exitWithError('Configurazione non valida: proprietà radice "iec_27002" mancante.');
  }
  const params = config.iec_27002["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "iec_27002.step"' + stepNumber + ' mancante.');
  }
  console.log("params", params);
  extractRequirements(params);
}
if (require.main === module) {
  main();
}
