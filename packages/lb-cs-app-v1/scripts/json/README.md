# JSON Insight — Folder Ingestion Tester

Utility per inviare più file JSON all'endpoint `POST /api/json/ingest` del servizio JSON Insight.

## Requisiti
- Node.js 18+ (usa `fetch` nativo)
- Endpoint attivo (default `http://localhost:3001`)

## Uso
```bash
# Invia tutti i .json nella cartella ./samples (un dataset per file)
node ingest-folder.js --dir ./samples --base-url http://localhost:3001

# Ricorsivo e 3 ingestion in parallelo
node ingest-folder.js --dir ./samples --recursive --concurrency 3

# Merge: invia TUTTI i JSON come un singolo dataset (array unificato)
node ingest-folder.js --dir ./samples --merge

# Dry run (nessuna POST)
node ingest-folder.js --dir ./samples --dry-run

# Filtra per pattern nel nome file
node ingest-folder.js --dir ./samples --pattern users_
```

### Opzioni
- `--dir` (obbligatorio): cartella da scansionare
- `--base-url` (default `http://localhost:3001`)
- `--pattern` (default `.json`) — filtro substring per filename
- `--recursive` — include sottocartelle
- `--merge` — un singolo dataset con l'unione dei file
- `--concurrency` — parallelismo (default 2) per "un dataset per file"
- `--dry-run` — non invia, stampa soltanto
- `--timeout` — timeout in ms (default 45000)

### Ambiente
- `API_KEY` — opzionale; inviato come header `x-api-key` se il backend richiede `ADMIN_KEY`.
