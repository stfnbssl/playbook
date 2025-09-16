const fs = require('fs');
const path = require('path');

/**
 * Scansiona ricorsivamente le cartelle per trovare file chunks.json
 * @param {string} baseDir - Directory base da scansionare
 * @returns {Array} Array di oggetti con informazioni sui file trovati
 */
function scanForChunksFiles(baseDir) {
    const results = [];
    
    function scanDirectory(currentDir) {
        try {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    // Scansiona ricorsivamente le sottocartelle
                    scanDirectory(fullPath);
                } else if (item === 'chunks.json') {
                    // Trovato un file chunks.json
                    const relativePath = path.relative(baseDir, fullPath);
                    results.push({
                        path: fullPath,
                        relativePath: relativePath,
                        directory: path.dirname(relativePath),
                        lastModified: stat.mtime,
                        size: stat.size
                    });
                }
            }
        } catch (error) {
            console.error(`❌ Errore nella scansione di ${currentDir}:`, error.message);
        }
    }
    
    // Verifica che la directory base esista
    if (!fs.existsSync(baseDir)) {
        console.warn(`⚠️ Directory base non trovata: ${baseDir}`);
        return results;
    }
    
    console.log(`🔍 Scansionando directory: ${baseDir}`);
    scanDirectory(baseDir);
    console.log(`✅ Scansione completata, trovati ${results.length} file chunks.json`);
    
    return results;
}

/**
 * Legge e parsa un file chunks.json specifico
 * @param {string} filePath - Path del file da leggere
 * @returns {Object} Oggetto con success, content e metadati
 */
function readChunksFile(filePath) {
    try {
        // Verifica che il file esista
        if (!fs.existsSync(filePath)) {
            return {
                success: false,
                error: `File non trovato: ${filePath}`
            };
        }
        
        // Ottieni le statistiche del file
        const stat = fs.statSync(filePath);
        
        // Leggi il contenuto del file
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Parsa il JSON
        let jsonContent;
        try {
            jsonContent = JSON.parse(content);
        } catch (parseError) {
            return {
                success: false,
                error: `Errore nel parsing JSON: ${parseError.message}`
            };
        }
        
        return {
            success: true,
            content: jsonContent,
            size: stat.size,
            lastModified: stat.mtime,
            path: filePath
        };
        
    } catch (error) {
        return {
            success: false,
            error: `Errore nella lettura del file: ${error.message}`
        };
    }
}

/**
 * Ottiene statistiche aggregate sui file chunks
 * @param {string} baseDir - Directory base da analizzare
 * @returns {Object} Statistiche aggregate
 */
function getChunksStats(baseDir) {
    const files = scanForChunksFiles(baseDir);
    
    let totalSize = 0;
    let totalChunks = 0;
    const directories = new Set();
    
    files.forEach(file => {
        totalSize += file.size;
        directories.add(file.directory);
        
        // Opzionalmente, leggi il file per contare i chunks
        try {
            const result = readChunksFile(file.path);
            if (result.success && result.content.chunks) {
                totalChunks += result.content.chunks.length;
            }
        } catch (error) {
            console.warn(`⚠️ Impossibile contare chunks in ${file.path}:`, error.message);
        }
    });
    
    return {
        totalFiles: files.length,
        totalDirectories: directories.size,
        totalSize,
        totalChunks,
        averageFileSize: files.length > 0 ? Math.round(totalSize / files.length) : 0,
        directories: Array.from(directories).sort()
    };
}

/**
 * Verifica l'integrità di un file chunks.json
 * @param {string} filePath - Path del file da verificare
 * @returns {Object} Risultato della verifica
 */
function validateChunksFile(filePath) {
    const result = readChunksFile(filePath);
    
    if (!result.success) {
        return result;
    }
    
    const content = result.content;
    const issues = [];
    
    // Verifica la struttura base
    if (!content.chunks || !Array.isArray(content.chunks)) {
        issues.push('Manca la proprietà "chunks" o non è un array');
    }
    
    // Verifica ogni chunk
    if (content.chunks) {
        content.chunks.forEach((chunk, index) => {
            if (!chunk.section_path) {
                issues.push(`Chunk ${index}: manca section_path`);
            }
            if (!chunk.text_normative) {
                issues.push(`Chunk ${index}: manca text_normative`);
            }
        });
    }
    
    return {
        success: true,
        valid: issues.length === 0,
        issues,
        chunksCount: content.chunks ? content.chunks.length : 0,
        path: filePath
    };
}

module.exports = {
    scanForChunksFiles,
    readChunksFile,
    getChunksStats,
    validateChunksFile
};