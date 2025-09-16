// domains/items/api.js
const express = require("express");
const router = express.Router();

module.exports = function buildItemsApi(db) {
  const col = db.collection("items");

  router.get("/items", async (req, res) => {
    const list = await col.find({}).limit(100).toArray();
    res.json(list);
  });

  router.post("/items", express.json(), async (req, res) => {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ error: "name required" });
    const { insertedId } = await col.insertOne({ name, createdAt: new Date(), createdBy: req.session.userId });
    res.status(201).json({ _id: String(insertedId), name });
  });

  router.get("/items/:id", async (req, res) => {
    const { ObjectId } = require("mongodb");
    const doc = await col.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "not found" });
    res.json({ ...doc, _id: String(doc._id) });
  });

  router.delete("/items/:id", async (req, res) => {
    const { ObjectId } = require("mongodb");
    const r = await col.deleteOne({ _id: new ObjectId(req.params.id) });
    if (!r.deletedCount) return res.status(404).json({ error: "not found" });
    res.json({ ok: true });
  });

  return router;
};
