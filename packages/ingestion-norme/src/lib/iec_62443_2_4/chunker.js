const crypto = require('crypto');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync} = require('../utils');

function sha256(data) {
    return crypto
        .createHash('sha256')
        .update(data, typeof data === 'string' ? 'utf8' : undefined)
        .digest('hex');
} 

function finish(params, metadata) {
    const requirementsObj = readJSONSync(params.inputJSONPath);
    const newChunks = []
    requirementsObj.requirements.forEach(rq => {
      const id = rq.Req_ID + "/" + rq.BR_RE;
      const newChunk = Object.assign({}, metadata, {
        chunk_id: "IEC-62443-2-4:2015/" + id,
        doc_id: "IEC-62443-2-4:2015",
        section_path: id,
        parent_id: null,
        group_id: "IEC-62443-2-4:2015/" + rq.Req_ID + "/" + rq.BR_RE + "[" + rq.page + "]",
        seq: 1,
        normative: true,
        informative: false,
        text_normative: rq.Requirement,
        text_informative: null,
        context_note: null,
        sha256: sha256(rq.Requirement),
        context: {
          lbLexStdId: metadata.lbId,
          sourceUrl: metadata.sourceUrl,
          sourceType: 'pdf',
          functional_area: rq.Functional_area,
          topic: rq.Topic,
          subtopic: rq.Subtopic,
          rationale: rq.Rationale,
          doc: rq.Doc,
          page: rq.page
        }
      });
      newChunks.push(newChunk);
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
    console.log('Uso: node iec_62443_2_4/chunker.js <config.json> <stepNumber>');
    process.exit(2);
  }

  const stepNumber = Number(stepArg);
  if (!Number.isInteger(stepNumber)) exitWithError('Il numero di step deve essere un intero.');

  const config = readJSONSync(configPath);
  if (!config || typeof config !== 'object' || !config.iec_62443_2_4) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62443_2_4" mancante.');
  }

  const metadata = config.iec_62443_2_4.metadata;
  const params = config.iec_62443_2_4["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "iec_62443_2_4" ' + stepNumber + ' mancante.');
  }
  console.log("params+metadata", params, metadata);
  finish(params, metadata);
}

if (require.main === module) {
  main();
}
