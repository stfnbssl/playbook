import OpenAI from "openai";

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
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const resp = await client.chat.completions.create(
      {
        model,
        messages: messages as any[],
        temperature: params.temperature,
        top_p: params.top_p,
        max_tokens: params.max_tokens,
        tools: params.tools as any,
      },
      { signal: ctrl.signal }
    );
    const choice = resp.choices?.[0];
    const content = choice?.message?.content ?? "";
    const u = resp.usage;
    return { content, info: { tokens: { in: u?.prompt_tokens, out: u?.completion_tokens, total: u?.total_tokens } }, raw: resp };
  } finally {
    clearTimeout(t);
  }
}
