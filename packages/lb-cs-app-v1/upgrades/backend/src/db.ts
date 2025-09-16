import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const MarkdownSchema = new Schema({
  categoria: { type: String, required: true, index: true },
  nome: { type: String, required: true, index: true },
  contenuto: { type: String, required: true },
  data: { type: Date, required: true },
  versione: { type: Number, required: true }
}, { collection: "markdowns" });

MarkdownSchema.index({ categoria: 1, nome: 1, versione: -1 }, { unique: true });
MarkdownSchema.index({ categoria: 1, nome: 1 });

export type MarkdownDoc = InferSchemaType<typeof MarkdownSchema>;
export interface MarkdownModel extends Model<MarkdownDoc> {}

let MarkdownModelRef: MarkdownModel | null = null;

export async function connectDB(mongoUri: string): Promise<typeof mongoose> {
  if (mongoose.connection.readyState === 1) return mongoose;
  return mongoose.connect(mongoUri);
}

export function getMarkdownModel(): MarkdownModel {
  if (!MarkdownModelRef) {
    MarkdownModelRef = mongoose.model<MarkdownDoc, MarkdownModel>("Markdown", MarkdownSchema);
  }
  return MarkdownModelRef;
}
