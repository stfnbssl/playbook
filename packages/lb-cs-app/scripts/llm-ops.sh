#!/usr/bin/env bash
  # Ops script for LB-CS LLM domain (MongoDB Atlas + Heroku env).
  # Usage:
  #   chmod +x scripts/llm-ops.sh
  #   scripts/llm-ops.sh create-index
  #   scripts/llm-ops.sh heroku-env <app-name>
  set -euo pipefail

  cmd="${1:-}"

  case "$cmd" in
    create-index)
      echo "Creating MongoDB indexes on collection llm_cache..."
      cat <<'JS' | mongosh "${MONGODB_URI:-mongodb://localhost:27017/yourdb}"
      const col = db.getCollection('llm_cache');
      col.createIndex({ 'stats.createdAt': -1 });
      col.createIndex({ provider: 1, model: 1 });
      col.createIndex({ 'result.content': 'text' });
      print('Indexes created.');
JS
      ;;
    heroku-env)
      app="${2:-}"
      if [[ -z "$app" ]]; then echo "Usage: $0 heroku-env <app-name>"; exit 1; fi
      echo "Setting Heroku config vars for app $app"
      heroku config:set         LLM_TIMEOUT_MS=45000         LLM_CACHE_TTL_DAYS=0         --app "$app"
      echo "Remember to also set MONGODB_URI, SESSION_SECRET, USERS_LIST, PASSWORD_<USER>, and provider API keys (OPENAI_API_KEY, XAI_API_KEY, DEEPSEEK_API_KEY)."
      ;;
    *)
      echo "Commands:"
      echo "  create-index      Create MongoDB indexes (needs mongosh and MONGODB_URI)."
      echo "  heroku-env <app>  Set baseline env vars on Heroku."
      ;;
  esac
