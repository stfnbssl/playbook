const express = require('express');
const path = require('path');

const router = express.Router();

// Configurazione
const BASE_DIR = process.env.CHUNKS_BASE_DIR || 'C:\\My\\wizzi\\stfnbssl\\cybersecurity\\packages\\ingestion-norme\\extraction';
const PORT = process.env.PORT || 3005;

// Route per informazioni sul server
router.get('/server-info', (req, res) => {
    res.json({
        server: 'JSON Chunks Viewer',
        version: '1.0.0',
        port: PORT,
        baseDir: BASE_DIR,
        publicDir: path.join(__dirname, '..', 'public'),
        staticFilesEnabled: true,
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        uptime: process.uptime(),
        endpoints: {
            api: [
                'GET /api/chunks-files - Lista tutti i file chunks.json',
                'GET /api/chunks-content?path=[path] - Contenuto di un file specifico',
                'GET /api/static-files - Lista file statici disponibili',
                'GET /data/ingestion - Dati del file ingestion.json',
                'GET /data/ingestion/stats - Statistiche file ingestion',
                'POST /data/ingestion/refresh - Aggiorna cache ingestion'
            ],
            pages: [
                'GET / - Home con pagine statiche',
                'GET /chunks-viewer - Visualizzatore chunks',
                'GET /about.html - Pagina informazioni',
                'GET /server-info - Informazioni server',
                'GET /public/* - File statici'
            ]
        },
        timestamp: new Date().toISOString()
    });
});

// Route per health check
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

module.exports = router;