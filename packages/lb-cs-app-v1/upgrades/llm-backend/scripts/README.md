# LLM Proxy Tester (Node 18+)

A tiny script to exercise your `/api/llm/chat` endpoint and observe cache hits.

## Usage

```bash
# OPENAI
API_KEY=your-admin-key node test-llm.js --base-url http://localhost:3000   --provider openai --model gpt-4o-mini   --prompt "Say hi in Italian" --params '{"temperature":0.2,"max_tokens":64}'

# GROK (xAI)
API_KEY=your-admin-key node test-llm.js --provider grok --model grok-beta --prompt "Explain quantum tunneling simply"

# DEEPSEEK
node test-llm.js --provider deepseek --model deepseek-chat --prompt "List 3 tips for JS performance"
```

Options:
- `--base-url` (default `http://localhost:3000` or env `BASE_URL`)
- `--provider` (`openai|grok|deepseek`)
- `--model` (provider-specific model name)
- `--prompt` (user message)
- `--params` JSON string (e.g. `{"temperature":0.2,"max_tokens":200}`)
- `--times` repeat request to see cache (default 2)
- `--timeout` in ms (default 45000)

Env:
- `API_KEY`: sent as `x-api-key` if your server enforces `ADMIN_KEY`.
- `BASE_URL`: alternative to `--base-url`.
```

Expected output includes latency, whether the response was served from cache, `cacheId`, and token usage if provided by the provider.
