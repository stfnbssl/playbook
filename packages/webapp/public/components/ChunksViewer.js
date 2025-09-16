/**
 * Chunks Viewer React Component
 * Componente principale per la visualizzazione dei chunks
 */

(function(global) {
    'use strict';

    const { useState, useEffect, useMemo } = React;

    function ChunksViewer({ onChunkSelect }) {
        // Stati del componente
        const [files, setFiles] = useState([]);
        const [selectedFile, setSelectedFile] = useState('');
        const [chunks, setChunks] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [showOnlyRelevantVerb, setShowOnlyRelevantVerb] = useState(false);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
        const [loadingFiles, setLoadingFiles] = useState(true);
        const [selectedChunkIndex, setSelectedChunkIndex] = useState(null);

        // Filtra i chunks usando le utility
        const filteredChunks = useMemo(() => {
            return window.APIUtils.filterChunks(chunks, {
                searchTerm,
                showOnlyRelevantVerb
            });
        }, [chunks, searchTerm, showOnlyRelevantVerb]);

        // Conta i chunks con isRelevantVerb = true
        const relevantVerbCount = useMemo(() => {
            return window.APIUtils.countRelevantVerbs(chunks);
        }, [chunks]);

        // Reset selezione quando cambiano i filtri
        useEffect(() => {
            setSelectedChunkIndex(null);
        }, [searchTerm, showOnlyRelevantVerb, selectedFile]);

        // Carica la lista dei file all'avvio
        useEffect(() => {
            loadChunkFilesList();
        }, []);

        /**
         * Carica la lista dei file disponibili
         */
        const loadChunkFilesList = async () => {
            setLoadingFiles(true);
            setError('');
            
            try {
                const result = await window.APIUtils.loadChunkFilesList();
                
                if (result.success) {
                    setFiles(result.data);
                    if (result.data.length > 0) {
                        setSelectedFile(result.data[0].outputWebappJSONPath);
                        loadChunks(result.data[0].outputWebappJSONPath);
                    }
                } else {
                    setError('Errore nel caricare la lista dei file: ' + result.error);
                }
            } catch (err) {
                setError('Errore imprevisto: ' + err.message);
            }
            
            setLoadingFiles(false);
        };

        /**
         * Carica i chunks di un file specifico
         * @param {string} filePath - Path del file da caricare
         */
        const loadChunks = async (filePath) => {
            if (!filePath) return;
            
            setLoading(true);
            setError('');
            setChunks([]);
            setSelectedChunkIndex(null);
            
            try {
                const result = await window.APIUtils.loadJSONFile(filePath);
                setChunks(result.chunks || []);
                /*
                if (result.success) {
                    const chunksData = result.content.chunks || [];
                    setChunks(chunksData);
                } else {
                    setError('Errore nel caricare il contenuto: ' + result.error);
                }
                */
            } catch (err) {
                setError('Errore nel parsare i dati: ' + err.message);
            }
            
            setLoading(false);
        };

        /**
         * Handler per il click su un chunk
         * @param {Object} chunk - Il chunk selezionato
         * @param {number} index - L'indice del chunk nella lista filtrata
         */
        const handleChunkClick = (chunk, index) => {
            setSelectedChunkIndex(index);
            
            // Chiama il callback se fornito
            if (onChunkSelect && typeof onChunkSelect === 'function') {
                onChunkSelect(chunk, index);
            }
        };

        /**
         * Handler per il cambio di file selezionato
         */
        const handleFileChange = (event) => {
            const newFile = event.target.value;
            setSelectedFile(newFile);
            setSearchTerm(''); // Reset search when changing file
            setShowOnlyRelevantVerb(false); // Reset filter when changing file
            if (newFile) {
                loadChunks(newFile);
            }
        };

        /**
         * Handler per il cambio del termine di ricerca
         */
        const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
        };

        /**
         * Handler per il filtro relevant verb
         */
        const handleRelevantVerbFilterChange = (event) => {
            setShowOnlyRelevantVerb(event.target.checked);
        };

        /**
         * Pulisce il campo di ricerca
         */
        const clearSearch = () => {
            setSearchTerm('');
        };

        /**
         * Ottiene il nome del file selezionato
         */
        const getSelectedFileName = () => {
            const file = files.find(f => f.outputWebappJSONPath === selectedFile);
            return file ? file.relativePath : '';
        };

        /**
         * Rinfresca il contenuto del file corrente
         */
        const refreshCurrentFile = () => {
            if (selectedFile) {
                loadChunks(selectedFile);
            }
        };

        // Rendering del componente - Loading files
        if (loadingFiles) {
            return React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'header' },
                    React.createElement('h1', null, 'Chunks Viewer')
                ),
                React.createElement('div', { className: 'loading' },
                    '⏳ Caricamento lista file...'
                )
            );
        }

        // Rendering del componente principale
        return React.createElement('div', { className: 'container' },
            // Header
            React.createElement('div', { className: 'header' },
                React.createElement('h1', null, '📄 Chunks Viewer'),
                React.createElement('p', null, 'Visualizza i contenuti dei file chunks.json')
            ),

            // Controls
            React.createElement('div', { className: 'controls' },
                // File selector
                React.createElement('div', { className: 'file-selector' },
                    React.createElement('label', { htmlFor: 'fileSelect' },
                        React.createElement('strong', null, 'Seleziona file:')
                    ),
                    React.createElement('select', {
                        id: 'fileSelect',
                        value: selectedFile,
                        onChange: handleFileChange
                    },
                        React.createElement('option', { value: '' }, '-- Seleziona un file --'),
                        files.map((file, index) =>
                            React.createElement('option', {
                                key: index,
                                value: file.outputWebappJSONPath
                            }, `${file.lbId}`)
                        )
                    )
                ),

                // Search box
                selectedFile && React.createElement('div', { className: 'search-box' },
                    React.createElement('label', { htmlFor: 'searchInput' },
                        React.createElement('strong', null, '🔍 Cerca:')
                    ),
                    React.createElement('input', {
                        id: 'searchInput',
                        type: 'text',
                        placeholder: 'Cerca in section_path o text_normative...',
                        value: searchTerm,
                        onChange: handleSearchChange
                    }),
                    searchTerm && React.createElement('button', {
                        onClick: clearSearch,
                        style: {
                            position: 'absolute',
                            right: '30px',
                            marginTop: '-35px',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '16px',
                            cursor: 'pointer',
                            color: '#666'
                        },
                        title: 'Cancella ricerca'
                    }, '✕')
                ),

                // Filter controls
                selectedFile && React.createElement('div', { className: 'filter-controls' },
                    React.createElement('label', null,
                        React.createElement('input', {
                            type: 'checkbox',
                            checked: showOnlyRelevantVerb,
                            onChange: handleRelevantVerbFilterChange
                        }),
                        '🎯 Mostra solo Relevant Verbs'
                    ),
                    React.createElement('span', {
                        style: { color: '#666', fontSize: '13px' }
                    }, `(${relevantVerbCount} di ${chunks.length} chunks)`)
                ),

                // Stats
                selectedFile && React.createElement('div', { className: 'stats' },
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('strong', null, 'File:'), ' ', getSelectedFileName()
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('strong', null, 'Totale chunks:'), ' ', chunks.length
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('strong', null, 'Relevant Verbs:'), ' ', relevantVerbCount
                    ),
                    (searchTerm || showOnlyRelevantVerb) && React.createElement('div', { className: 'stat-item' },
                        React.createElement('strong', null, 'Filtrati:'), ' ', filteredChunks.length
                    ),
                    selectedChunkIndex !== null && React.createElement('div', { className: 'stat-item' },
                        React.createElement('strong', null, 'Selezionato:'), ' #', selectedChunkIndex + 1
                    ),
                    React.createElement('button', {
                        className: 'refresh-btn',
                        onClick: refreshCurrentFile,
                        disabled: loading
                    }, '🔄 Ricarica')
                )
            ),

            // Error display
            error && React.createElement('div', { className: 'error' },
                '⚠ ', error
            ),

            // Content area
            loading ? React.createElement('div', { className: 'loading' },
                '⏳ Caricamento contenuto...'
            ) : filteredChunks.length === 0 && searchTerm ? React.createElement('div', { className: 'empty-state' },
                React.createElement('h3', null, '🔍 Nessun risultato'),
                React.createElement('p', null, 'Nessun chunk contiene il termine "', 
                    React.createElement('strong', null, searchTerm), '"'
                ),
                React.createElement('button', {
                    onClick: clearSearch,
                    style: {
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }
                }, '✕ Cancella ricerca')
            ) : filteredChunks.length === 0 ? React.createElement('div', { className: 'empty-state' },
                selectedFile ? React.createElement(React.Fragment, null,
                    React.createElement('h3', null, '🔭 Nessun chunk trovato'),
                    React.createElement('p', null, 'Il file selezionato non contiene chunks o la struttura è diversa')
                ) : React.createElement(React.Fragment, null,
                    React.createElement('h3', null, '👆 Seleziona un file'),
                    React.createElement('p', null, 'Scegli un file dall\'elenco per visualizzarne i chunks')
                )
            ) : React.createElement('div', { className: 'chunks-list' },
                filteredChunks.map((chunk, index) => {
                    const isRelevantVerb = chunk.context && chunk.context.isRelevantVerb === true;
                    const isSelected = selectedChunkIndex === index;
                    
                    return React.createElement('div', {
                        key: index,
                        className: `chunk-item ${isRelevantVerb ? 'relevant-verb' : ''} ${isSelected ? 'selected' : ''}`,
                        onClick: () => handleChunkClick(chunk, index),
                        style: { cursor: 'pointer' }
                    },
                        React.createElement('div', { className: 'section-path' },
                            chunk.section_path || 'N/A'
                        ),
                        React.createElement('div', { className: 'text-normative' },
                            window.APIUtils.formatText(chunk.text_normative) || 'Nessun testo normativo'
                        )
                    );
                })
            )
        );
    }

    // Esporta il componente nel namespace globale
    const ChunksViewerModule = {
        ChunksViewer
    };

    // Supporto per CommonJS/Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ChunksViewerModule;
    }
    
    // Supporto per AMD/RequireJS
    if (typeof define === 'function' && define.amd) {
        define(function() { return ChunksViewerModule; });
    }
    
    // Fallback per browser
    global.ChunksViewerModule = ChunksViewerModule;

})(typeof window !== 'undefined' ? window : this);