import OpenAI from "openai";
import type { ProviderCallInput, ProviderCallOutput } from "./openai";

export async function callGrok({ model, messages, params = {}, timeoutMs = 45000 }: ProviderCallInput): Promise<ProviderCallOutput> {
  const client = new OpenAI({
    apiKey: process.env.XAI_API_KEY ?? "",
    baseURL: "https://api.x.ai/v1",
  });
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
      },
      { signal: ctrl.signal }
    );
    const content = resp.choices?.[0]?.message?.content ?? "";
    const u = resp.usage;
    return { content, info: { tokens: { in: u?.prompt_tokens, out: u?.completion_tokens, total: u?.total_tokens } }, raw: resp };
  } finally {
    clearTimeout(t);
  }
}
