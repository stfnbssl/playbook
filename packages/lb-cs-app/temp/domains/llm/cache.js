const { MongoClient } = require('mongodb');

class Cache {
  constructor(uri){
    this.client = new MongoClient(uri, { ignoreUndefined: true });
    this.db = null;
  }
  async init(){
    if (!this.db){
      await this.client.connect();
      this.db = this.client.db();
      const col = this.col();
      await col.createIndex({ 'stats.createdAt': -1 });
      await col.createIndex({ provider: 1, model: 1 });
    }
  }
  col(){ return this.db.collection('llm_cache'); }
  async get(id){ return this.col().findOne({ _id: id }); }
  async upsert(id, doc){
    const now = new Date();
    await this.col().updateOne(
      { _id: id },
      { $setOnInsert: { ...doc, stats: { ...(doc.stats||{}), createdAt: now, hits: 0 } } },
      { upsert: true }
    );
  }
  async touchHit(id){
    await this.col().updateOne({ _id: id }, { $inc: { 'stats.hits': 1 }, $set: { 'stats.lastHitAt': new Date() } });
  }
  async query({ q = '', provider, model, limit = 20, skip = 0 }){
    const sel = {};
    if (provider) sel.provider = provider;
    if (model) sel.model = model;
    if (q) sel.$text = { $search: q };
    const cur = this.col().find(sel).sort({ 'stats.createdAt': -1 }).skip(skip).limit(limit);
    const items = await cur.project({ result: { content: 1 }, provider:1, model:1, stats:1 }).toArray();
    const total = await this.col().countDocuments(sel);
    return { items: items.map(it=>({ ...it, snippet: it.result?.content?.slice(0, 180) })), total };
  }
  async del(id){ await this.col().deleteOne({ _id: id }); }
  async close(){ await this.client.close(); }
}

module.exports = { Cache };
