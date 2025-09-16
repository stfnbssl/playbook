const crypto = require('crypto');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync} = require('../utils');

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
        if(levelData.requirement && levelData.requirement.length > 0) {
            const id = levelData.l1_number + '/' + levelData.l2_number + '/' 
              + levelData.l3_number;
            const newChunk = Object.assign({}, metadata, {
              chunk_id: "IEC-62443-3-2:2020/" + id,
              doc_id: "IEC-62443-3-2:2020",
              section_path: id,
              parent_id: null,
              group_id: "IEC-62443-3-2:2020/" + id + "[" + levelData.page + "]",
              seq: 1,
              normative: true,
              informative: false,
              text_normative: levelData.requirement,
              text_informative: null,
              context_note: null,
              sha256: sha256(levelData.requirement),
              context: {
                lbLexStdId: metadata.lbId,
                sourceUrl: metadata.sourceUrl,
                sourceType: 'pdf',
                superTitle: levelData.l2_title,
                title: levelData.title,
                rationale: levelData.rationale ? levelData.rationale : null,
                page: levelData.page
              }
            });
            newChunks.push(newChunk);
          }
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
    console.log('Uso: node iec_62443_3_2/chunker.js <config.json> <stepNumber>');
    process.exit(2);
  }

  const stepNumber = Number(stepArg);
  if (!Number.isInteger(stepNumber)) exitWithError('Il numero di step deve essere un intero.');

  const config = readJSONSync(configPath);
  if (!config || typeof config !== 'object' || !config.iec_62443_3_2) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62443_3_2" mancante.');
  }

  const metadata = config.iec_62443_3_2.metadata;
  const params = config.iec_62443_3_2["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62443_3_2" ' + stepNumber + ' mancante.');
  }
  console.log("params+metadata", params, metadata);
  finish(params, metadata);
}

if (require.main === module) {
  main();
}
