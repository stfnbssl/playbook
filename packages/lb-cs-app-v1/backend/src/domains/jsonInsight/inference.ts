import type { JsonValue, InferredSchema, InferredField } from "@/domains/jsonInsight/types";

function typeOf(v: unknown): string {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

function mergeTypes(a: string[], b: string[]): string[] {
  const set = new Set<string>([...a, ...b]);
  return Array.from(set.values()).sort();
}

export function inferSchema(data: JsonValue[] | JsonValue): InferredSchema {
  const arr = Array.isArray(data) ? data as JsonValue[] : [data as JsonValue];
  const fieldMap = new Map<string, InferredField>();
  let maxDepth = 0;
  let hasArrays = false;

  function walk(node: JsonValue, basePath: string, depth: number) {
    maxDepth = Math.max(maxDepth, depth);
    const t = typeOf(node);
    if (t === "array") {
      hasArrays = true;
      const a = node as JsonValue[];
      const path = basePath ? basePath + "[*]" : "[*]";
      for (const el of a) walk(el, path, depth + 1);
      return;
    }
    if (t === "object") {
      const obj = node as Record<string, JsonValue>;
      for (const k of Object.keys(obj)) {
        const p = basePath ? basePath + "." + k : k;
        walk(obj[k], p, depth + 1);
      }
      return;
    }
    const p = basePath || "$";
    const existing = fieldMap.get(p);
    const ty = typeOf(node);
    if (!existing) {
      fieldMap.set(p, {
        path: p,
        types: [ty],
        examples: typeof node === "string" ? [node.slice(0, 60)] : [String(node).slice(0, 60)]
      });
    } else {
      existing.types = mergeTypes(existing.types, [ty]);
      if (existing.examples && existing.examples.length < 3) {
        existing.examples.push(typeof node === "string" ? node.slice(0, 60) : String(node).slice(0, 60));
      }
    }
  }

  for (const item of arr) walk(item, "", 0);

  return {
    fields: Array.from(fieldMap.values()).sort((a, b) => a.path.localeCompare(b.path)),
    depth: maxDepth,
    hasArrays
  };
}

export interface LlmSchemaRefineOptions {
  enabled: boolean;
  baseUrl?: string;
  apiKey?: string;
}

export async function refineSchemaWithLLM(sample: JsonValue[] | JsonValue, inferred: InferredSchema, opts: LlmSchemaRefineOptions): Promise<string | null> {
  if (!opts.enabled) return null;
  const base = (opts.baseUrl || "").replace(/\/$/, "");
  if (!base) return null;
  const body = {
    provider: "openai",
    model: process.env.LLM_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a data architect. Produce a concise JSON schema summary for the given sample." },
      { role: "user", content: `Sample (truncated):\n\n${JSON.stringify(sample).slice(0, 4000)}\n\nInferred fields: ${JSON.stringify(inferred.fields).slice(0, 2000)}` }
    ],
    params: { temperature: 0.2, max_tokens: 600 }
  };

  const r = await fetch(`${base}/api/llm/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(opts.apiKey ? { "x-api-key": opts.apiKey } : {})
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) return null;
  const j = await r.json().catch(() => null);
  const content = j?.result?.content;
  return typeof content === "string" ? content : null;
}
