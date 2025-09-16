# LB-CS | App Master – Indice & Standard

Versione: 1.0 (2025-09-07)

## Scopo

Indice centrale e regole comuni per l’app LB-CS. Qui definiamo standard, variabili d’ambiente, schema dati canonico, convenzioni e flusso di lavoro. I Canvas di dominio derivano da questo.

---

## Mappa Canvas (figli)

* **LB-CS | Dominio: messages – API/Routes/View** *(da creare)*
* **LB-CS | Ops/Deploy – Heroku & Atlas** *(da creare)*

> Ogni Canvas figlio mantiene lo stesso ordine sezioni: **Spec → API → Routes → View → Test → Changelog**.

---

## Variabili d’ambiente (globali)

```
PORT                         # heroku assegna
MONGODB_URI                  # connessione Atlas
USERS_LIST                   # es: alice,bob,charlie
PASSWORD_<USER_ID>           # es: PASSWORD_ALICE=...
SESSION_SECRET               # firma cookie di sessione
SESSION_MAX_AGE_DAYS         # es: 7
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
* **Autenticazione**: cookie di sessione; endpoint pubblici espliciti (es. `GET /api/messages` lista pubblica)
* **Errori**:

  * 400 `{ error: 'invalid id' | 'no fields' | 'text required' | 'invalid status' }`
  * 401 `{ error: 'unauthorized' | 'unauthenticated' }`
  * 404 `{ error: 'not found' }`
  * 500 `{ error: 'internal', message, stack? }` (stack solo in non-prod)

---

## Convenzioni naming & struttura repo

```
/               # root app
/config/        # parsing env, validazioni
/middleware/    # auth/session, requireAuth
/routes/        # index (mount), auth, ...
/domains/
  <dominio>/
    api.js     # router API del dominio
    routes.js  # (opzionale) pagine specifiche
    views/     # html/react standalone
/public/        # landing + asset condivisi
/scripts/       # ops (heroku, ecc.)
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

## Test rapidi (pattern)

Esempi (da adattare per ogni dominio):

```bash
# stato sessione
curl -i http://localhost:3000/api/me

# messages – lettura pubblica
curl -s http://localhost:3000/api/messages | jq .[0]

# messages – crea (richiede login nel browser per ottenere cookie)
# usare la pagina /login poi eseguire test da UI; per curl servirebbe gestire cookie.
```

---

## Flusso di lavoro suggerito

1. Aggiorna **Master** (questa pagina) quando cambi standard o schema comune.
2. In ogni Canvas di dominio, indica in cima “Allineato al Master vX.Y”.
3. Quando cambi una regola centrale, aggiorna prima il Master, poi i domini.

---

## Changelog

* **1.0 (2025-09-07)**: creato indice, variabili, schema `Message`, standard errori, struttura repo, linee guida UI e flusso.

### sys_source https://chatgpt.com/c/68bd2bc0-5e48-8330-b252-d64bf7efce1c