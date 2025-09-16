import { MongoClient, Db, WithId } from "mongodb";

export interface CacheDoc {
  _id: string;
  provider: string;
  model: string;
  input: { messages: unknown[]; params: Record<string, unknown> };
  result: { content: string; raw: unknown };
  stats: { createdAt: Date; hits: number; lastHitAt?: Date; providerUsage?: { in?: number; out?: number; total?: number } };
  providerMeta?: Record<string, unknown>;
}

export interface QueryResultItem {
  _id: string;
  provider: string;
  model: string;
  stats?: CacheDoc["stats"];
  result?: { content?: string };
  snippet?: string;
}

export class Cache {
  private client: MongoClient;
  private _db: Db | null = null;

  constructor(uri: string | undefined) {
    if (!uri) throw new Error("MONGODB_URI non impostata");
    this.client = new MongoClient(uri, { ignoreUndefined: true });
  }

  async init(): Promise<void> {
    if (!this._db) {
      await this.client.connect();
      this._db = this.client.db();
      const col = this.col();
      await col.createIndex({ "stats.createdAt": -1 });
      await col.createIndex({ provider: 1, model: 1 });
      try { await col.createIndex({ "result.content": "text" }); } catch {}
    }
  }

  col() {
    if (!this._db) throw new Error("Cache non inizializzata");
    return this._db.collection<CacheDoc>("llm_cache");
  }

  async get(id: string): Promise<CacheDoc | null> { return this.col().findOne({ _id: id }); }

  async upsert(id: string, doc: CacheDoc): Promise<void> {
    const now = new Date();
    await this.col().updateOne(
      { _id: id },
      { $setOnInsert: { ...doc, stats: { ...(doc.stats || ({} as any)), createdAt: now, hits: 0 } } },
      { upsert: true }
    );
  }

  async touchHit(id: string): Promise<void> {
    await this.col().updateOne({ _id: id }, { $inc: { "stats.hits": 1 }, $set: { "stats.lastHitAt": new Date() } });
  }

  async query(params: { q?: string; provider?: string; model?: string; limit?: number; skip?: number }): Promise<{ items: QueryResultItem[]; total: number }> {
    const { q = "", provider, model, limit = 20, skip = 0 } = params;
    const sel: Record<string, unknown> = {};
    if (provider) sel.provider = provider;
    if (model) sel.model = model;
    if (q) sel.$text = { $search: q };

    const cur = this.col().find(sel).sort({ "stats.createdAt": -1 }).skip(Math.max(0, skip)).limit(Math.min(limit, 100));
    const items = await cur.project({ result: { content: 1 }, provider: 1, model: 1, stats: 1 }).toArray();
    const total = await this.col().countDocuments(sel);
    const mapped: QueryResultItem[] = (items as WithId<CacheDoc>[]).map((it) => ({
      _id: it._id,
      provider: it.provider,
      model: it.model,
      stats: it.stats,
      result: { content: it.result?.content },
      snippet: (it.result?.content || "").slice(0, 180)
    }));
    return { items: mapped, total };
  }

  async del(id: string): Promise<void> { await this.col().deleteOne({ _id: id }); }

  async close(): Promise<void> { await this.client.close(); }
}
