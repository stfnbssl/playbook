# LB-CS — Dominio LLM

**Allineato al Master v1.0 (2025-09-07)**

## Montaggio
Nel router principale:
```js
// /routes/index.js
const express = require('express');
const llm = require('../domains/llm/api');
const router = express.Router();
router.use('/api/llm', llm);
module.exports = router;
```

Assicurati di avere `cookie-session` configurato e di impostare `req.session.user` al login.

## Variabili richieste
- `MONGODB_URI`, `SESSION_SECRET`, `SESSION_MAX_AGE_DAYS`, `USERS_LIST`, `PASSWORD_<USER>`
- `OPENAI_API_KEY`, `XAI_API_KEY`, `DEEPSEEK_API_KEY`
- Opzionali: `LLM_TIMEOUT_MS`, `LLM_CACHE_TTL_DAYS`

## Indici Mongo
```bash
scripts/llm-ops.sh create-index
```

## Dipendenze
- `express`, `cookie-session`
- `mongodb`
- `node-fetch@2` (se Node < 18) oppure usare `global.fetch` su Node 18+
