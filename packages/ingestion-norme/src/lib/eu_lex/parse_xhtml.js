const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const {exitWithError, ensureDirSync, readTextSync, readJSONSync, writeJSONSync, writeFileSync} = require('../utils');

// Oggetto accumulatore che viene passato a tutte le funzioni
const accumulator = {
    articles: [],
    currentArticle: null,
    currentChild1: null,
    currentChild2: null,
    extractedContent: []
};

// --- ELI known 3-letter codes (estratto essenziale) ---
const KNOWN = new Set(['cpt','fnp','art','par','tit']);

// Riconosce segmenti ELI: "art_2", "pnt_a", "art_212a"
function parseEliSeg(seg) {
  const m = seg.match(/^([a-z]{3})_(.+)$/i);
  if (!m) return null;
  const code = m[1].toLowerCase();
  if (!KNOWN.has(code)) return null;
  return { code, id: m[2] };
}

// Riconosce ID numerici OJ: "002", "002.001", "002.001.003", ...
function parseNumericId(id) {
  if (!/^\d{3}(?:\.\d{3}){0,3}$/.test(id)) return null;
  return id.split('.').map(s => parseInt(s, 10)); // [2,1,3,...]
}

function classifyByText(text, levelIndex /* 2=terzo livello, 3=quarto livello */) {
  const t = text.trim().replace(/\s+/g, ' ');
  // marker tipici all'inizio riga
  const starts = t.slice(0, 8);
  let match = starts.match(/^\(?([a-z])\)/)
  if (match) {
    // console.log("match", match);
    return { type: 'pnt', value: match[1] };
  }
  match = starts.match(/^\(?([ivxlcdm])+\)/)
  if (match) {
    return { type: 'idt', value: match[1] };
  }
  match = starts.match(/^\(?(\d+)\)|^\d+\./)
  if (match) {
    return { type: 'sub', value: match[1] }; // or 'par'
  }
  return { type: 'unknown', value: text }; // or 'par'
}

// Funzione principale per caricare e processare il file XHTML
function processXHTMLFile(filePath, acc) {
    console.log(`📂 Caricamento file: ${filePath}`);
    
    // Leggi il file XHTML
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    console.log(`✅ File caricato, dimensione: ${htmlContent.length} caratteri`);
    
    // Carica il contenuto in Cheerio
    const $ = cheerio.load(htmlContent, {
        xmlMode: true,  // Importante per XHTML
        decodeEntities: true
    });
    
    console.log('\n🔍 Inizio scansione dei nodi...\n');
    
    // Inizia la scansione ricorsiva dal root
    scanAllNodes($, $('html').length ? $('html') : $.root(), acc, 0);
    
    return acc;
       
}

// Funzione ricorsiva per scandire tutti i nodi
function scanAllNodes($, element, acc) {
    
    // Se è un elemento HTML
    if (element.length && element[0].type === 'tag') {
        const tagName = element[0].name;
        if (tagName.toUpperCase() == 'TABLE') {
            acc.rows = [];
            element.children().each((index, child) => {
                scanTable($, $(child), acc);
            });
            
            if (acc.activeElement && acc.activeElement.rows) {
                acc.activeElement.rows = acc.activeElement.rows.concat(acc.rows);
            } else {
                console.log("acc.activeElement", acc.activeElement);
                console.log("acc.rows", JSON.stringify(acc.rows,null,2));
            }
            acc.rows = null;
            acc.currentRow = null;
            acc.currentColumn = null;
        } else {
            const nodeText = element.text().trim().replace(/\u00A0/g, " ");
            // console.log("nodeText", nodeText);
            // console.log("acc.collectingText", acc.collectingText);
            let result = null;
            if (nodeText && acc.collectingText) {
                acc.collectingText.push(nodeText);
            } else {
                result = processAttributes($, element, acc);
                // console.log("result.type", result.type);
                if (!result.type) {
                    if (nodeText && acc.activeElement) {
                        if (!(acc.activeElement.isArticle && nodeText.startsWith('Article '))) {
                            if (acc.activeElement.isParagraph && acc.activeElement.text.length == 0) {
                                acc.activeElement.text.push(nodeText.replace(/^\d+\.\s+/, ''));
                            } else {
                                acc.activeElement.text.push(nodeText);
                            }
                        }
                        
                    }
                }
            }
            // console.log("result", result);
            if (result && result.type == "title") {
                acc.collectingText = [];
            }
            element.children().each((index, child) => {
                scanAllNodes($, $(child), acc);
            });
            if (result && result.type == "title") {
                acc.activeElement.title = acc.collectingText.join(' ');
                acc.collectingText = null;
            }
        }
    } 
    // Se è un nodo di testo
    else if (element[0] && element[0].type === 'text') {
        const textContent = element.text().trim();
        if (textContent && acc.collectingText) {
            // console.log("nodeText", nodeText);
            acc.collectingText.push(textContent);
        }
    }
}

// Funzione per processare gli attributi
function processAttributes($, element, acc) {
    const attrs = element[0].attribs || {};
    
    const result = {}
    Object.keys(attrs).forEach(attrName => {
        const attrValue = attrs[attrName];
        if (attrName == 'id') {
            const eliseg = parseEliSeg(attrValue);
            if (eliseg && eliseg.code == 'cpt') {
                acc.currentArticle = null;
                acc.activeElement = null;
                acc.currentChild1 = null;
            } else if (eliseg && eliseg.code == 'fnp') {
                acc.currentArticle = null;
                acc.activeElement = null;
                acc.currentChild1 = null;
            } else if (eliseg && eliseg.code == 'art') {
                const eliSegments = attrValue.split('.').map(parseEliSeg);           
                // console.log("eliSegments", eliSegments);
                if (eliSegments[1] && eliSegments[1].code == 'tit') {
                    result.type = "title";
                } else {
                    const art = { id: eliseg.id, title: null, isArticle: true, text:[], anchor: '#' + attrValue, children: [], rows: [] };
                    acc.articles.push(art);
                    acc.currentArticle = art;
                    acc.activeElement = art;
                    acc.currentChild1 = null;
                    result.type = "article";
                }
            } else {
                const nums = parseNumericId(attrValue);
                if (nums) {
                    if(nums.length == 2) {
                        // console.log("Found nums", nums);
                        const par = { id: nums[1], title: null, isParagraph: true, text:[], anchor: '#' + attrValue, nums: nums, children: [], rows: [] };
                        if (acc.currentChild1) {
                            if (acc.currentChild1.nums.length == nums.length) {
                                acc.currentArticle.children.push(par);
                                acc.currentChild1 = par;
                                acc.activeElement = par;
                            } else {
                                console.log(element);
                                console.log("nums", nums);
                                throw new Error("acc.currentChild1");
                            }
                        } else {
                            acc.currentArticle.children.push(par);
                            acc.currentChild1 = par;
                            acc.activeElement = par;
                        }
                        result.type = "child1";
                    } else {
                        throw new Error(nums);
                    }
                }
            }
        }
    });
    return result;
}

function scanTable($, element, acc) {
    const tagName = element[0].name;
    if (tagName.toUpperCase() == 'TR') {
        const row = { columns: []};
        acc.rows.push(row);
        acc.currentRow = row;
    }
    else if (tagName.toUpperCase() == 'TD') {
        const column = { text: []};
        acc.currentRow.columns.push(column);
        acc.currentColumn = column;
    } else {
        const nodeText = element.text().trim().replace(/\u00A0/g, " ");
        if (nodeText && acc.currentColumn)
        {
            acc.currentColumn.text.push(nodeText.trim());
            acc.currentColumn.class = classifyByText(nodeText.trim(), 2);
        }
    }
    element.children().each((index, child) => {
        scanTable($, $(child), acc);
    });
}

// Esporta le funzioni per uso esterno
async function executeExtraction(config) {
    console.log(`📂 PARSE XHTML: ${config.CELEX}`);    
    if (!config.inputXHTMLPath) {
        throw new Error(`Proprietà "inputXHTMLPath" mancante nella configurazione`);
    }
    if (!config.outputJSONPath) {
        throw new Error(`Proprietà "outputJSONPath" mancante nella configurazione`);
    }
    const result = processXHTMLFile(config.inputXHTMLPath, accumulator);
    ensureDirSync(config.outputJSONPath);
    writeJSONSync(config.outputJSONPath, result);
    console.log(`💾 File output: ${config.outputJSONPath}`);
}

async function main() {
    const [, , configPath, configProp, stepArg] = process.argv;
    if (!configPath || !configProp || !stepArg) {
        console.log('Uso: node add_ids.js <config.json> <configProp> <stepNumber>');
        process.exit(2);
    }
    const stepProp = stepArg;

    const config = readJSONSync(configPath);
    if (!config || typeof config !== 'object' || !config[configProp]) {
        exitWithError('Configurazione non valida: proprietà radice "' + configProp + '" mancante.');
    }
    if (!config[configProp][stepProp]) {
        exitWithError('Configurazione non valida: step "' + stepProp + '" mancante.');
    }
    console.log("config." + configProp + '.' + stepProp, config[configProp][stepProp])
    await executeExtraction(config[configProp][stepProp]);
}

// Gestione segnali per chiusura pulita
process.on('SIGINT', () => {
    console.log('\n🛑 Interruzione richiesta dall\'utente');
    process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Errore non gestito:', reason);
    process.exit(1);
});

// Avvia l'esecuzione se questo file viene eseguito direttamente
// Eseguo lo script se chiamato direttamente
if (require.main === module) {
    main();
}
