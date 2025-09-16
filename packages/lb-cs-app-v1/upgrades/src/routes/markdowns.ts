import { Router, Request, Response } from "express";
import { MarkdownModel } from "@/db";

const router = Router();

router.get("/categories", async (_req: Request, res: Response) => {
  const categories = await MarkdownModel.distinct("categoria").exec();
  res.json(categories.sort());
});

router.get("/markdowns", async (req: Request, res: Response) => {
  const category = (req.query.category as string) || "";
  if (!category) return res.status(400).json({ error: "Parametro 'category' obbligatorio" });

  const pipeline = [
    { $match: { categoria: category } },
    { $sort: { versione: -1 } },
    {
      $group: {
        _id: "$nome",
        ultimaVersione: { $first: "$versione" },
        dataUltimaVersione: { $first: "$data" }
      }
    },
    { $project: { _id: 0, nome: "$_id", ultimaVersione: 1, dataUltimaVersione: 1 } },
    { $sort: { nome: 1 } }
  ] as const;

  const results = await MarkdownModel.aggregate(pipeline).exec();
  res.json(results);
});

router.get("/markdowns/:nome/versions", async (req: Request, res: Response) => {
  const category = (req.query.category as string) || "";
  const nome = req.params.nome;
  if (!category) return res.status(400).json({ error: "Parametro 'category' obbligatorio" });

  const docs = await MarkdownModel
    .find({ categoria: category, nome }, { _id: 0, versione: 1, data: 1 })
    .sort({ versione: -1 })
    .lean()
    .exec();

  res.json(docs.map(d => ({ versione: d.versione, data: d.data })));
});

router.get("/markdowns/:nome", async (req: Request, res: Response) => {
  const category = (req.query.category as string) || "";
  const nome = req.params.nome;
  const versionParam = req.query.version as string | undefined;

  if (!category) return res.status(400).json({ error: "Parametro 'category' obbligatorio" });

  let doc;
  if (versionParam) {
    const versione = Number(versionParam);
    if (Number.isNaN(versione)) return res.status(400).json({ error: "version deve essere un numero" });
    doc = await MarkdownModel.findOne({ categoria: category, nome, versione }).lean().exec();
  } else {
    doc = await MarkdownModel.findOne({ categoria: category, nome }).sort({ versione: -1 }).lean().exec();
  }

  if (!doc) return res.status(404).json({ error: "Documento non trovato" });
  res.json({
    categoria: doc.categoria,
    nome: doc.nome,
    contenuto: doc.contenuto,
    data: doc.data,
    versione: doc.versione
  });
});

export default router;
