const express = require('express');
const { scanPublicFiles } = require('../utils/static-scanner');

const router = express.Router();

// API endpoint per informazioni sui file statici disponibili
router.get('/api/static-files', (req, res) => {
    try {
        const result = scanPublicFiles(__dirname);
        
        res.json({
            success: true,
            publicDir: result.publicDir,
            count: result.files.length,
            files: result.files
        });
        
        console.log(`📄 Trovati ${result.files.length} file statici`);
        
    } catch (error) {
        console.error('❌ Errore nella scansione dei file statici:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;