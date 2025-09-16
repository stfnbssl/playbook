// domains/messages/api.js
const express = require('express');
const { ObjectId } = require('mongodb');

const STATUS = new Set(['inserito','esame in corso','approvato','rifiutato','annullato']);

function toId(id){ try{ return new ObjectId(id); } catch(e){ return null; } }
function normalize(doc){ return { ...doc, _id: String(doc._id) }; }

module.exports = function buildMessagesApi(db) {
  const col = db.collection('messages');

  // --- PUBLIC: GET list & detail ---
  const publicRouter = express.Router();
  publicRouter.get('/', async (req, res, next) => {
    try{
      const list = await col.find({}).sort({ _id: -1 }).limit(200).toArray();
      res.json(list.map(normalize));
    }catch(err){ next(err); }
  });
  publicRouter.get('/:id', async (req, res, next) => {
    try{
      const _id = toId(req.params.id);
      if(!_id) return res.status(400).json({ error: 'invalid id' });
      const doc = await col.findOne({ _id });
      if (!doc) return res.status(404).json({ error: 'not found' });
      res.json(normalize(doc));
    }catch(err){ next(err); }
  });

  // --- PROTECTED: POST/PUT/DELETE ---
  const protectedRouter = express.Router();
  protectedRouter.use(express.json());

  protectedRouter.post('/', async (req, res, next) => {
    try{
      const { text = '', status = 'inserito', notes = '' } = req.body || {};
      if (!text.trim()) return res.status(400).json({ error: 'text required' });
      if (!STATUS.has(status)) return res.status(400).json({ error: 'invalid status' });
      const doc = {
        userid: req.session.userId,
        datetime: new Date(),
        text: String(text),
        status,
        notes: String(notes||'')
      };
      const { insertedId } = await col.insertOne(doc);
      res.status(201).json({ _id: String(insertedId), ...doc });
    }catch(err){ next(err); }
  });

  protectedRouter.put('/:id', async (req, res, next) => {
    try{
      const _id = toId(req.params.id);
      if(!_id) return res.status(400).json({ error: 'invalid id' });
      const { text, status, notes } = req.body || {};
      const update = {};
      if (typeof text === 'string') update.text = text;
      if (typeof notes === 'string') update.notes = notes;
      if (typeof status === 'string') {
        if (!STATUS.has(status)) return res.status(400).json({ error: 'invalid status' });
        update.status = status;
      }
      if (!Object.keys(update).length) return res.status(400).json({ error: 'no fields' });
      update.lastUpdatedAt = new Date();
      update.lastUpdatedBy = req.session.userId;

      const r = await col.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
      if (!r.value) return res.status(404).json({ error: 'not found' });
      res.json(normalize(r.value));
    }catch(err){ next(err); }
  });

  protectedRouter.delete('/:id', async (req, res, next) => {
    try{
      const _id = toId(req.params.id);
      if(!_id) return res.status(400).json({ error: 'invalid id' });
      const r = await col.deleteOne({ _id });
      if (!r.deletedCount) return res.status(404).json({ error: 'not found' });
      res.json({ ok: true });
    }catch(err){ next(err); }
  });

  return { public: publicRouter, protected: protectedRouter };
}
