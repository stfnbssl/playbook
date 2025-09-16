import mongoose, { Schema, Model } from "mongoose";

export interface IMarkdownDoc {
  categoria: string;
  nome: string;
  contenuto: string;
  data: Date;
  versione: number;
}

const MarkdownSchema = new Schema<IMarkdownDoc>(
  {
    categoria: { type: String, required: true, index: true },
    nome: { type: String, required: true, index: true },
    contenuto: { type: String, required: true },
    data: { type: Date, required: true },
    versione: { type: Number, required: true }
  },
  { collection: "markdowns" }
);

MarkdownSchema.index({ categoria: 1, nome: 1, versione: -1 }, { unique: true });
MarkdownSchema.index({ categoria: 1, nome: 1 });

export type MarkdownModelType = Model<IMarkdownDoc>;
export const MarkdownModel = (mongoose.models.Markdown as MarkdownModelType) || mongoose.model<IMarkdownDoc>("Markdown", MarkdownSchema);

export async function connectMongo(uri?: string): Promise<typeof mongoose> {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI non impostata");
  }
  if (mongoose.connection.readyState === 1) return mongoose;
  return mongoose.connect(mongoUri);
}
