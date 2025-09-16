const express = require('express');
const path = require('path');

// Import dei moduli personalizzati
const { setupStaticMiddleware, ensurePublicFolder } = require('./utils/static-handler');
const { setupLoggingMiddleware, setup404Handler } = require('./utils/middleware');
const chunksRoutes = require('./routes/chunks');
const ingestionRoutes = require('./routes/ingestion');
const staticRoutes = require('./routes/static');
const serverInfoRoutes = require('./routes/server-info');

const app = express();
const PORT = process.env.PORT || 3005;

// Configurazione base
app.use(express.json());

// Setup dei middleware e file statici
setupStaticMiddleware(app, __dirname);
setupLoggingMiddleware(app);

// Registrazione delle routes
app.use('/', ingestionRoutes);
app.use('/', chunksRoutes);
app.use('/', staticRoutes);
app.use('/', serverInfoRoutes);

// Setup del gestore 404
setup404Handler(app);

// Inizializzazione del server
app.listen(PORT, () => {
    console.log(`🚀 Server in esecuzione su http://localhost:${PORT}`);
    console.log(`📂 Cartella file statici: ${path.join(__dirname, 'public')}`);
    
    // Verifica/crea cartella public
    ensurePublicFolder(__dirname);
    
    console.log('\n📋 Endpoints disponibili:');
    console.log('   🌐 http://localhost:' + PORT + '/ (Home con pagine statiche)');
    console.log('   📊 http://localhost:' + PORT + '/chunks-viewer (Viewer chunks)');
    console.log('   ℹ️  http://localhost:' + PORT + '/about.html (About page)');
    console.log('   🔧 http://localhost:' + PORT + '/server-info (Info server)');
    console.log('   📡 http://localhost:' + PORT + '/api/chunks-files (API chunks)');
    console.log('   📄 http://localhost:' + PORT + '/api/static-files (API file statici)');
    console.log('   📄 http://localhost:' + PORT + '/data/ingestion (API ingestion)');
});