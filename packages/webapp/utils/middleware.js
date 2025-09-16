/**
 * Middleware personalizzati per il server
 */

/**
 * Middleware per logging delle richieste
 * @param {express.Application} app - Applicazione Express
 */
function setupLoggingMiddleware(app) {
    app.use((req, res, next) => {
        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = req.url;
        const userAgent = req.get('User-Agent') || 'Unknown';
        
        // Log diversi per diversi tipi di richieste
        if (url.startsWith('/api/')) {
            console.log(`🔗 API ${method} ${url} - ${timestamp}`);
        } else if (url.startsWith('/data/')) {
            console.log(`📊 DATA ${method} ${url} - ${timestamp}`);
        } else if (!url.includes('.') && !url.startsWith('/static/')) {
            console.log(`📄 PAGE ${method} ${url} - ${timestamp}`);
        } else if (process.env.LOG_STATIC === 'true') {
            console.log(`📁 STATIC ${method} ${url} - ${timestamp}`);
        }
        
        // Aggiungi timestamp alla richiesta per metriche
        req.startTime = Date.now();
        
        // Log della risposta
        const originalSend = res.send;
        res.send = function(data) {
            const duration = Date.now() - req.startTime;
            if (url.startsWith('/api/') || url.startsWith('/data/')) {
                console.log(`   ✅ ${res.statusCode} in ${duration}ms`);
            }
            return originalSend.call(this, data);
        };
        
        next();
    });
}

/**
 * Middleware per gestire gli errori 404 personalizzati
 * @param {express.Application} app - Applicazione Express
 */
function setup404Handler(app) {
    app.use((req, res, next) => {
        // Se la richiesta è per un file statico che non esiste
        if (!req.url.startsWith('/api/') && 
            !req.url.startsWith('/data/') && 
            !req.url.startsWith('/chunks-viewer') && 
            !req.url.startsWith('/server-info') &&
            !req.url.startsWith('/health')) {
            
            console.log(`❌ 404 - Pagina non trovata: ${req.url}`);
            
            res.status(404).send(generate404Page(req.url));
        } else {
            // Per le API, restituisci JSON
            if (req.url.startsWith('/api/') || req.url.startsWith('/data/')) {
                res.status(404).json({
                    success: false,
                    error: 'Endpoint non trovato',
                    path: req.url,
                    timestamp: new Date().toISOString()
                });
            } else {
                next();
            }
        }
    });
}

/**
 * Middleware per gestire gli errori del server
 * @param {express.Application} app - Applicazione Express
 */
function setupErrorHandler(app) {
    app.use((error, req, res, next) => {
        const timestamp = new Date().toISOString();
        console.error(`💥 Errore server [${timestamp}]:`, error);
        
        // Se è una richiesta API, restituisci JSON
        if (req.url.startsWith('/api/') || req.url.startsWith('/data/')) {
            res.status(500).json({
                success: false,
                error: 'Errore interno del server',
                message: process.env.NODE_ENV === 'development' ? error.message : 'Si è verificato un errore',
                timestamp: timestamp
            });
        } else {
            // Per le pagine web, mostra una pagina di errore
            res.status(500).send(generate500Page(error));
        }
    });
}

/**
 * Middleware per aggiungere headers di sicurezza di base
 * @param {express.Application} app - Applicazione Express
 */
function setupSecurityHeaders(app) {
    app.use((req, res, next) => {
        // Headers di sicurezza di base
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        
        // Solo per ambiente di produzione
        if (process.env.NODE_ENV === 'production') {
            res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }
        
        next();
    });
}

/**
 * Middleware per limitare la dimensione delle richieste
 * @param {express.Application} app - Applicazione Express
 */
function setupRequestLimits(app) {
    const express = require('express');
    
    // Limiti per JSON e URL encoded
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
}

/**
 * Middleware per aggiungere CORS se necessario
 * @param {express.Application} app - Applicazione Express
 */
function setupCORS(app) {
    app.use((req, res, next) => {
        // Configurazione CORS di base (personalizza secondo le tue necessità)
        const allowedOrigins = process.env.ALLOWED_ORIGINS 
            ? process.env.ALLOWED_ORIGINS.split(',')
            : ['http://localhost:3005', 'http://127.0.0.1:3005'];
            
        const origin = req.headers.origin;
        
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            res.setHeader('Access-Control-Allow-Origin', origin || '*');
        }
        
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 ore
        
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
            return;
        }
        
        next();
    });
}

/**
 * Genera la pagina HTML per errore 404
 * @param {string} requestedUrl - URL richiesto
 * @returns {string} HTML della pagina 404
 */
function generate404Page(requestedUrl) {
    return `
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Pagina non trovata</title>
            <link rel="stylesheet" href="/styles.css">
            <style>
                .error-container {
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 40px;
                    background: linear-gradient(135deg, #ff6b6b, #feca57);
                    color: white;
                    text-align: center;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .error-code {
                    font-size: 6rem;
                    font-weight: bold;
                    margin-bottom: 20px;
                    text-shadow: 0 4px 8px rgba(0,0,0,0.3);
                }
                .back-links {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-top: 30px;
                }
                .back-link {
                    display: inline-block;
                    padding: 12px 24px;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }
                .back-link:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }
            </style>
        </head>
        <body>
            <div class="error-container">
                <div class="error-code">404</div>
                <h1>Pagina non trovata</h1>
                <p>La pagina richiesta <code>${requestedUrl}</code> non esiste.</p>
                <p>Verifica che il file sia presente nella cartella <code>public/</code> o che l'endpoint sia corretto.</p>
                
                <div class="back-links">
                    <a href="/" class="back-link">🏠 Home</a>
                    <a href="/chunks-viewer" class="back-link">📊 Chunks Viewer</a>
                    <a href="/server-info" class="back-link">🔧 Server Info</a>
                </div>
            </div>
        </body>
        </html>
    `;
}

/**
 * Genera la pagina HTML per errore 500
 * @param {Error} error - Oggetto errore
 * @returns {string} HTML della pagina 500
 */
function generate500Page(error) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return `
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>500 - Errore del Server</title>
            <link rel="stylesheet" href="/styles.css">
            <style>
                .error-container {
                    max-width: 700px;
                    margin: 50px auto;
                    padding: 40px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    text-align: center;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .error-code {
                    font-size: 6rem;
                    font-weight: bold;
                    margin-bottom: 20px;
                    text-shadow: 0 4px 8px rgba(0,0,0,0.3);
                }
                .error-details {
                    background: rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    text-align: left;
                    font-family: monospace;
                    font-size: 0.9em;
                    max-height: 200px;
                    overflow-y: auto;
                }
            </style>
        </head>
        <body>
            <div class="error-container">
                <div class="error-code">500</div>
                <h1>Errore Interno del Server</h1>
                <p>Si è verificato un errore durante l'elaborazione della richiesta.</p>
                
                ${isDevelopment && error ? `
                    <div class="error-details">
                        <strong>Errore:</strong> ${error.message}<br>
                        <strong>Stack:</strong><br>
                        ${error.stack ? error.stack.replace(/\n/g, '<br>') : 'Non disponibile'}
                    </div>
                ` : ''}
                
                <div class="back-links">
                    <a href="/" class="back-link">🏠 Torna alla Home</a>
                    <a href="/server-info" class="back-link">🔧 Info Server</a>
                </div>
            </div>
        </body>
        </html>
    `;
}

module.exports = {
    setupLoggingMiddleware,
    setup404Handler,
    setupErrorHandler,
    setupSecurityHeaders,
    setupRequestLimits,
    setupCORS
};