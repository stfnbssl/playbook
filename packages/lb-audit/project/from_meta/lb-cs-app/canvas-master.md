# LB-CS | App Master – Indice & Standard
Versione: 1.1 (2025-09-07)
## Scopo
Indice centrale e regole comuni per l’app LB-CS. Qui definiamo standard, variabili d’ambiente, schema dati canonico, convenzioni e flusso di lavoro. I Canvas di dominio derivano da questo.
--- 
## Mappa Canvas (figli)
* **LB-CS | Dominio: messages – API/Routes/View** *(da creare)*
* **LB-CS | Ops/Deploy – Heroku & Atlas** *(da creare)*
* **LB-CS | Auth – API & Web** *(creato)*
> Ogni Canvas figlio mantiene lo stesso ordine sezioni: **Spec → API → Routes → View → Test → Changelog**.
--- 
## Variabili d’ambiente (globali)
``` 
PORT # heroku assegna
MONGODB_URI # connessione Atlas
USERS_LIST # es: alice,bob,charlie
PASSWORD_<USER_ID> # es: PASSWORD_ALICE=...
SESSION_SECRET # firma cookie di sessione
SESSION_MAX_AGE_DAYS # es: 7
``` 
Regole: 
* `USERS_LIST` non vuota, univoca; ogni utente deve avere `PASSWORD_<USER>`.
* `SESSION_SECRET` forte in produzione.
--- 
## Schema dati canonico
### messages
```ts 
Message = {
    _id: string,           // stringa, normalizzata dal server
    userid: string,        // utente che ha creato/ultimo aggiornato
    datetime: Date,        // creazione
    text: string,
    status: 'inserito' | 'esame in corso' | 'approvato' | 'rifiutato' | 'annullato',
    notes?: string,
    lastUpdatedAt?: Date,
    lastUpdatedBy?: string,
} 
``` 
Linee guida:
* L’API **restituisce sempre** `_id` come **stringa**.
* Validare `status` lato server; 400 per valori non ammessi.
--- 
## Standard API
* **Prefisso**: `/api`
* **Autenticazione**: cookie di sessione.
* `POST /api/login` → accetta JSON `{ user, password }` o Basic Auth; setta sessione.
* `POST /api/logout` → invalida sessione, ritorna `204`.
* `GET /api/me` → stato corrente; `401` se non loggato.
* **Errori**:
* 400 `{ error: 'invalid id' | 'no fields' | 'text required' | 'invalid status' }`
* 401 `{ error: 'unauthorized' | 'unauthenticated' }`
* 404 `{ error: 'not found' }`
* 500 `{ error: 'internal', message, stack? }` (stack solo in non-prod)
--- 
## Convenzioni naming & struttura repo
``` 
/ # root app
/config/ # parsing env, validazioni
/middleware/ # auth/session, requireAuth
/routes/ # index (mount), auth API, web UI
/domains/ 
<dominio>/ 
    api.js # router API del dominio
    routes.js # (opzionale) pagine specifiche
    views/ # html/react standalone
/public/ # landing + asset condivisi
/scripts/ # ops (heroku, ecc.)
``` 
Commit message: `[<dominio> vX.Y] <azione>`
--- 
## UI/Views (linee guida)
* React standalone (UMD) nelle view HTML dei domini.
* Niente build step (minimo indispensabile), fetch su stesso origin.
* Funzione client `showError(r)` per visibilità errori in test.
--- 
## Sicurezza (livello attuale, semplice)
* Login con cookie firmato (`cookie-session`).
* `secure`=true in production, `sameSite=lax`, `httpOnly=true`.
* Nessun contenuto critico → Basic session sufficiente per MVP.
--- 
## File principali (implementazione base)
### /config/session.js
```js 
const cookieSession = require('cookie-session');
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
``` 
### /middleware/requireAuth.js
```js 
module.exports = function requireAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: 'unauthenticated' });
    } 
    next(); 
}; 
``` 
### /utils/auth.js
```js 
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
    return raw.split(',').map(s => normalizeUserId(s)).filter(Boolean);
} 
function getPasswordForUser(userId) {
    const key = `PASSWORD_${String(userId).toUpperCase()}`;
    return process.env[key];
} 
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
``` 
### /routes/auth.js (API)
```js 
const express = require('express');
const router = express.Router();
const { parseBasicAuth, checkCredentials, normalizeUserId } = require('../utils/auth');
function badRequest(res, reason) {
    return res.status(400).json({ error: reason });
} 
// POST /api/login
router.post('/login', express.json(), (req, res) => {
    let user, password;
    const basic = parseBasicAuth(req.headers['authorization']);
    if (basic) {
        user = basic.user;
        password = basic.pass;
    } else {
        ({ user, password } = req.body || {});
    } 
    if (!user || !password) return badRequest(res, 'no fields');
    if (!checkCredentials(user, password)) return res.status(401).json({ error: 'unauthorized' });
    req.session.user = normalizeUserId(user);
    return res.json({ user: req.session.user });
}); 
// POST /api/logout
router.post('/logout', (req, res) => {
    req.session = null;
    return res.status(204).end();
}); 
// GET /api/me
router.get('/me', (req, res) => {
    if (req.session && req.session.user) return res.json({ user: req.session.user });
    return res.status(401).json({ error: 'unauthenticated' });
}); 
module.exports = router;
``` 
### /routes/web.js (UI)
```js 
const express = require('express');
const router = express.Router();
// GET /logout → invalida sessione e redirect home
router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/'); 
}); 
// GET /login → schermata HTML per login
router.get('/login', (req, res) => {
    res.send('<html><body><form method="POST" action="/api/login">User:<input name="user"/><br/>Password:<input type="password" name="password"/><br/><button type="submit">Login</button></form></body></html>');
}); 
module.exports = router;
``` 
### /routes/index.js
```js 
const express = require('express');
const { sessionMiddleware } = require('../config/session');
const authRoutes = require('./auth');
const webRoutes  = require('./web');
function buildApp() {
    const app = express();
    app.use(sessionMiddleware()); 
    app.use('/api', authRoutes);
    app.use('/', webRoutes);
    return app;
} 
module.exports = { buildApp };
``` 
--- 
## Test rapidi (curl)
```bash 
# Stato sessione
curl -i http://localhost:3000/api/me
# Login JSON
curl -i -H 'Content-Type: application/json' \
-d '{"user":"alice","password":"secret"}' \
-c cookies.txt http://localhost:3000/api/login
# Login Basic
curl -i -u alice:secret -c cookies.txt http://localhost:3000/api/login
# Logout API
curl -i -X POST -b cookies.txt -c cookies.txt http://localhost:3000/api/logout
# Logout UI (redirect)
curl -i -b cookies.txt -c cookies.txt http://localhost:3000/logout
# Login UI (form HTML)
open http://localhost:3000/login
``` 
--- 
## Flusso di lavoro suggerito
1. Aggiorna **Master** (questa pagina) quando cambi standard o schema comune.
2. In ogni Canvas di dominio, indica in cima “Allineato al Master vX.Y”.
3. Quando cambi una regola centrale, aggiorna prima il Master, poi i domini.
--- 
## Changelog
* **1.1 (2025-09-07)**: aggiunte specifiche complete Auth (login/logout/me API + logout UI), file `session.js`, `requireAuth.js`, `utils/auth.js`, aggiornato router index.
* **1.0 (2025-09-07)**: creato indice, variabili, schema `Message`, standard errori, struttura repo, linee guida UI e flusso.