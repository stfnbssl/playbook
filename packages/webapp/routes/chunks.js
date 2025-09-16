const express = require('express');
const path = require('path');
const { scanForChunksFiles, readChunksFile } = require('../utils/chunks-scanner');

const router = express.Router();

// Configurazione della cartella base
const BASE_DIR = process.env.CHUNKS_BASE_DIR || 'C:\\My\\wizzi\\stfnbssl\\cybersecurity\\packages\\ingestion-norme\\extraction';

// API endpoint per ottenere tutti i file chunks.json
router.get('/api/chunks-files', (req, res) => {
    try {
        const chunksFiles = scanForChunksFiles(BASE_DIR);
        
        res.json({
            success: true,
            count: chunksFiles.length,
            baseDir: BASE_DIR,
            files: chunksFiles
        });
        
        console.log(`📊 Trovati ${chunksFiles.length} file chunks.json`);
        
    } catch (error) {
        console.error('Errore nella scansione dei chunks:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// API endpoint per leggere il contenuto di un file chunks specifico
router.get('/api/chunks-content', (req, res) => {
    const filePath = req.query.path;
    
    if (!filePath) {
        return res.status(400).json({
            success: false,
            error: 'Path del file richiesto'
        });
    }
    
    console.log('🔍 Tentativo di leggere file:', filePath);
    
    try {
        const result = readChunksFile(filePath);
        
        if (!result.success) {
            return res.status(404).json(result);
        }
        
        res.json({
            success: true,
            path: filePath,
            content: result.content,
            metadata: {
                size: result.size,
                lastModified: result.lastModified
            }
        });
        
        console.log(`✅ File letto con successo: ${filePath}`);
        
    } catch (error) {
        console.error('❌ Errore nel leggere il file:', error);
        res.status(500).json({
            success: false,
            error: `Errore nella lettura del file: ${error.message}`
        });
    }
});

// Route per la pagina chunks-viewer
router.get('/chunks-viewer', (req, res) => {
    console.log("📊 Serving chunks-viewer page");
    const chunksViewerPath = path.join(__dirname, '..', 'chunks-viewer.html');
    res.sendFile(chunksViewerPath);
});

module.exports = router;