const fs = require('fs');
const path = require('path');

/**
 * Scansiona la cartella public per file statici
 * @param {string} baseDir - Directory base del progetto
 * @returns {Object} Risultato con elenco file e metadati
 */
function scanPublicFiles(baseDir) {
    const publicDir = path.join(baseDir, '..', 'public'); // Corregge il path per routes
    const files = [];
    
    function scanDirectory(dir, relativePath = '') {
        try {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                const itemRelativePath = path.join(relativePath, item);
                
                if (stat.isFile()) {
                    files.push({
                        name: item,
                        path: '/' + itemRelativePath.replace(/\\/g, '/'),
                        fullPath: fullPath,
                        size: stat.size,
                        lastModified: stat.mtime,
                        created: stat.birthtime,
                        type: path.extname(item) || 'no-ext',
                        directory: relativePath || 'root'
                    });
                } else if (stat.isDirectory()) {
                    // Scansiona ricorsivamente le sottocartelle
                    scanDirectory(fullPath, itemRelativePath);
                }
            }
        } catch (error) {
            console.error(`❌ Errore nella scansione di ${dir}:`, error.message);
        }
    }
    
    if (fs.existsSync(publicDir)) {
        scanDirectory(publicDir);
    } else {
        console.warn(`⚠️ Cartella public non trovata: ${publicDir}`);
    }
    
    return {
        publicDir,
        files,
        stats: generateFileStats(files)
    };
}

/**
 * Genera statistiche sui file statici
 * @param {Array} files - Array di file
 * @returns {Object} Statistiche aggregate
 */
function generateFileStats(files) {
    const stats = {
        totalFiles: files.length,
        totalSize: 0,
        fileTypes: {},
        directories: new Set(),
        largestFile: null,
        newestFile: null
    };
    
    files.forEach(file => {
        stats.totalSize += file.size;
        
        // Conta per tipo di file
        const ext = file.type.toLowerCase();
        stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1;
        
        // Traccia le directory
        stats.directories.add(file.directory);
        
        // File più grande
        if (!stats.largestFile || file.size > stats.largestFile.size) {
            stats.largestFile = file;
        }
        
        // File più recente
        if (!stats.newestFile || file.lastModified > stats.newestFile.lastModified) {
            stats.newestFile = file;
        }
    });
    
    stats.directories = Array.from(stats.directories).sort();
    stats.averageFileSize = files.length > 0 ? Math.round(stats.totalSize / files.length) : 0;
    
    return stats;
}

/**
 * Formatta le dimensioni dei file in modo leggibile
 * @param {number} bytes - Dimensione in bytes
 * @returns {string} Dimensione formattata
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Ottiene il tipo MIME di un file basato sull'estensione
 * @param {string} filename - Nome del file
 * @returns {string} Tipo MIME
 */
function getMimeType(filename) {
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.txt': 'text/plain',
        '.pdf': 'application/pdf',
        '.zip': 'application/zip'
    };
    
    return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Verifica se un file statico esiste
 * @param {string} baseDir - Directory base del progetto
 * @param {string} relativePath - Path relativo del file
 * @returns {Object} Risultato della verifica
 */
function checkStaticFile(baseDir, relativePath) {
    const publicDir = path.join(baseDir, 'public');
    const fullPath = path.join(publicDir, relativePath);
    
    try {
        if (fs.existsSync(fullPath)) {
            const stat = fs.statSync(fullPath);
            return {
                exists: true,
                path: fullPath,
                size: stat.size,
                lastModified: stat.mtime,
                mimeType: getMimeType(relativePath)
            };
        } else {
            return {
                exists: false,
                path: fullPath,
                error: 'File non trovato'
            };
        }
    } catch (error) {
        return {
            exists: false,
            path: fullPath,
            error: error.message
        };
    }
}

module.exports = {
    scanPublicFiles,
    generateFileStats,
    formatFileSize,
    getMimeType,
    checkStaticFile
};