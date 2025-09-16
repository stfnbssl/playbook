const express = require('express');
const requireAuth = require('../../middleware/requireAuth');
const { Cache } = require('./cache');
const { hashFor } = require('./hash');
const { callOpenAI } = require('./providers/openai');
const { callGrok } = require('./providers/grok');
const { callDeepseek } = require('./providers/deepseek');

const router = express.Router();

function assertBody(b){
  if (!b || !b.provider || !b.model || !Array.isArray(b.messages)){
    const e = new Error('invalid body'); e.status = 400; throw e;
  }
}

function pickProvider(p){
  if (p === 'openai') return callOpenAI;
  if (p === 'grok') return callGrok;
  if (p === 'deepseek') return callDeepseek;
  const e = new Error('invalid provider'); e.status = 400; throw e;
}

// Chat endpoint (requires login to call external LLMs)
router.post('/chat', requireAuth, async (req, res) => {
  const cache = new Cache(process.env.MONGODB_URI);
  await cache.init();
  try {
    assertBody(req.body);
    const { provider, model, messages, params = {} } = req.body;
    const timeoutMs = Number(process.env.LLM_TIMEOUT_MS||45000);
    const id = hashFor({ provider, model, messages, params });

    // try cache first
    const existing = await cache.get(id);
    if (existing){
      await cache.touchHit(id);
      return res.json({ result: { content: existing.result?.content || '' }, info: {
        cached: true, cacheId: id, provider: existing.provider, model: existing.model,
        createdAt: existing.stats?.createdAt, tokens: existing.stats?.providerUsage, latency_ms: 0
      }});
    }

    // call provider
    const call = pickProvider(provider);
    const t0 = Date.now();
    const out = await call({ model, messages, params, timeoutMs });
    const latency = Date.now() - t0;

    // save cache
    const doc = {
      _id: id,
      provider, model,
      input: { messages, params },
      result: { content: out.content, raw: out.raw },
      stats: { createdAt: new Date(), hits: 0, providerUsage: out.info?.tokens },
      providerMeta: { latency_ms: latency }
    };
    await cache.upsert(id, doc);

    res.json({ result: { content: out.content }, info: {
      cached: false, cacheId: id, provider, model, createdAt: doc.stats.createdAt,
      tokens: out.info?.tokens, latency_ms: latency
    }});
  } catch (err){
    const status = err.status || 500;
    const body = status === 500 ? { error: 'internal', message: err.message } : { error: 'invalid request', message: err.message };
    res.status(status).json(body);
  } finally {
    await cache.close();
  }
});

// Cache list (public read per Master note; keep simple)
router.get('/cache', async (req, res) => {
  const cache = new Cache(process.env.MONGODB_URI);
  await cache.init();
  try {
    const { q, provider, model } = req.query;
    const limit = Math.min(Number(req.query.limit||20), 100);
    const skip = Math.max(Number(req.query.skip||0), 0);
    const data = await cache.query({ q, provider, model, limit, skip });
    res.json(data);
  } finally { await cache.close(); }
});

// Cache detail (public read)
router.get('/cache/:id', async (req, res) => {
  const cache = new Cache(process.env.MONGODB_URI);
  await cache.init();
  try {
    const it = await cache.get(req.params.id);
    if (!it) return res.status(404).json({ error: 'not found' });
    res.json(it);
  } finally { await cache.close(); }
});

// Cache delete (requires login)
router.delete('/cache/:id', requireAuth, async (req, res) => {
  const cache = new Cache(process.env.MONGODB_URI);
  await cache.init();
  try { await cache.del(req.params.id); res.json({ ok: true }); }
  finally { await cache.close(); }
});

// Warmup prompts (requires login)
router.post('/warmup', requireAuth, async (req, res) => {
  const cache = new Cache(process.env.MONGODB_URI);
  await cache.init();
  try {
    const arr = Array.isArray(req.body?.items) ? req.body.items : [];
    let queued = 0;
    for (const item of arr){
      if (!item || !item.provider || !item.model || !Array.isArray(item.messages)) continue;
      const id = require('./hash').hashFor({ provider: item.provider, model: item.model, messages: item.messages, params: item.params||{} });
      const exists = await cache.get(id);
      if (exists){ continue; }
      // store placeholder; a background worker could fill it later
      await cache.upsert(id, {
        _id: id,
        provider: item.provider, model: item.model,
        input: { messages: item.messages, params: item.params||{} },
        result: { content: '', raw: null },
        stats: { createdAt: new Date(), hits: 0 },
        providerMeta: { warmup: true }
      });
      queued++;
    }
    res.json({ queued });
  } catch (err){
    res.status(400).json({ error: 'invalid request', message: String(err) });
  } finally { await cache.close(); }
});

module.exports = router;
