import { Router, Request, Response } from "express";
import requireAuth from "@/middleware/requireAuth";
import { connectMongo, LLMCacheModel, ILLMCache } from "@/db";
import { hashFor } from "@/domains/llm/hash";
import { callOpenAI } from "@/domains/llm/providers/openai";
import { callGrok } from "@/domains/llm/providers/grok";
import { callDeepseek } from "@/domains/llm/providers/deepseek";

const router = Router();

type ProviderName = "openai" | "grok" | "deepseek";
interface ChatBody {
  provider: ProviderName;
  model: string;
  messages: unknown[];
  params?: Record<string, unknown>;
}

function assertBody(b: unknown): asserts b is ChatBody {
  const o = b as Record<string, unknown> | null;
  if (!o || typeof o.provider !== "string" || typeof o.model !== "string" || !Array.isArray(o.messages)) {
    const e = new Error("invalid body"); (e as any).status = 400; throw e;
  }
}

function pickProvider(p: ProviderName){
  if (p === "openai") return callOpenAI;
  if (p === "grok") return callGrok;
  if (p === "deepseek") return callDeepseek;
  const e: any = new Error("invalid provider"); e.status = 400; throw e;
}

router.post("/chat", requireAuth, async (req: Request, res: Response) => {
  await connectMongo();
  try {
    assertBody(req.body);
    const { provider, model, messages, params = {} } = req.body;
    const timeoutMs = Number(process.env.LLM_TIMEOUT_MS || 45000);
    const id = hashFor({ provider, model, messages, params });

    const existing = await LLMCacheModel.findById(id).lean().exec();
    if (existing) {
      // touch hits
      await LLMCacheModel.updateOne({ _id: id }, { $inc: { "stats.hits": 1 }, $set: { "stats.lastHitAt": new Date() } }).exec();
      return res.json({ result: { content: existing.result?.content || "" }, info: {
        cached: true, cacheId: id, provider: existing.provider, model: existing.model,
        createdAt: existing.stats?.createdAt, tokens: existing.stats?.providerUsage, latency_ms: 0
      }});
    }

    const call = pickProvider(provider);
    const t0 = Date.now();
    const out = await call({ model, messages, params, timeoutMs });
    const latency = Date.now() - t0;

    const doc: ILLMCache = {
      _id: id,
      provider, model,
      input: { messages, params },
      result: { content: out.content, raw: out.raw },
      stats: { createdAt: new Date(), hits: 0, providerUsage: out.info?.tokens },
      providerMeta: { latency_ms: latency }
    };
    // upsert to avoid race
    await LLMCacheModel.updateOne({ _id: id }, { $setOnInsert: doc }, { upsert: true }).exec();

    res.json({ result: { content: out.content }, info: {
      cached: false, cacheId: id, provider, model, createdAt: doc.stats.createdAt,
      tokens: out.info?.tokens, latency_ms: latency
    }});
  } catch (err: unknown){
    const e = err as { status?: number; message?: string };
    const status = e.status || 500;
    const body = status === 500
      ? { error: "internal", message: e.message || "error" }
      : { error: "invalid request", message: e.message || "bad request" };
    res.status(status).json(body);
  }
});

router.get("/cache", async (req: Request, res: Response) => {
  await connectMongo();
  const { q, provider, model } = req.query;
  const limit = Math.min(Number(req.query.limit || 20), 100);
  const skip = Math.max(Number(req.query.skip || 0), 0);

  const sel: Record<string, unknown> = {};
  if (provider) sel.provider = provider;
  if (model) sel.model = model;
  if (q) (sel as any).$text = { $search: String(q) };

  const cur = LLMCacheModel.find(sel, { "result.content": 1, provider: 1, model: 1, stats: 1 })
    .sort({ "stats.createdAt": -1 })
    .skip(skip)
    .limit(limit);
  const items = await cur.lean().exec();
  const total = await LLMCacheModel.countDocuments(sel).exec();
  const mapped = items.map((it) => ({
    _id: it._id,
    provider: it.provider,
    model: it.model,
    stats: it.stats,
    result: { content: it.result?.content },
    snippet: (it.result?.content || "").slice(0, 180)
  }));
  res.json({ items: mapped, total });
});

router.get("/cache/:id", async (req: Request, res: Response) => {
  await connectMongo();
  const it = await LLMCacheModel.findById(req.params.id).lean().exec();
  if (!it) return res.status(404).json({ error: "not found" });
  res.json(it);
});

router.delete("/cache/:id", requireAuth, async (req: Request, res: Response) => {
  await connectMongo();
  await LLMCacheModel.deleteOne({ _id: req.params.id }).exec();
  res.json({ ok: true });
});

router.post("/warmup", requireAuth, async (req: Request, res: Response) => {
  await connectMongo();
  const arr = Array.isArray(req.body?.items) ? req.body.items : [];
  let queued = 0;
  for (const item of arr as Array<{ provider?: ProviderName; model?: string; messages?: unknown[]; params?: Record<string, unknown> }>){
    if (!item || !item.provider || !item.model || !Array.isArray(item.messages)) continue;
    const id = hashFor({ provider: item.provider, model: item.model, messages: item.messages, params: item.params || {} });
    const exists = await LLMCacheModel.exists({ _id: id }).exec();
    if (exists) continue;
    await LLMCacheModel.updateOne({ _id: id }, { $setOnInsert: {
      _id: id,
      provider: item.provider, model: item.model,
      input: { messages: item.messages, params: item.params || {} },
      result: { content: "", raw: null },
      stats: { createdAt: new Date(), hits: 0 },
      providerMeta: { warmup: true }
    } }, { upsert: true }).exec();
    queued++;
  }
  res.json({ queued });
});

export default router;
