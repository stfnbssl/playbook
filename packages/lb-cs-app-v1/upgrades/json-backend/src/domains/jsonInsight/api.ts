import { Router, Request, Response } from "express";
import { connectMongo } from "@/db";
import { inferSchema, refineSchemaWithLLM } from "@/domains/jsonInsight/inference";
import { createDataset, insertRecords, getDatasetMeta, getDatasetData, listDatasets } from "@/domains/jsonInsight/repo";

const router = Router();

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

router.post("/ingest", async (req: Request, res: Response) => {
  await connectMongo();
  try {
    const payload = req.body;
    if (payload == null) return res.status(400).json({ error: "body required" });

    const items = Array.isArray(payload) ? payload : [payload];
    if (items.length === 0) return res.status(400).json({ error: "empty payload" });

    const inferred = inferSchema(items as unknown[]);
    const stats = { count: items.length, paths: inferred.fields.map(f => ({ path: f.path, types: f.types })) };

    const llmEnabled = process.env.USE_LLM_SCHEMA === "1";
    const llmBase = process.env.LLM_BASE_URL;
    const llmKey = process.env.ADMIN_KEY;
    const llmSummary = await refineSchemaWithLLM(items as unknown[], inferred, { enabled: llmEnabled, baseUrl: llmBase, apiKey: llmKey });

    const schema = { engine: "local", inferred, llm: llmSummary ? { summary: llmSummary } : undefined };

    const dsId = await createDataset({ schema, stats, title: undefined });
    const chunkSize = Number(process.env.INGEST_CHUNK_SIZE || 1000);
    const chunks = chunk(items, chunkSize);
    await insertRecords(dsId, chunks);

    res.json({ datasetId: String(dsId) });
  } catch (e) {
    res.status(500).json({ error: "internal", message: (e as Error).message });
  }
});

router.get("/datasets/:id/meta", async (req: Request, res: Response) => {
  await connectMongo();
  const ds = await getDatasetMeta(req.params.id);
  if (!ds) return res.status(404).json({ error: "not found" });
  res.json(ds);
});

router.get("/datasets/:id/data", async (req: Request, res: Response) => {
  await connectMongo();
  const skip = Math.max(0, Number(req.query.skip || 0));
  const limit = Math.min(50, Math.max(1, Number(req.query.limit || 1)));
  const data = await getDatasetData(req.params.id, skip, limit);
  res.json(data);
});

router.get("/datasets/:id/prompt", async (req: Request, res: Response) => {
  await connectMongo();
  const ds = await getDatasetMeta(req.params.id);
  if (!ds) return res.status(404).json({ error: "not found" });
  const prompt = `You are given a dataset stored in MongoDB. Produce a single-file HTML (no external deps) that renders a readable table and summary.
Dataset metadata: ${JSON.stringify({ _id: ds._id, stats: ds.stats }).slice(0, 1000)}
Schema (inferred): ${JSON.stringify(ds.schema).slice(0, 2000)}
Guidelines:
- Provide light CSS in a <style> tag.
- For large datasets, show a header, a summary block and the first 100 rows.
- Do not make external HTTP calls.
Return only HTML content.`;
  res.type("text/plain").send(prompt);
});

router.get("/datasets", async (req: Request, res: Response) => {
  await connectMongo();
  const skip = Math.max(0, Number(req.query.skip || 0));
  const limit = Math.min(100, Math.max(1, Number(req.query.limit || 20)));
  const data = await listDatasets(limit, skip);
  res.json(data);
});

export default router;
