// =============================================================
// File: /utils/auth.js
// Scopo: utilità per parsing Basic Auth e validazione credenziali
// =============================================================

/** Restituisce { user, pass } se presente e valido, altrimenti null */
function parseBasicAuth(header) {
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (!/^Basic$/i.test(scheme) || !token) return null;
  const decoded = Buffer.from(token, 'base64').toString('utf8');
  const idx = decoded.indexOf(':');
  if (idx < 0) return null;
  return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
}

function normalizeUserId(u) {
  return String(u || '').trim().toLowerCase();
}

function getUsersList() {
  const raw = process.env.USERS_LIST || '';
  return raw
    .split(',')
    .map((s) => normalizeUserId(s))
    .filter((s, i, arr) => s && arr.indexOf(s) === i);
}

function getPasswordForUser(userId) {
  const key = `PASSWORD_${String(userId).toUpperCase()}`;
  return process.env[key];
}

/**
 * Verifica le credenziali contro le env. Ritorna boolean.
 */
function checkCredentials(user, password) {
  const list = getUsersList();
  const uid = normalizeUserId(user);
  if (!uid || !list.includes(uid)) return false;
  const expected = getPasswordForUser(uid);
  if (!expected) return false;
  return String(password) === String(expected);
}

module.exports = {
  parseBasicAuth,
  normalizeUserId,
  getUsersList,
  getPasswordForUser,
  checkCredentials,
};
