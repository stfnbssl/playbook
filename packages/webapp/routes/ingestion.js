/**
 * Route per servire i dati di ingestion.json
 * Endpoint: GET /data/ingestion
 */

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Path del file JSON
const INGESTION_FILE_PATH = path.resolve('C:\\My\\wizzi\\stfnbssl\\cybersecurity\\packages\\ingestion-norme\\ingestion.json');

// Cache per i dati (opzionale, per migliorare le performance)
let cachedData = null;
let cacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuti in millisecondi

/**
 * Legge il file ingestion.json
 * @returns {Promise<Object>} Dati JSON parsati
 */
async function readIngestionData() {
    try {
        // Controlla se esiste una cache valida
        if (cachedData && cacheTime && (Date.now() - cacheTime < CACHE_DURATION)) {
            return cachedData;
        }

        // Verifica se il file esiste
        await fs.access(INGESTION_FILE_PATH, fs.constants.F_OK);
        
        // Legge il file
        const fileContent = await fs.readFile(INGESTION_FILE_PATH, 'utf8');
        
        // Parsa il JSON
        const jsonData = JSON.parse(fileContent);
        
        // Aggiorna la cache
        cachedData = jsonData;
        cacheTime = Date.now();
        
        return jsonData;
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`File ingestion.json non trovato: ${INGESTION_FILE_PATH}`);
        } else if (error instanceof SyntaxError) {
            throw new Error(`Il file ingestion.json contiene JSON non valido: ${error.message}`);
        } else {
            throw new Error(`Errore nella lettura del file: ${error.message}`);
        }
    }
}

/**
 * Ottiene le statistiche del file
 * @returns {Promise<Object>} Statistiche del file
 */
async function getFileStats() {
    try {
        const stats = await fs.stat(INGESTION_FILE_PATH);
        return {
            size: stats.size,
            lastModified: stats.mtime,
            created: stats.birthtime
        };
    } catch (error) {
        return null;
    }
}

/**
 * Pulisce la cache (utile per forzare il reload)
 */
function clearCache() {
    cachedData = null;
    cacheTime = null;
}

// Route principale per ottenere i dati
router.get('/data/ingestion', async (req, res) => {
    try {
        const data = await readIngestionData();
        const stats = await getFileStats();
        
        // Risposta con i dati e metadati
        res.json({
            success: true,
            data: data,
            metadata: {
                timestamp: new Date().toISOString(),
                cached: cachedData !== null,
                fileStats: stats
            }
        });
        
    } catch (error) {
        console.error('Errore nella route /data/ingestion:', error.message);
        
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Route per ottenere solo le statistiche del file (senza caricare tutto il JSON)
router.get('/data/ingestion/stats', async (req, res) => {
    try {
        const stats = await getFileStats();
        
        if (!stats) {
            return res.status(404).json({
                success: false,
                error: 'File non trovato'
            });
        }
        
        res.json({
            success: true,
            stats: stats,
            cached: cachedData !== null,
            cacheTime: cacheTime ? new Date(cacheTime).toISOString() : null
        });
        
    } catch (error) {
        console.error('Errore nella route /data/ingestion/stats:', error.message);
        
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Route per forzare il refresh della cache
router.post('/data/ingestion/refresh', async (req, res) => {
    try {
        // Pulisce la cache
        clearCache();
        
        // Ricarica i dati
        const data = await readIngestionData();
        
        res.json({
            success: true,
            message: 'Cache aggiornata con successo',
            timestamp: new Date().toISOString(),
            dataLoaded: !!data
        });
        
    } catch (error) {
        console.error('Errore nel refresh della cache:', error.message);
        
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Route per ottenere informazioni sulla cache
router.get('/data/ingestion/cache-info', (req, res) => {
    res.json({
        success: true,
        cache: {
            active: cachedData !== null,
            timestamp: cacheTime ? new Date(cacheTime).toISOString() : null,
            age: cacheTime ? Date.now() - cacheTime : null,
            duration: CACHE_DURATION,
            expired: cacheTime ? (Date.now() - cacheTime > CACHE_DURATION) : true
        }
    });
});

// Route per estrarre lbId e outputWebappJSONPath
router.get('/data/ingestion/webapp', async (req, res) => {
    try {
        // Carica i dati di ingestion
        const data = await readIngestionData();
        
        // Array risultato
        const webappData = [];
        
        // Scandisce tutte le proprietà dell'oggetto principale
        Object.keys(data).forEach(key => {
            const item = data[key];
            
            // Verifica che sia un oggetto e abbia metadata con lbId
            if (item && 
                typeof item === 'object' && 
                item.metadata && 
                item.metadata.lbId) {
                
                const lbId = item.metadata.lbId;
                
                // Cerca outputWebappJSONPath in tutte le proprietà step{x}
                let outputWebappJSONPath = null;
                
                Object.keys(item).forEach(propKey => {
                    // Controlla se è una proprietà step{x}
                    if (propKey.startsWith('step') && 
                        item[propKey] && 
                        typeof item[propKey] === 'object' && 
                        item[propKey].outputWebappJSONPath) {
                        
                        outputWebappJSONPath = item[propKey].outputWebappJSONPath;
                    }
                });
                
                // Se abbiamo trovato entrambi i valori, aggiungi al risultato
                if (outputWebappJSONPath) {
                    webappData.push({
                        lbId: lbId,
                        outputWebappJSONPath: outputWebappJSONPath.substring("C:/My/wizzi/stfnbssl/cybersecurity/packages/webapp/public".length),
                        sourceKey: key // Opzionale: chiave originale per debug
                    });
                }
            }
        });
        
        res.json({
            success: true,
            count: webappData.length,
            data: webappData,
            timestamp: new Date().toISOString()
        });
        
        console.log(`📊 Estratti ${webappData.length} elementi webapp da ingestion`);
        
    } catch (error) {
        console.error('Errore nella route /data/ingestion/webapp:', error.message);
        
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Middleware di gestione errori per questa route
router.use((error, req, res, next) => {
    console.error('Errore nella route ingestion:', error);
    
    if (!res.headersSent) {
        res.status(500).json({
            success: false,
            error: 'Errore interno del server',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Errore nella gestione dei dati'
        });
    }
    
    next(error);
});

module.exports = router;