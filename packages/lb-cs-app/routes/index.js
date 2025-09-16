// routes/index.js
const path = require("path");
const requireAuth = require("../middleware/requireAuth");
const { requireAuth } = require('../middleware/requireAuth');
const authRoutes = require('./auth');  // API
const webRoutes  = require('./web');   // pagine UI
const buildItemsApi = require("../domains/items/api");
const buildMessagesApi = require("../domains/messages/api");

module.exports = function mountRoutes(app, db) {
  // API JSON
  app.use('/api', authRoutes);

  // Auth pubblica
  app.use(webRoutes);

  // --- PAGINE PROTETTE ---
  app.get("/app/items.html", requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "../domains/items/views/items.html"));
  });
  app.get("/app/messages.html", requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "../domains/messages/views/messages.html"));
  });

  // --- API ITEMS (protette) ---
  app.use("/api", requireAuth, buildItemsApi(db));

  // --- API MESSAGES ---
  const messagesApi = buildMessagesApi(db);
  // Lettura pubblica (home visibile a tutti)
  app.use("/api/messages", messagesApi.public);
  // Scrittura/modifiche protette
  app.use("/api/messages", requireAuth, messagesApi.protected);
};


// =============================================================
// File: /routes/index.js (estratto)
// Scopo: mount standard dei router, incluso auth
// =============================================================

const express2 = require('express');
const { sessionMiddleware } = require('../config/session');
const { requireAuth } = require('../middleware/requireAuth');
const authRoutes = require('./auth');  // API
const webRoutes  = require('./web');   // pagine UI


function buildApp() {
  const app = express2();

  // Sessione prima di tutto
  app.use(sessionMiddleware());

  // API JSON
  app.use('/api', authRoutes);

  // Auth pubblica
  api.use(webRoutes);

  // Esempio: rotta protetta generica
  api.get('/private/ping', requireAuth, (req, res) => {
    res.json({ ok: true, user: req.session.user });
  });

  return app;
}

module.exports = { buildApp };

