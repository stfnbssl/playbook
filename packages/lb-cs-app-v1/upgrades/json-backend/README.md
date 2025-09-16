# JSON Insight — Architettura & Skeleton

## Obiettivo
Servizio per **ingest** di JSON estemporanei, **inferenza schema** (anche con supporto LLM opzionale) e **persistenza** su MongoDB con navigazione/prompt generativo.

## Stack
- Backend: Node + Express (TypeScript)
- DB: MongoDB (driver ufficiale)
- Standard: alias `@/`, moduli ESM

## Collezioni MongoDB
- `datasets` — `{ _id, title?, createdAt, stats, schema }`
- `records` — `{ datasetId, chunkIndex, data }`
- `views` — `{ _id, datasetId, title, path, createdAt }` (placeholder per future viste)
- **Indici**: `records({ datasetId:1, chunkIndex:1 })`; opzionale TTL su `datasets.createdAt` se `DATASET_TTL_SECONDS` è impostata.

## Contratti API (bozza implementata)
- `POST /api/json/ingest` — accetta JSON (object o array), inferisce schema, salva dataset + records chunked → `{ datasetId }`
- `GET /api/json/datasets/:id/meta` — info dataset + schema + statistiche base
- `GET /api/json/datasets/:id/data` — paging dei dati: `?skip=0&limit=1` per chunk (stream-ready)
- `GET /api/json/datasets/:id/prompt` — prompt per generare un HTML standalone
- `GET /api/json/datasets` — elenco datasets (opzionale)

## Flow di ingest
1. **Parsing input** (object/array). Se object → normalizzato in array singolo.
2. **Inferenza schema**: walk ricorsivo, tipi di base, profondità, nullability, esempi.
   - Se `USE_LLM_SCHEMA=1`, viene chiamata l'API LLM interna `/api/llm/chat` per un **refine** del JSON schema (opzionale, best-effort).
3. **Persistenza**:
   - Crea `dataset` con `_id`, `schema`, `stats` (count, path types).
   - Chunk dei dati in `records` (default 1000 item/chunk).
4. **Esposizione**: meta, data paginata (per chunk), prompt per renderer.

## Decisioni chiave
- **Driver MongoDB ufficiale** per coerenza e performance.
- **Chunking** su `records` per gestire grandi dataset.
- **LLM refine** opzionale via endpoint LLM già presente.
- **Prompt generator**: restituisce testo da dare a un LLM per ottenere HTML standalone.
