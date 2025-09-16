// =============================================================
// File: /config/session.js
// Scopo: middleware di sessione (cookie-session) conforme al Master
// =============================================================

const cookieSession = require('cookie-session');

/**
 * @returns {import('express').RequestHandler}
 */
function sessionMiddleware() {
  const name = 'lbcs.sid';
  const maxAgeDays = Number(process.env.SESSION_MAX_AGE_DAYS || 7);
  const keys = [process.env.SESSION_SECRET || 'dev-secret'];
  const prod = process.env.NODE_ENV === 'production';

  return cookieSession({
    name,
    keys,
    maxAge: maxAgeDays * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: prod,
    path: '/',
  });
}

module.exports = { sessionMiddleware };
