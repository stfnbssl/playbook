// config/users.js
function normalizeId(id) {
  return String(id || "").trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");
}

function loadUsersFromEnv(env = process.env) {
  const list = (env.USERS_LIST || "").split(",").map(s => s.trim()).filter(Boolean);
  if (!list.length) throw new Error("USERS_LIST vuota: definire almeno un user_id");
  const seen = new Set();
  const users = {};
  for (const rawId of list) {
    const key = normalizeId(rawId);
    if (seen.has(key)) throw new Error(`Duplicato in USERS_LIST: ${rawId}`);
    seen.add(key);
    const pass = env[`PASSWORD_${key}`];
    if (!pass) throw new Error(`Manca PASSWORD_${key}`);
    users[rawId] = String(pass);
  }
  return users; // mappa: user_id (come in lista) -> password
}

module.exports = { loadUsersFromEnv };
