const crypto = require('crypto');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync} = require('../utils');

function sha256(data) {
    return crypto
        .createHash('sha256')
        .update(data, typeof data === 'string' ? 'utf8' : undefined)
        .digest('hex');
}

/* TODO
  Quando un control ha più statement se l'elemento control non
  ha azioni vengono emessi solo gli statements, che hanno ciascuno un id parte che diventa l'id del chunk
  l'id del control in questo caso non viene emesso.
  Sarebbe meglio emettere comunque il chunk del controlo con informative: true e normative: false
  e negli statement indicare l'id del control nel parentId.
  In questo modo anche gli enhancement possono aver nel parentId l'id del control e se hanno statement con partId
  il parentId di quest sarà l'id del control enhancemente 
  e avremo una gerarchia a tre livelli: control, control enhancement, statement dell'enhancemente.
  Il control avrà come figli i propri statement part e i control enhancements.
*/

function finish(params, metadata) {
    const documentObj = readJSONSync(params.inputJSONPath);
    const newChunks = []
    documentObj.forEach(control => {
      const ctrlId = control.id;
      if (control.statements && control.statements.length > 0) {
        control.statements.forEach(stm => {
          if (!stm.id.startsWith(ctrlId)) {
              throw new Error("Invalid statement id", stm.id, ctrlId);
          }
          console.log(1, control.id, control.groupId, control.groupTitle);
          const id = stm.id;
          const newChunk = Object.assign({}, metadata, {
            chunk_id: "NIST-800-53:2020/" + id,
            doc_id: "NIST-800-53:2020",
            section_path: id,
            parent_id: null,
            group_id: "NIST-800-53:2020/" + id + "[" + control.page + "]",
              parent_id: null,
              group_id: "NIST-800-53:2020/" + id + "[" + control.page + "]",
              seq: 1,
              normative: true,
              informative: false,
              text_normative: stm.textDisplay,
              text_informative: null,
              context_note: null,
              sha256: sha256(stm.textDisplay),
              context: {
                lbLexStdId: metadata.lbId,
                sourceUrl: metadata.sourceUrl,
                sourceType: 'pdf',
                groupId: control.groupId,
                superTitle: control.groupTitle,
                title: control.title,
                guidance: stm.guidance,
                page: control.page
              }
          });
          newChunks.push(newChunk);
          if (control.controlEnhancements && control.controlEnhancements.length) {
            control.controlEnhancements.forEach(controlEnh => {
              if (controlEnh.statements) {
                controlEnh.statements.forEach(stm2 => {
                  if (!stm2.id.startsWith(ctrlId)) {
                      throw new Error("Invalid statement id", stm2.id, ctrlId);
                  }
                  const id = stm2.id;
                  const newChunk = Object.assign({}, metadata, {
                    chunk_id: "NIST-800-53:2020/" + id,
                    doc_id: "NIST-800-53:2020",
                    section_path: id,
                    parent_id: null,
                    group_id: "NIST-800-53:2020/" + id + "[" + controlEnh.page + "]",
                      parent_id: "NIST-800-53:2020/" + ctrlId.id,
                      group_id: "NIST-800-53:2020/" + id + "[" + controlEnh.page + "]",
                      seq: 1,
                      normative: true,
                      informative: false,
                      text_normative: stm2.textDisplay,
                      text_informative: null,
                      context_note: null,
                      sha256: sha256(stm2.textDisplay),
                      context: {
                        lbLexStdId: metadata.lbId,
                        sourceUrl: metadata.sourceUrl,
                        sourceType: 'pdf',
                        groupId: control.groupId,
                        superTitle: control.groupTitle,
                        title: control.title,
                        guidance: stm2.guidance,
                        page: controlEnh.page
                      }
                  });
                  newChunks.push(newChunk);
                });
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
    console.log('Uso: node nist_800_53/chunker.js <config.json> <stepNumber>');
    process.exit(2);
  }

  const stepNumber = Number(stepArg);
  if (!Number.isInteger(stepNumber)) exitWithError('Il numero di step deve essere un intero.');

  const config = readJSONSync(configPath);
  if (!config || typeof config !== 'object' || !config.nist_800_53) {
    exitWithError('Configurazione non valida: proprietà radice "nist_800_53" mancante.');
  }

  const metadata = config.nist_800_53.metadata;
  const params = config.nist_800_53["step"+stepNumber];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "nist_800_53" ' + stepNumber + ' mancante.');
  }
  console.log("params+metadata", params, metadata);
  finish(params, metadata);
}

if (require.main === module) {
  main();
}
