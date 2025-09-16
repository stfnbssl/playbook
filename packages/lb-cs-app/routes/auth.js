// =============================================================
// File: /routes/auth.js
// Scopo: implementa le rotte: POST /api/login, POST /api/logout, GET /api/me
// Allineato a: Standard API → Autenticazione (Master v1.0)
// =============================================================
const express = require('express');
const router = express.Router();
const { parseBasicAuth, checkCredentials, normalizeUserId } = require('../utils/auth');

// Helper uniforme per errori 400 secondo Master
function badRequest(res, reason) {
  return res.status(400).json({ error: reason });
}

// POST /api/login
// Accetta: JSON { user, password } OPPURE Authorization: Basic ...
router.post('/login', express.json(), (req, res) => {
  let user, password;

  // 1) JSON body
  if (req.is('application/json')) {
    user = req.body && req.body.user;
    password = req.body && req.body.password;
  }

  // 2) Basic Auth header (se presente, ha priorità su JSON se completo)
  const basic = parseBasicAuth(req.headers['authorization']);
  if (basic && basic.user && basic.pass) {
    user = basic.user;
    password = basic.pass;
  }

  if (!user || !password) {
    return badRequest(res, 'no fields'); // conforme a Master
  }

  if (!checkCredentials(user, password)) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  // OK → imposta sessione
  req.session.user = normalizeUserId(user);
  return res.json({ user: req.session.user });
});

// POST /api/logout → invalida la sessione
router.post('/logout', (req, res) => {
  req.session = null;
  return res.status(204).end();
});

// Stato sessione (JSON)
router.get('/api/me', (req, res) => {
  if (req.session && req.session.userId) return res.json({ userId: req.session.userId });
  return res.status(401).json({ error: 'unauthenticated' });
});

module.exports = router;
