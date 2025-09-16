



// =============================================================
// File: /domains/messages/api.js (hook min.)
// Nota: conferma che l'endpoint pubblico resti tale secondo Master
// =============================================================

const express3 = require('express');
const { requireAuth } = require('../../middleware/requireAuth');

const routerMsg = express3.Router();

// Esempio: lista pubblica (no auth) come da Master
routerMsg.get('/messages', async (req, res) => {
  // TODO: implementare accesso a Mongo
  res.json([]);
});

// Esempio: crea protetto
routerMsg.post('/messages', requireAuth, express3.json(), async (req, res) => {
  // TODO: validazioni secondo schema Message
  const { text, status } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text required' });
  // TODO: inserimento DB con userid = req.session.user
  res.status(201).json({ _id: 'placeholder', text, status: status || 'inserito' });
});

module.exports = routerMsg;

// =============================================================
// File: /routes/mount-domains.js (facoltativo)
// =============================================================

const express4 = require('express');
const messagesApi = require('../domains/messages/api');

function mountDomains(api) {
  api.use(messagesApi); // monta /api/messages*, ecc.
}

module.exports = { mountDomains };

// =============================================================
// NOTE DI TEST (curl) – allineate al Master
// =============================================================
// 1) Stato sessione
// curl -i http://localhost:3000/api/me
//
// 2) Login JSON
// curl -i -H 'Content-Type: application/json' -d '{"user":"alice","password":"secret"}' http://localhost:3000/api/login
//
// 3) Login Basic
// curl -i -u alice:secret http://localhost:3000/api/login
//
// 4) Logout
// curl -i -X POST http://localhost:3000/api/logout
//
// 5) Endpoint protetto
// (usare cookie del browser oppure gestire cookie con curl: -c/-b)
// curl -i -b cookies.txt -c cookies.txt http://localhost:3000/api/private/ping
