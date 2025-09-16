// extractor.js (CommonJS)
// Uso: node extractor.js /path/to/config.json 1
const fs = require('fs');
const path = require('path');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync, writeFileSync,
  isRegExp, parseRegExp, cleanHiddenUnicodeCharacters} = require('../utils');

const dbtopic = readJSONSync("C:/My/wizzi/stfnbssl/cybersecurity/packages/lb-audit/docs/project/dbtopic/ai_step_1_out/index.json");

let prevObj = null;
let prevId = null;
var result = [];
dbtopic.items.forEach(item =>{
    if (item.ambito) {
        console.log("ambito.id", item.ambito.id)
        if (item.ambito.id == prevId) {
            item.ambito.sezioni.forEach(sezione =>{
                console.log("sezione.id", sezione.id)
                prevObj.ambito.sezioni.push(sezione);
            });
        } else {
            if (prevObj) {
                result.push(prevObj);
            }
            prevObj = item;
            prevId = item.ambito.id;
            console.log("sezione.id", item.ambito.sezioni[0].id)
        }
    } else {
        console.error(item);
        // throw new Error();
    }
});
if (prevObj) {
    result.push(prevObj);
}
dbtopic.items = result;

writeJSONSync("C:/My/wizzi/stfnbssl/cybersecurity/packages/lb-audit/docs/project/dbtopic/ai_step_1_out/index_compacted.json", dbtopic);

