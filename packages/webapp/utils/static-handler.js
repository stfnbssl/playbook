const express = require('express');
const fs = require('fs');
const path = require('path');

/**
 * Configura il middleware per i file statici
 * @param {express.Application} app - Applicazione Express
 * @param {string} baseDir - Directory base del progetto
 */
function setupStaticMiddleware(app, baseDir) {
    const publicDir = path.join(baseDir, 'public');
    
    // Middleware per servire file statici dalla cartella public
    app.use(express.static(publicDir, {
        maxAge: '1d', // Cache per 1 giorno
        etag: true,   // Abilita ETag per il caching
        dotfiles: 'ignore', // Ignora file nascosti
        index: ['index.html', 'index.htm'], // File di default
        setHeaders: (res, filePath) => {
            // Headers personalizzati per diversi tipi di file
            const ext = path.extname(filePath).toLowerCase();
            
            if (ext === '.html') {
                res.setHeader('Cache-Control', 'no-cache'); // HTML sempre fresco
            } else if (['.css', '.js'].includes(ext)) {
                res.setHeader('Cache-Control', 'public, max-age=86400'); // CSS/JS cache 1 giorno
            } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
                res.setHeader('Cache-Control', 'public, max-age=604800'); // Immagini cache 1 settimana
            }
        }
    }));
    
    console.log(`📂 Middleware file statici configurato per: ${publicDir}`);
}

/**
 * Verifica e crea la cartella public se non esiste
 * @param {string} baseDir - Directory base del progetto
 */
function ensurePublicFolder(baseDir) {
    const publicDir = path.join(baseDir, 'public');
    
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
        console.log('📁 Cartella public creata:', publicDir);
        
        // Crea i file di esempio
        createSampleFiles(publicDir);
    } else {
        console.log('📁 Cartella public già esistente:', publicDir);
    }
}

/**
 * Crea file HTML di esempio nella cartella public
 * @param {string} publicDir - Path della cartella public
 */
function createSampleFiles(publicDir) {
    // Configura la cartella base (può essere passata come variabile d'ambiente)
    const BASE_DIR = process.env.CHUNKS_BASE_DIR || 'C:\\My\\wizzi\\stfnbssl\\cybersecurity\\packages\\ingestion-norme\\extraction';
    
    // Crea index.html
    const indexContent = generateIndexHTML(BASE_DIR);
    fs.writeFileSync(path.join(publicDir, 'index.html'), indexContent);
    
    // Crea about.html
    const aboutContent = generateAboutHTML();
    fs.writeFileSync(path.join(publicDir, 'about.html'), aboutContent);
    
    // Crea un file CSS di base
    const cssContent = generateBaseCSS();
    fs.writeFileSync(path.join(publicDir, 'styles.css'), cssContent);
    
    console.log('📄 File di esempio creati in public/');
}

/**
 * Genera il contenuto HTML per la pagina index
 * @param {string} baseDir - Directory base chunks
 * @returns {string} Contenuto HTML
 */
function generateIndexHTML(baseDir) {
    return `<!DOCTYPE html>
<html lang="it">
<head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Chunks Viewer - Home</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        <nav class="nav">
            <a href="/">🏠 Home</a>
            <a href="/chunks-viewer">📊 Chunks Viewer</a>
            <a href="/about.html">ℹ️ About</a>
            <a href="/server-info">🔧 Server Info</a>
        </nav>
        
        <header class="hero">
            <h1>🌟 JSON Chunks Viewer</h1>
            <p>Sistema di visualizzazione e analisi per file chunks.json di norme cybersecurity</p>
        </header>
        
        <main>
            <section class="card">
                <h3>📂 Funzionalità Principali</h3>
                <ul>
                    <li><strong>Scansione Automatica:</strong> Trova tutti i file chunks.json nella directory configurata</li>
                    <li><strong>Visualizzazione Interattiva:</strong> Interfaccia web per esplorare i chunks</li>
                    <li><strong>API REST:</strong> Accesso programmatico ai dati</li>
                    <li><strong>Cache Intelligente:</strong> Ottimizzazioni per prestazioni migliori</li>
                </ul>
            </section>
            
            <section class="card">
                <h3>🔗 Link Rapidi</h3>
                <div class="link-grid">
                    <a href="/chunks-viewer" class="link-card">
                        <h4>📊 Visualizzatore Chunks</h4>
                        <p>Interfaccia principale per esplorare i dati</p>
                    </a>
                    <a href="/api/chunks-files" class="link-card">
                        <h4>📡 API Chunks</h4>
                        <p>Lista di tutti i file chunks disponibili</p>
                    </a>
                    <a href="/data/ingestion" class="link-card">
                        <h4>📄 Dati Ingestion</h4>
                        <p>Informazioni sul processo di ingestion</p>
                    </a>
                </div>
            </section>
            
            <section class="card info-card">
                <h3>📁 Directory Scansionata</h3>
                <code>${baseDir}</code>
                <p><small>Configurabile tramite variabile d'ambiente CHUNKS_BASE_DIR</small></p>
            </section>
        </main>
        
        <footer>
            <p>© 2025 JSON Chunks Viewer - Sistema di analisi norme cybersecurity</p>
        </footer>
    </div>
</body>
</html>`;
}

/**
 * Genera il contenuto HTML per la pagina about
 * @returns {string} Contenuto HTML
 */
function generateAboutHTML() {
    return `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About - JSON Chunks Viewer</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        <nav class="nav">
            <a href="/">🏠 Home</a>
            <a href="/chunks-viewer">📊 Chunks Viewer</a>
            <a href="/about.html">ℹ️ About</a>
            <a href="/server-info">🔧 Server Info</a>
        </nav>
        
        <header>
            <h1>ℹ️ About JSON Chunks Viewer</h1>
        </header>
        
        <main>
            <section class="card">
                <h3>🎯 Scopo dell'Applicazione</h3>
                <p>Questo strumento è stato sviluppato per visualizzare e analizzare i file chunks.json 
                generati dal processo di ingestion delle norme di cybersecurity. Facilita l'esplorazione 
                dei dati strutturati e offre un'interfaccia intuitiva per la ricerca e l'analisi.</p>
            </section>
            
            <section class="card">
                <h3>⚙️ Funzionalità</h3>
                <ul>
                    <li><strong>Scansione Ricorsiva:</strong> Trova automaticamente tutti i file chunks.json</li>
                    <li><strong>Visualizzazione Interattiva:</strong> Interfaccia web responsive e moderna</li>
                    <li><strong>API REST Complete:</strong> Accesso programmatico a tutti i dati</li>
                    <li><strong>Sistema di Cache:</strong> Ottimizzazioni per prestazioni elevate</li>
                    <li><strong>Filtri Avanzati:</strong> Ricerca testuale e filtri per relevant verbs</li>
                    <li><strong>File Statici:</strong> Supporto completo per contenuti web statici</li>
                </ul>
            </section>
            
            <section class="card">
                <h3>🛠️ Architettura Tecnica</h3>
                <div class="tech-grid">
                    <div class="tech-item">
                        <h4>Backend</h4>
                        <ul>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>File System nativo</li>
                        </ul>
                    </div>
                    <div class="tech-item">
                        <h4>Frontend</h4>
                        <ul>
                            <li>HTML5 / CSS3</li>
                            <li>JavaScript ES6+</li>
                            <li>React (per il viewer)</li>
                        </ul>
                    </div>
                    <div class="tech-item">
                        <h4>Struttura</h4>
                        <ul>
                            <li>Architettura modulare</li>
                            <li>Separazione delle responsabilità</li>
                            <li>Pattern CommonJS</li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <section class="card">
                <h3>📊 API Endpoints</h3>
                <div class="api-list">
                    <div class="api-item">
                        <code>GET /api/chunks-files</code>
                        <p>Restituisce la lista di tutti i file chunks.json trovati</p>
                    </div>
                    <div class="api-item">
                        <code>GET /api/chunks-content?path=[path]</code>
                        <p>Restituisce il contenuto di un file chunks specifico</p>
                    </div>
                    <div class="api-item">
                        <code>GET /api/static-files</code>
                        <p>Lista dei file statici disponibili nella cartella public</p>
                    </div>
                    <div class="api-item">
                        <code>GET /data/ingestion</code>
                        <p>Dati del file ingestion.json con cache intelligente</p>
                    </div>
                    <div class="api-item">
                        <code>GET /server-info</code>
                        <p>Informazioni complete sul server e configurazione</p>
                    </div>
                </div>
            </section>
            
            <section class="card">
                <h3>🔧 Configurazione</h3>
                <table class="config-table">
                    <tr>
                        <th>Variabile</th>
                        <th>Descrizione</th>
                        <th>Default</th>
                    </tr>
                    <tr>
                        <td><code>PORT</code></td>
                        <td>Porta del server</td>
                        <td>3005</td>
                    </tr>
                    <tr>
                        <td><code>CHUNKS_BASE_DIR</code></td>
                        <td>Directory base per la scansione chunks</td>
                        <td>C:\\My\\wizzi\\stfnbssl\\cybersecurity\\packages\\ingestion-norme\\extraction</td>
                    </tr>
                    <tr>
                        <td><code>NODE_ENV</code></td>
                        <td>Ambiente di esecuzione</td>
                        <td>development</td>
                    </tr>
                </table>
            </section>
        </main>
        
        <footer>
            <p><a href="/">← Torna alla home</a></p>
            <p>© 2025 JSON Chunks Viewer</p>
        </footer>
    </div>
</body>
</html>`;
}

/**
 * Genera il contenuto CSS di base
 * @returns {string} Contenuto CSS
 */
function generateBaseCSS() {
    return `/* Base Styles per JSON Chunks Viewer */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    margin-top: 20px;
    margin-bottom: 20px;
}

/* Navigation */
.nav {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 15px 20px;
    margin: -20px -20px 30px -20px;
    border-radius: 12px 12px 0 0;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.nav a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.nav a:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

/* Hero Section */
.hero {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px 0;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border-radius: 8px;
    margin-top: -10px;
}

.hero h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero p {
    font-size: 1.2rem;
    opacity: 0.9;
}

/* Cards */
.card {
    background: #f8f9fa;
    padding: 25px;
    margin: 20px 0;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.info-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-left: 4px solid #4dabf7;
}

.info-card code {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', monospace;
}

/* Grid Layouts */
.link-grid, .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.link-card, .tech-item {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 2px solid #e9ecef;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
}

.link-card:hover {
    border-color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
}

.link-card h4 {
    color: #667eea;
    margin-bottom: 10px;
}

/* API Documentation */
.api-list {
    display: grid;
    gap: 15px;
    margin-top: 20px;
}

.api-item {
    background: white;
    padding: 15px;
    border-radius: 6px;
    border-left: 3px solid #28a745;
}

.api-item code {
    background: #e9ecef;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    color: #495057;
}

/* Configuration Table */
.config-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
}

.config-table th,
.config-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
}

.config-table th {
    background: #667eea;
    color: white;
    font-weight: 600;
}

.config-table tr:hover {
    background: #f8f9fa;
}

.config-table code {
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.9em;
}

/* Lists */
ul {
    padding-left: 20px;
}

ul li {
    margin-bottom: 8px;
}

/* Footer */
footer {
    text-align: center;
    padding: 30px 0;
    border-top: 1px solid #e9ecef;
    margin-top: 40px;
    color: #6c757d;
}

footer a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
}

footer a:hover {
    text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        margin: 10px;
        padding: 15px;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
    
    .hero p {
        font-size: 1rem;
    }
    
    .nav {
        margin: -15px -15px 20px -15px;
        padding: 12px 15px;
    }
    
    .link-grid, .tech-grid {
        grid-template-columns: 1fr;
    }
    
    .config-table {
        font-size: 0.9em;
    }
    
    .config-table th,
    .config-table td {
        padding: 8px 10px;
    }
}

/* Code blocks */
code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    background: #f1f3f4;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.9em;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 10px 20px;
    background: #667eea;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn:hover {
    background: #764ba2;
    transform: translateY(-1px);
}

/* Utility classes */
.text-center { text-align: center; }
.text-muted { color: #6c757d; }
.mt-20 { margin-top: 20px; }
.mb-20 { margin-bottom: 20px; }`;
}

module.exports = {
    setupStaticMiddleware,
    ensurePublicFolder,
    createSampleFiles,
    generateIndexHTML,
    generateAboutHTML,
    generateBaseCSS
};