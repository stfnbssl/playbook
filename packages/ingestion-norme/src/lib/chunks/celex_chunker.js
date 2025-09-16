const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync} = require('../utils');
// const { createChunks } = require('./celex_article_chunk');
const { createChunks } = require('./celex_article_chunk_v2');
function execute(params, metadata) {
    const chunksObj = readJSONSync(params.inputJSONPath);
    
    let newChunks = []
    if (false) {
        chunksObj.structure.children.forEach(child => {
            // console.log("child.type", child.type);
            if (child.type == 'art') {
                const articleChunks = createChunks(child, metadata);
                newChunks = newChunks.concat(articleChunks);
                console.log(`✅ Creati ${newChunks.length} chunks per articolo ${metadata.framework_code} / ${child.id}.`);
            }
        });
    } else {
        chunksObj.articles.forEach(child => {
            const articleChunks = createChunks(child, metadata);
            newChunks = newChunks.concat(articleChunks);
            console.log(`✅ Creati ${newChunks.length} chunks per articolo ${metadata.framework_code} / ${child.id}.`);
        });
    }
    ensureDirSync(params.outputJSONPath);
    writeJSONSync(params.outputJSONPath, {
      chunks: newChunks
    })
    console.log(`✅ ${newChunks.length} chunks in ${params.inputJSONPath} con successo!`);
    if (params.outputWebappJSONPath) {
      ensureDirSync(params.outputWebappJSONPath);
      writeJSONSync(params.outputWebappJSONPath, {
        chunks: newChunks
      })
    }
    console.log(`✅ Creato file ${params.outputWebappJSONPath} con successo!`);
}

function main() {
  const [, , configPath, configProp, stepArg] = process.argv;
  if (!configPath || !stepArg) {
    console.log('Uso: node chunks/celex_chunker.js <config.json> <configProp> <stepNumber>');
    process.exit(2);
  }
  const config = readJSONSync(configPath);
  if (!config || typeof config !== 'object' || !config[configProp]) {
    exitWithError('Configurazione non valida: proprietà radice "' + configProp + '" mancante.');
  }

  const metadata = config[configProp].metadata;
  const params = config[configProp][stepArg];
  if (!params) {
    exitWithError('Configurazione non valida: proprietà radice "' + configProp+ '.' + stepArg + '" mancante.');
  }
  console.log("params+metadata", params, metadata);
  execute(params, metadata);
}

if (require.main === module) {
  main();
}
