const crypto = require('crypto');

function canonicalize(input){
  function clean(o){
    if (o === null || o === undefined) return undefined;
    if (Array.isArray(o)) return o.map(clean);
    if (typeof o === 'object'){
      const out = {};
      Object.keys(o).sort().forEach(k=>{
        const v = clean(o[k]);
        if (v !== undefined && v !== '' && !(typeof v === 'number' && Number.isNaN(v))) out[k] = v;
      });
      return out;
    }
    if (typeof o === 'number') return Math.round(o * 1e6) / 1e6;
    return o;
  }
  return clean(input);
}

function hashFor({ provider, model, messages = [], params = {} }){
  const canonical = canonicalize({ provider, model, messages, params });
  const json = JSON.stringify(canonical);
  return crypto.createHash('sha256').update(json).digest('hex');
}

module.exports = { hashFor, canonicalize };
