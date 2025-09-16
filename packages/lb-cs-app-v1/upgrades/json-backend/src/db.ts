import { MongoClient, Db, Collection, ObjectId } from "mongodb";

export interface DatasetDoc {
  _id: ObjectId;
  title?: string;
  createdAt: Date;
  stats: {
    count: number;
    paths: Array<{ path: string; types: string[] }>;
  };
  schema: unknown;
}

export interface RecordDoc {
  datasetId: ObjectId;
  chunkIndex: number;
  data: unknown[];
}

export interface ViewDoc {
  _id: ObjectId;
  datasetId: ObjectId;
  title: string;
  path: string;
  createdAt: Date;
}

let client: MongoClient | null = null;
let _db: Db | null = null;

export async function connectMongo(uri?: string): Promise<Db> {
  if (_db) return _db;
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI non impostata");
  client = new MongoClient(mongoUri, { ignoreUndefined: true });
  await client.connect();
  _db = client.db();

  await records().createIndex({ datasetId: 1, chunkIndex: 1 });
  const ttl = process.env.DATASET_TTL_SECONDS ? Number(process.env.DATASET_TTL_SECONDS) : 0;
  if (ttl > 0) {
    try { await datasets().createIndex({ createdAt: 1 }, { expireAfterSeconds: ttl }); } catch {}
  }
  return _db;
}

export function datasets(): Collection<DatasetDoc> {
  if (!_db) throw new Error("DB non inizializzato");
  return _db.collection<DatasetDoc>("datasets");
}
export function records(): Collection<RecordDoc> {
  if (!_db) throw new Error("DB non inizializzato");
  return _db.collection<RecordDoc>("records");
}
export function views(): Collection<ViewDoc> {
  if (!_db) throw new Error("DB non inizializzato");
  return _db.collection<ViewDoc>("views");
}

export { ObjectId };
