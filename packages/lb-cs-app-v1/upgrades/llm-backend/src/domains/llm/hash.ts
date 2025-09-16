import crypto from "node:crypto";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function canonicalize(input: unknown): Json | undefined {
  function clean(o: unknown): Json | undefined {
    if (o == null) return undefined;
    if (Array.isArray(o)) return o.map(clean) as Json;
    if (isPlainObject(o)) {
      const out: Record<string, Json> = {};
      Object.keys(o).sort().forEach(k => {
        const v = clean((o as Record<string, unknown>)[k]);
        if (v !== undefined && v !== "" && !(typeof v === "number" && Number.isNaN(v))) {
          out[k] = v;
        }
      });
      return out as Json;
    }
    if (typeof o === "number") return Math.round(o * 1e6) / 1e6;
    if (typeof o === "string" || typeof o === "boolean") return o;
    return undefined;
  }
  return clean(input);
}

export function hashFor(input: { provider: string; model: string; messages: unknown[]; params: Record<string, unknown> }) {
  const canonical = canonicalize(input);
  const json = JSON.stringify(canonical);
  return crypto.createHash("sha256").update(json).digest("hex");
}
