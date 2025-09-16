# LB-CS | Dominio: messages – API/Routes/View

Versione: 1.0 (2025-09-07) — **Allineato al Master v1.0**

---

## 1) Spec

**Scopo:** CRUD di messaggi. Lettura **pubblica**, scrittura **protetta da sessione**.

**Schema (canonico):**

```ts
Message = {
  _id: string,
  userid: string,
  datetime: Date,
  text: string,
  status: 'inserito' | 'esame in corso' | 'approvato' | 'rifiutato' | 'annullato',
  notes?: string,
  lastUpdatedAt?: Date,
  lastUpdatedBy?: string,
}
```

**Regole di accesso:**

* `GET /api/messages`, `GET /api/messages/:id` → **pubbliche**
* `POST`, `PUT`, `DELETE` su `/api/messages` → **protette** (richiedono login)

**Note UX:** Pagina di gestione protetta `/app/messages.html`; home `/` mostra lista read‑only più form di inserimento solo se loggati.

---

## 2) API

Percorso base: **`/api/messages`**.

### GET `/api/messages`

* **Accesso:** pubblico
* **Output 200:** `Message[]` (con `_id` **stringa**)

### GET `/api/messages/:id`

* **Accesso:** pubblico
* **Errori:** `400 {error:'invalid id'}`, `404 {error:'not found'}`

### POST `/api/messages`

* **Accesso:** protetto (cookie sessione)
* **Body:** `{ text: string, status?: Status, notes?: string }`
* **Output 201:** `Message` creato
* **Errori:** `400 {error:'text required'|'invalid status'}`

### PUT `/api/messages/:id`

* **Accesso:** protetto
* **Body:** `{ text?: string, status?: Status, notes?: string }` (almeno un campo)
* **Output 200:** `Message` aggiornato
* **Errori:** `400 {error:'invalid id'|'no fields'|'invalid status'}`, `404 {error:'not found'}`

### DELETE `/api/messages/:id`

* **Accesso:** protetto
* **Output 200:** `{ ok: true }`
* **Errori:** `400 {error:'invalid id'}`, `404 {error:'not found'}`

**Errori generici:** `500 { error:'internal', message, stack? }` (stack solo in non‑prod)

---

## 3) Routes (server)

Percorsi file nel repo:

```
/domains/messages/api.js     # router API (public + protected)
/routes/index.js             # mount: public, then protected con requireAuth
```

**Mount consigliato (già in app):**

```js
// routes/index.js (estratto)
const buildMessagesApi = require("../domains/messages/api");
const messagesApi = buildMessagesApi(db);
app.use("/api/messages", messagesApi.public);      // lettura pubblica
app.use("/api/messages", requireAuth, messagesApi.protected); // scritture protette

// view protetta
app.get("/app/messages.html", requireAuth, (req,res)=>{
  res.sendFile(path.join(__dirname, "../domains/messages/views/messages.html"));
});
```

---

## 4) View (React standalone)

Percorso file:

```
/domains/messages/views/messages.html
```

**Funzioni UI:**

* Tabella messaggi
* Inserimento (text, status, notes)
* Modifica inline (status/text/notes)
* Cancellazione riga
* `showError(r)` per alert dettagliati

**Nota id:** la view usa `idStr(m)` ma l’API già normalizza `_id` a stringa; resta compatibile.

---

## 5) Test rapidi

> Prima effettua login via `/login` nel browser per ottenere la sessione.

```bash
# Lista pubblica
curl -s http://localhost:3000/api/messages | jq length

# Dettaglio con id valido
curl -s http://localhost:3000/api/messages/<ID>

# Creazione (dimostrativa con cookie)
# Su curl: salva cookie dopo login; esempio:
# curl -c cookies.txt -d 'user_id=alice&password=alicepass' -X POST http://localhost:3000/login
# poi:
curl -b cookies.txt -H 'Content-Type: application/json' \
  -d '{"text":"prova","status":"inserito","notes":"n1"}' \
  http://localhost:3000/api/messages

# Update (status)
curl -b cookies.txt -H 'Content-Type: application/json' -X PUT \
  -d '{"status":"approvato"}' \
  http://localhost:3000/api/messages/<ID>

# Delete
curl -b cookies.txt -X DELETE http://localhost:3000/api/messages/<ID>
```

**Casi d’errore attesi:**

* `PUT` con id malformato → 400 `invalid id`
* `PUT` senza campi → 400 `no fields`
* `POST` senza `text` → 400 `text required`

---

## 6) Changelog

* **1.0 (2025-09-07)**: prima estrazione del dominio `messages` con API/Routes/View e test.

### sys_source https://chatgpt.com/c/68bd32cc-a2d4-832e-b290-8116afa73aa2