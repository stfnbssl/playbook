/**
 * Simple tester for the LLM proxy: POST /api/llm/chat
 *
 * Requirements: Node 18+ (global fetch, AbortController).
 *
 * Usage examples:
 *  node test-llm.js --provider openai --model gpt-4o-mini --prompt "Say hi in Italian"
 *  node test-llm.js --provider grok --model grok-beta --prompt "What's the weather philosophy?"
 *  node test-llm.js --provider deepseek --model deepseek-chat --prompt "Summarize JS Promises"
 *
 * Options:
 *  --base-url        Base URL of your API (default: http://localhost:3000)
 *  --provider        one of: openai | grok | deepseek
 *  --model           provider model name (e.g., gpt-4o-mini)
 *  --prompt          single user prompt (string)
 *  --params          JSON string for extra params (e.g., '{"temperature":0.2,"max_tokens":200}')
 *  --times           repeat the same request N times to observe cache hits (default: 2)
 *  --timeout         request timeout in ms (default: 45000)
 *
 * Environment:
 *  API_KEY           sent as 'x-api-key' if ADMIN_KEY is enabled server-side
 *  BASE_URL          alternative to --base-url
 */

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        out[key] = true;
      } else {
        out[key] = next;
        i++;
      }
    }
  }
  return out;
}

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

async function main() {
  const args = parseArgs(process.argv);
  const baseUrl = args["base-url"] || process.env.BASE_URL || "http://localhost:3000";
  const provider = args.provider;
  const model = args.model;
  const prompt = args.prompt || "Hello from tester!";
  const params = args.params ? JSON.parse(args.params) : {};
  const times = Number(args.times || 2);
  const timeoutMs = Number(args.timeout || 45000);
  const apiKey = process.env.API_KEY || "";

  if (!provider || !model) {
    console.error("Missing --provider or --model");
    process.exit(1);
  }

  const body = {
    provider,
    model,
    messages: [{ role: "user", content: prompt }],
    params
  };

  console.log(`→ POST ${baseUrl}/api/llm/chat`);
  console.log(`  provider: ${provider} | model: ${model}`);
  console.log(`  prompt: ${JSON.stringify(prompt)}`);
  if (Object.keys(params).length) console.log(`  params: ${JSON.stringify(params)}`);
  console.log(`  repeat: ${times}x\n`);

  for (let i = 1; i <= times; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const t0 = Date.now();
    try {
      const res = await fetch(`${baseUrl}/api/llm/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify(body),
        signal: ctrl.signal
      });
      const elapsed = Date.now() - t0;
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error(`✗ [${i}/${times}] HTTP ${res.status}: ${errText}`);
        continue;
      }
      const data = await res.json();
      const info = data.info || {};
      console.log(`✓ [${i}/${times}] ${elapsed}ms | cached:${!!info.cached} | cacheId:${info.cacheId || "-"} | tokens:${JSON.stringify(info.tokens || {})}`);
      console.log(`   content: ${String(data?.result?.content || "").slice(0, 200)}${(data?.result?.content || "").length > 200 ? "..." : ""}\n`);
      // tiny pause to avoid provider rate limits if cache miss
      await sleep(300);
    } catch (e) {
      console.error(`✗ [${i}/${times}] Error:`, e instanceof Error ? e.message : String(e));
    } finally {
      clearTimeout(t);
    }
  }

  console.log("Done.");
}

main().catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});
