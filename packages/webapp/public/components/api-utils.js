/**
 * API Utilities for Chunks Viewer
 * Modulo CommonJS per gestire le chiamate API
 */

(function(global) {
    'use strict';

    /**
     * Carica json file
     * @returns {Promise<Object>} Promise che risolve con {success: boolean, files?: Array, error?: string}
     */
    async function loadJSONFile(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return data;
        } catch (err) {
            return {
                success: false,
                error: `Errore di connessione: ${err.message}`
            };
        }
    }

    /**
     * Carica la lista dei file chunks disponibili
     * @returns {Promise<Object>} Promise che risolve con {success: boolean, files?: Array, error?: string}
     */
    async function loadChunkFilesList() {
        try {
            const response = await fetch('/data/ingestion/webapp');
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return data;
        } catch (err) {
            return {
                success: false,
                error: `Errore di connessione: ${err.message}`
            };
        }
    }

    /**
     * Carica il contenuto di un file chunks specifico
     * @param {string} filePath - Path del file da caricare
     * @returns {Promise<Object>} Promise che risolve con {success: boolean, content?: Object, error?: string}
     */
    async function loadChunksContent(filePath) {
        if (!filePath) {
            return {
                success: false,
                error: 'Path del file non specificato'
            };
        }
        return loadJSONFile(filePath);
        /* OLD VIA
        try {
            const response = await fetch('/api/chunks-content?path=' + encodeURIComponent(filePath));
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return data;
        } catch (err) {
            return {
                success: false,
                error: `Errore nel caricare il contenuto: ${err.message}`
            };
        }
        */
    }

    /**
     * Utility per formattare le dimensioni dei file
     * @param {number} bytes - Dimensione in bytes
     * @returns {string} Dimensione formattata (KB, MB, etc.)
     */
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * Utility per formattare il testo, rimuovendo caratteri speciali se necessario
     * @param {string} text - Testo da formattare
     * @returns {string} Testo formattato
     */
    function formatText(text) {
        if (!text) return '';
        
        // Rimuovi eventuali caratteri di controllo e normalizza gli spazi
        return text.replace(/[\r\n\t]+/g, ' ').trim();
    }

    /**
     * Utility per evidenziare il termine di ricerca nel testo
     * @param {string} text - Testo in cui cercare
     * @param {string} searchTerm - Termine da evidenziare
     * @returns {string} Testo con termine evidenziato (HTML)
     */
    function highlightSearchTerm(text, searchTerm) {
        if (!text || !searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    /**
     * Filtra i chunks in base ai criteri specificati
     * @param {Array} chunks - Array di chunks da filtrare
     * @param {Object} filters - Oggetto con i filtri da applicare
     * @param {string} filters.searchTerm - Termine di ricerca
     * @param {boolean} filters.showOnlyRelevantVerb - Mostra solo relevant verbs
     * @returns {Array} Array di chunks filtrati
     */
    function filterChunks(chunks, filters = {}) {
        let filtered = [...chunks];
        
        // Filtro per isRelevantVerb
        if (filters.showOnlyRelevantVerb) {
            filtered = filtered.filter(chunk => 
                chunk.context && chunk.context.isRelevantVerb === true
            );
        }
        
        // Filtro per ricerca testuale
        if (filters.searchTerm && filters.searchTerm.trim()) {
            const search = filters.searchTerm.toLowerCase().trim();
            filtered = filtered.filter(chunk => {
                const sectionPath = (chunk.section_path || '').toLowerCase();
                const textNormative = (chunk.text_normative || '').toLowerCase();
                return sectionPath.includes(search) || textNormative.includes(search);
            });
        }
        
        return filtered;
    }

    /**
     * Conta i chunks con isRelevantVerb = true
     * @param {Array} chunks - Array di chunks
     * @returns {number} Numero di chunks con relevant verb
     */
    function countRelevantVerbs(chunks) {
        return chunks.filter(chunk => 
            chunk.context && chunk.context.isRelevantVerb === true
        ).length;
    }

    // Esporta le funzioni nel namespace globale
    const APIUtils = {
        loadJSONFile,
        loadChunkFilesList,
        loadChunksContent,
        formatFileSize,
        formatText,
        highlightSearchTerm,
        filterChunks,
        countRelevantVerbs
    };

    // Supporto per CommonJS/Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = APIUtils;
    }
    
    // Supporto per AMD/RequireJS
    if (typeof define === 'function' && define.amd) {
        define(function() { return APIUtils; });
    }
    
    // Fallback per browser
    global.APIUtils = APIUtils;

})(typeof window !== 'undefined' ? window : this);