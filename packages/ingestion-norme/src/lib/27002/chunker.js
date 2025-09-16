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
    documentObj.chunks.forEach(rq => {
      if(rq.Control && rq.Control.length > 0) {
        const id = rq.l1_number + '/' + rq.l2_number;
        const newChunk = Object.assign({}, metadata, {
          chunk_id: "IEC-27002:2022/" + id,
          doc_id: "IEC-27002:2022",
          section_path: id,
          parent_id: null,
          group_id: "IEC-27002:2022/" + id + "/[" + rq.page + "]",
          seq: 1,
          normative: true,
          informative: false,
          text_normative: rq.Control,
          text_informative: null,
          context_note: null,
          sha256: sha256(rq.Control),
          context: {
            lbLexStdId: metadata.lbId,
            sourceUrl: metadata.sourceUrl,
            sourceType: 'pdf',
            page: rq.page,
            superTitle: rq.l1_title,
            title: rq.l2_title,
            purpose: rq.Purpose,
            guidance: rq.Guidance,
            other_information: rq["Other information"],
            attributes: rq.attributes,
            isRelevantVerb: true // analyzeTextForRelevance(Control),
          }
        });
        newChunks.push(newChunk);
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
    console.log('Uso: node iec_27002/chunker.js <config.json> <stepNumber>');
    process.exit(2);
  }

  const stepNumber = Number(stepArg);
  if (!Number.isInteger(stepNumber)) exitWithError('Il numero di step deve essere un intero.');

  const config = readJSONSync(configPath);
  if (!config || typeof config !== 'object' || !config.iec_27002) {
    exitWithError('Configurazione non valida: proprietà radice "iec_27002" mancante.');
  }

  const metadata = config.iec_27002.metadata;
  const params = config.iec_27002["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "iec_27002" ' + stepNumber + ' mancante.');
  }
  console.log("params+metadata", params, metadata);
  finish(params, metadata);
}

if (require.main === module) {
  main();
}
