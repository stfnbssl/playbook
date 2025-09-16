import mongoose, { Schema, Model } from "mongoose";

export interface IMarkdownDoc {
  categoria: string;
  nome: string;
  contenuto: string;
  data: Date;
  versione: number;
}

const MarkdownSchema = new Schema<IMarkdownDoc>(
  {
    categoria: { type: String, required: true, index: true },
    nome: { type: String, required: true, index: true },
    contenuto: { type: String, required: true },
    data: { type: Date, required: true },
    versione: { type: Number, required: true }
  },
  { collection: "markdowns" }
);

MarkdownSchema.index({ categoria: 1, nome: 1, versione: -1 }, { unique: true });
MarkdownSchema.index({ categoria: 1, nome: 1 });

export type MarkdownModelType = Model<IMarkdownDoc>;
export const MarkdownModel = (mongoose.models.Markdown as MarkdownModelType) || mongoose.model<IMarkdownDoc>("Markdown", MarkdownSchema);

// ---------- LLM cache ----------
export interface ILLMCache {
  _id: string;
  provider: "openai" | "grok" | "deepseek" | string;
  model: string;
  input: { messages: unknown[]; params: Record<string, unknown> };
  result: { content: string; raw: unknown | null };
  stats: { createdAt: Date; hits: number; lastHitAt?: Date; providerUsage?: { in?: number; out?: number; total?: number } };
  providerMeta?: Record<string, unknown>;
}

const LLMCacheSchema = new Schema<ILLMCache>(
  {
    _id: { type: String, required: true },
    provider: { type: String, required: true, index: true },
    model: { type: String, required: true, index: true },
    input: {
      messages: { type: [Schema.Types.Mixed], required: true },
      params: { type: Schema.Types.Mixed, required: true }
    },
    result: {
      content: { type: String, required: true },
      raw: { type: Schema.Types.Mixed, default: null }
    },
    stats: {
      createdAt: { type: Date, required: true, index: true },
      hits: { type: Number, required: true, default: 0 },
      lastHitAt: { type: Date },
      providerUsage: { in: Number, out: Number, total: Number }
    },
    providerMeta: { type: Schema.Types.Mixed }
  },
  { collection: "llm_cache" }
);

LLMCacheSchema.index({ "stats.createdAt": -1 });
LLMCacheSchema.index({ provider: 1, model: 1 });
try { LLMCacheSchema.index({ "result.content": "text" } as any); } catch {}

export type LLMCacheModelType = Model<ILLMCache>;
export const LLMCacheModel = (mongoose.models.LLMCache as LLMCacheModelType) || mongoose.model<ILLMCache>("LLMCache", LLMCacheSchema);

export async function connectMongo(uri?: string): Promise<typeof mongoose> {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI non impostata");
  }
  if (mongoose.connection.readyState === 1) return mongoose;
  return mongoose.connect(mongoUri);
}
