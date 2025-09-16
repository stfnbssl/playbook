export interface ProviderCallInput {
  model: string;
  messages: unknown[];
  params?: { temperature?: number; top_p?: number; max_tokens?: number; tools?: unknown };
  timeoutMs?: number;
}

export interface ProviderCallOutput {
  content: string;
  info?: { tokens?: { in?: number; out?: number; total?: number } };
  raw: unknown;
}

export async function callOpenAI({ model, messages, params = {}, timeoutMs = 45000 }: ProviderCallInput): Promise<ProviderCallOutput> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || ""}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: params.temperature,
        top_p: params.top_p,
        max_tokens: params.max_tokens,
        tools: params.tools
      }),
      signal: ctrl.signal
    });
    if (!r.ok) {
      const text = await r.text();
      throw new Error(`openai ${r.status}: ${text}`);
    }
    const j = await r.json();
    const choice = j?.choices?.[0];
    const content = choice?.message?.content ?? "";
    const usage = j?.usage ?? {};
    return { content, info: { tokens: { in: usage.prompt_tokens, out: usage.completion_tokens, total: usage.total_tokens } }, raw: j };
  } finally {
    clearTimeout(t);
  }
}
