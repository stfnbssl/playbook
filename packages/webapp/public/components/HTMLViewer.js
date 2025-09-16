// components/HTMLViewer.js
const { useState, useEffect, useRef } = React;

const HTMLViewer = ({
    baseUrl = '',
    anchor = null,
    onArticleChange,
    title = "📖 Documento HTML",
    refreshButton = true
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [iframeKey, setIframeKey] = useState(0); // Per forzare reload iframe
    const [status, setStatus] = useState('idle'); // idle, loading, loaded, error
    const iframeRef = useRef(null);
    const loadingTimeoutRef = useRef(null);

    const styles = {
        panel: {
            flex: 1,
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            minWidth: 0
        },
        panelHeader: {
            background: '#34495e',
            color: 'white',
            padding: '12px 20px',
            fontWeight: '600',
            fontSize: '14px',
            borderBottom: '1px solid #2c3e50',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        panelContent: {
            flex: 1,
            overflow: 'auto',
            position: 'relative'
        },
        htmlContainer: {
            width: '100%',
            height: '100%',
            position: 'relative',
            background: '#f8f9fa'
        },
        htmlFrame: {
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'white',
            display: 'block'
        },
        noContent: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#7f8c8d',
            textAlign: 'center',
            padding: '40px'
        },
        loadingOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '16px',
            color: '#34495e',
            zIndex: 50
        },
        refreshButton: {
            background: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.3s ease'
        },
        refreshButtonHover: {
            background: '#219a52',
            transform: 'translateY(-1px)'
        },
        currentUrl: {
            fontSize: '12px',
            color: '#ecf0f1',
            marginLeft: '10px',
            maxWidth: '400px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        statusIndicator: {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            marginRight: '8px'
        },
        statusLoading: {
            background: '#f39c12',
            animation: 'pulse 1.5s infinite'
        },
        statusLoaded: {
            background: '#27ae60'
        },
        statusError: {
            background: '#e74c3c'
        }
    };

    // Gestisce il caricamento dell'iframe
    const handleFrameLoad = () => {
        console.log('🎯 handleFrameLoad chiamato');
        
        // Clear timeout di fallback
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
            loadingTimeoutRef.current = null;
        }

        setIsLoading(false);
        setStatus('loaded');
        console.log('✅ HTML documento caricato con successo');

        // Opzionale: scroll all'anchor se presente
        if (anchor && iframeRef.current) {
            try {
                // Attendiamo un po' per assicurarci che il contenuto sia renderizzato
                setTimeout(() => {
                    if (iframeRef.current && iframeRef.current.contentWindow) {
                        const anchorElement = iframeRef.current.contentWindow.document.querySelector(anchor);
                        if (anchorElement) {
                            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            console.log('📍 Scrolled to anchor:', anchor);
                        }
                    }
                }, 500);
            } catch (e) {
                console.warn('⚠️ Non è possibile fare scroll all\'anchor (probabilmente CORS):', e.message);
            }
        }
    };

    // Timeout di fallback per il caricamento
    const startLoadingTimeout = () => {
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }
        
        // Se dopo 10 secondi non si è caricato, considera it loaded
        loadingTimeoutRef.current = setTimeout(() => {
            console.log('⏰ Timeout raggiunto, assumo che sia caricato');
            setIsLoading(false);
            setStatus('loaded');
        }, 10000);
    };

    const refreshIframe = () => {
        console.log('🔄 Ricaricando iframe...');
        setIframeKey(prev => prev + 1);
        setIsLoading(true);
        setStatus('loading');
        startLoadingTimeout();
    };

    const handleRefreshClick = (e) => {
        e.preventDefault();
        refreshIframe();
    };

    const handleRefreshMouseEnter = (e) => {
        e.target.style.background = styles.refreshButtonHover.background;
        e.target.style.transform = styles.refreshButtonHover.transform;
    };

    const handleRefreshMouseLeave = (e) => {
        e.target.style.background = styles.refreshButton.background;
        e.target.style.transform = 'none';
    };

    // Effect per gestire i cambiamenti di anchor e baseUrl
    useEffect(() => {
        console.log('🔄 Effect triggered - baseUrl:', baseUrl, 'anchor:', anchor);
        
        if (anchor !== null && baseUrl) {
            console.log('🚀 Iniziando caricamento...');
            setIsLoading(true);
            setStatus('loading');
            startLoadingTimeout();
        } else {
            setIsLoading(false);
            setStatus('idle');
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
                loadingTimeoutRef.current = null;
            }
        }
    }, [anchor, baseUrl]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, []);

    const getHTMLUrl = () => {
        if (!baseUrl || anchor === null) return '';
        // Aggiungi cache busting
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}t=${new Date().getTime()}${anchor}`;
    };

    const getCurrentUrlDisplay = () => {
        if (!baseUrl) return 'Nessun URL impostato';
        if (anchor === null) return 'Seleziona un articolo';
        return `${baseUrl}${anchor}`;
    };

    const getStatusIndicatorStyle = () => {
        switch (status) {
            case 'loading': return { ...styles.statusIndicator, ...styles.statusLoading };
            case 'loaded': return { ...styles.statusIndicator, ...styles.statusLoaded };
            case 'error': return { ...styles.statusIndicator, ...styles.statusError };
            default: return { ...styles.statusIndicator, background: '#95a5a6' };
        }
    };

    const currentUrl = getHTMLUrl();

    return (
        <div style={styles.panel}>
            <div style={styles.panelHeader}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={getStatusIndicatorStyle()}></div>
                    {title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={styles.currentUrl}>
                        {getCurrentUrlDisplay()}
                    </span>
                    {refreshButton && (
                        <button
                            style={styles.refreshButton}
                            onClick={handleRefreshClick}
                            onMouseEnter={handleRefreshMouseEnter}
                            onMouseLeave={handleRefreshMouseLeave}
                            title="Ricarica documento HTML"
                        >
                            🔄 Ricarica
                        </button>
                    )}
                </div>
            </div>
            
            <div style={styles.panelContent}>
                {!baseUrl || anchor === null ? (
                    <div style={styles.noContent}>
                        <h3>📄 Pronto per caricare</h3>
                        {!baseUrl ? (
                            <>
                                <p>Imposta l'URL del documento HTML nell'input sopra.</p>
                                <p><em>Esempio: https://example.com/documento.html</em></p>
                            </>
                        ) : (
                            <>
                                <p>👈 Seleziona un articolo dalla lista a sinistra.</p>
                                <p><em>Il documento si posizionerà automaticamente sull'articolo selezionato.</em></p>
                            </>
                        )}
                    </div>
                ) : (
                    <div style={styles.htmlContainer}>
                        {isLoading && (
                            <div style={styles.loadingOverlay}>
                                ⏳ Caricamento documento HTML...
                            </div>
                        )}
                        <iframe
                            ref={iframeRef}
                            key={iframeKey}
                            style={styles.htmlFrame}
                            src={currentUrl}
                            title="Documento HTML"
                            onLoad={handleFrameLoad}
                            // Rimosso sandbox che poteva causare problemi
                            // Rimosso onError che non funziona bene con iframe
                        />
                        {/* Debug info - rimuovi o commenta questa sezione in produzione */}
                        {/* 
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '10px',
                            background: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '5px 10px',
                            fontSize: '11px',
                            borderRadius: '3px'
                        }}>
                            Status: {status} | URL: {currentUrl ? '✓' : '✗'}
                        </div>
                        */}
                    </div>
                )}
            </div>
        </div>
    );
};

// Rende i componenti disponibili globalmente
window.HTMLViewer = HTMLViewer;