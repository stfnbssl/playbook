const crypto = require('crypto');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync} = require('../utils');
const { extractSemicololnParagraph, analyzeTextForRelevance } = require('../chunks/chunk_utils');

function sha256(data) {
    return crypto
        .createHash('sha256')
        .update(data, typeof data === 'string' ? 'utf8' : undefined)
        .digest('hex');
} 

function finish(params, metadata) {
    const documentObj = readJSONSync(params.inputJSONPath);
    const newChunks = []
    documentObj.chunks.forEach(levelData => {
      if(levelData.level == 3) {
        console.log(Object.keys(levelData));
        levelData.items.forEach(level4Data => {
          if (levelData.kind == 'Element') {
            const id = level4Data.l1_number + '/' + level4Data.l2_number + '/' 
              + level4Data.l3_number + '/' + level4Data.l4_number;
            const newChunk = Object.assign({}, metadata, {
              chunk_id: "IEC-62443-2-1:2011/" + id,
              doc_id: "IEC-62443-2-1:2011",
              section_path: id,
              parent_id: null,
              group_id: "IEC-62443-2-1:2011/" + id + "/[" + level4Data.page + "]",
              seq: 1,
              normative: true,
              informative: false,
              text_normative: level4Data.requirement,
              text_informative: null,
              context_note: null,
              sha256: sha256(level4Data.requirement),
              context: {
                lbLexStdId: metadata.lbId,
                sourceUrl: metadata.sourceUrl,
                sourceType: 'pdf',
                page: level4Data.page,
                superTitle: level4Data.l2_title + '/' + level4Data.l3_title,
                title: level4Data.l4_title,
                description: levelData.description,
                objective: levelData.objective,
                rationale: levelData.rationale,
                isRelevantVerb: true // analyzeTextForRelevance(Control),
              }
            });
            newChunks.push(newChunk);
          } else {
            level4Data.items.forEach(level5Data => {
              if (level4Data.kind == 'Element') {
                const id = level5Data.l1_number + '/' + level5Data.l2_number + '/' 
                  + level5Data.l3_number + '/' + level5Data.l4_number + '/' + level5Data.l5_number;
                const newChunk = Object.assign({}, metadata, {
                  chunk_id: "IEC-62443-2-1:2011/" + id,
                  doc_id: "IEC-62443-2-1:2011",
                  section_path: id,
                  parent_id: null,
                  group_id: "IEC-62443-2-1:2011/" + id + "/[" + level5Data.page + "]",
                  seq: 1,
                  normative: true,
                  informative: false,
                  text_normative: level5Data.requirement,
                  text_informative: null,
                  context_note: null,
                  sha256: sha256(level5Data.requirement),
                  context: {
                    lbLexStdId: metadata.lbId,
                    sourceUrl: metadata.sourceUrl,
                    sourceType: 'pdf',
                    page: level5Data.page,
                    superTitle: level5Data.l2_title + '/' + level5Data.l3_title + '/' + level5Data.l4_title,
                    title: level5Data.l5_title,
                    description: level4Data.description,
                    objective: level4Data.objective,
                    rationale: level4Data.rationale,
                    isRelevantVerb: true // analyzeTextForRelevance(Control),
                  }
                });
                newChunks.push(newChunk);
              }
            });
          }
        });
      }
    });
    ensureDirSync(params.outputJSONPath);
    writeJSONSync(params.outputJSONPath, {
      chunks: newChunks
    })
    console.log(`✅ ${newChunks.length} chunks in ${params.inputJSONPath} con successo!`);
    console.log(`✅ Creato file ${params.outputJSONPath} con successo!`);
}

function main() {
  const [, , configPath, stepArg] = process.argv;
  if (!configPath || !stepArg) {
    console.log('Uso: node iec_62443_2_1/chunker.js <config.json> <stepNumber>');
    process.exit(2);
  }

  const stepNumber = Number(stepArg);
  if (!Number.isInteger(stepNumber)) exitWithError('Il numero di step deve essere un intero.');

  const config = readJSONSync(configPath);
  if (!config || typeof config !== 'object' || !config.iec_62443_2_1) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62443_2_1" mancante.');
  }

  const metadata = config.iec_62443_2_1.metadata;
  const params = config.iec_62443_2_1["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62443_2_1" ' + stepNumber + ' mancante.');
  }
  console.log("params+metadata", params, metadata);
  finish(params, metadata);
}

if (require.main === module) {
  main();
}
