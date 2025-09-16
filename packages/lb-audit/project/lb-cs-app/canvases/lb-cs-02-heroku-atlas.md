# LB-CS | Ops/Deploy – Heroku & Atlas
Versione: 1.0 (2025-09-07) — **Allineato al Master v1.0**

## Obiettivo
Guida operativa minima per deploy e gestione dell’app su **Heroku** con database **MongoDB Atlas**.

---

## Ambienti
- **Dev locale**: `.env` (vedi esempio), `node server.js` → http://localhost:3000
- **Prod**: Heroku (config vars), Atlas (cluster SRV)

### Variabili (prod)
```
MONGODB_URI
USERS_LIST
PASSWORD_<USER>
SESSION_SECRET
SESSION_MAX_AGE_DAYS
```
> `SESSION_SECRET` robusto e tenuto segreto. `USERS_LIST` allineata ai collaboratori.

---

## Setup MongoDB Atlas
1. Crea **Project** + **Cluster** (M0 va bene per test).
2. **Database Access** → crea utente DB con role `readWriteAnyDatabase` (minimo: `readWrite` sul DB target).
3. **Network Access** → consenti IP Heroku (o temporaneamente `0.0.0.0/0` solo per setup rapido).
4. Copia `Connection String (SRV)` e impostala in `MONGODB_URI`.

> DB name: puoi usare quello alla fine della URI (es. `.../lbcs?retryWrites=true...`).

---

## Setup Heroku
```bash
heroku login
heroku create lb-cs-app       # o nome scelto

# Config vars (esempio)
heroku config:set \
  MONGODB_URI="mongodb+srv://..." \
  USERS_LIST="alice,bob" \
  PASSWORD_ALICE="..." \
  PASSWORD_BOB="..." \
  SESSION_SECRET="change_me" \
  SESSION_MAX_AGE_DAYS=7

# Deploy (ramo main)
git push heroku main

# Log e diagnostica
heroku logs --tail
heroku open
```

**Procfile** (già incluso):
```
web: node server.js
```

---

## Script utili
### `scripts/heroku-sync.sh`
Esegue `git push heroku <branch>`. Facoltativo hook `pre-push` per sincronizzare automaticamente quando pushi su GitHub.

### Aggiornare credenziali
```bash
heroku config:set USERS_LIST="alice,bob,charlie" PASSWORD_CHARLIE="..."
```
> Non serve riavvio manuale; Heroku rilegge le vars al **restart** del dyno (puoi forzare con `heroku ps:restart`).

---

## Post‑deploy checklist
- `heroku open` → Landing visibile
- `/login` → login OK e `/api/me` restituisce `{ userId }`
- `/` → lista messaggi (pubblico) e form inserimento **visibile se loggato**
- `/app/messages.html` → CRUD messaggi (inserisci, modifica, elimina)
- `heroku logs --tail` → nessun errore 500 ricorrente

---

## Troubleshooting
**Errore: 500 internal**
- Guarda i log: `heroku logs --tail`. In non-prod vedi `message` e `stack` dall’error handler.
- Verifica `MONGODB_URI` e raggiungibilità (IP whitelist in Atlas).

**401/redirect a /login quando dovresti essere loggato**
- Cookie di sessione bloccato? In prod l’app usa `secure: true`: verifica di stare su **https** nel dominio Heroku.

**PUT/DELETE falliscono (invalid id)**
- Verifica che l’`_id` sia una stringa valida (le API già normalizzano le risposte).

**Cannot GET /app/messages.html**
- Controlla route in `routes/index.js` e path del file `domains/messages/views/messages.html`.

---

## Sicurezza minima (prod)
- `SESSION_SECRET` lungo e random (almeno 32+ chars).
- Solo collaboratori nella `USERS_LIST`; ruota password periodicamente.
- HTTPS by default su Heroku; evita link http hardcoded.

---

## Manutenzione
**Backup dati**
- Atlas → Snapshots/Backup (anche su M0: export manuale via `mongodump`).

**Migrazioni minime**
- Aggiunta indici (facoltativo):
```js
// esempio da eseguire una tantum in una console script
// db.collection('messages').createIndex({ datetime: -1 })
```

**Monitoraggio**
- `heroku logs --tail`, metrics Heroku, Charts Atlas.

---

## Rollback
- Codice: `git revert` + `git push heroku main`.
- Config vars: annotare cambi nel Canvas Master; in caso di errore, ripristina i valori precedenti.
- Dati: ripristino da backup Atlas.

---

## Changelog
- **1.0 (2025-09-07)**: prima stesura Ops/Deploy (Heroku + Atlas).

### sys_source https://chatgpt.com/c/68bd3125-2eb8-832e-b34c-b6fbb0225277