const fetch = require('node-fetch');

async function callDeepseek({ model, messages, params = {}, timeoutMs = 45000 }){
  const ctrl = new AbortController();
  const t = setTimeout(()=>ctrl.abort(), timeoutMs);
  try{
    const r = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}` },
      body: JSON.stringify({ model, messages, temperature: params.temperature, top_p: params.top_p, max_tokens: params.max_tokens }),
      signal: ctrl.signal
    });
    if (!r.ok){
      const text = await r.text();
      throw new Error(`deepseek ${r.status}: ${text}`);
    }
    const j = await r.json();
    const content = j.choices?.[0]?.message?.content || '';
    const usage = j.usage || {};
    return { content, info: { tokens: { in: usage.prompt_tokens, out: usage.completion_tokens, total: usage.total_tokens } }, raw: j };
  } finally { clearTimeout(t); }
}

module.exports = { callDeepseek };
