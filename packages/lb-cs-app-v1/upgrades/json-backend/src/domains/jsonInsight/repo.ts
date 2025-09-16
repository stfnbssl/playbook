import { ObjectId } from "mongodb";
import { datasets, records, type DatasetDoc, type RecordDoc } from "@/db";

export async function createDataset(args: { title?: string; schema: unknown; stats: DatasetDoc["stats"]; }): Promise<ObjectId> {
  const ds: DatasetDoc = {
    _id: new ObjectId(),
    title: args.title,
    createdAt: new Date(),
    schema: args.schema,
    stats: args.stats
  };
  await datasets().insertOne(ds);
  return ds._id;
}

export async function insertRecords(datasetId: ObjectId, chunks: unknown[][]): Promise<void> {
  const docs: RecordDoc[] = chunks.map((chunk, idx) => ({
    datasetId,
    chunkIndex: idx,
    data: chunk
  }));
  if (docs.length) await records().insertMany(docs, { ordered: true });
}

export async function getDatasetMeta(id: string): Promise<DatasetDoc | null> {
  return datasets().findOne({ _id: new ObjectId(id) });
}

export async function listDatasets(limit = 50, skip = 0) {
  const cur = datasets().find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
  const items = await cur.project({ schema: 0 }).toArray();
  const total = await datasets().countDocuments({});
  return { items, total };
}

export async function getDatasetData(id: string, skip = 0, limit = 1) {
  const datasetId = new ObjectId(id);
  const cur = records().find({ datasetId }).sort({ chunkIndex: 1 }).skip(skip).limit(limit);
  const items = await cur.toArray();
  const total = await records().countDocuments({ datasetId });
  return { items, total };
}
