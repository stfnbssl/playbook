import { connectMongo, MarkdownModel, IMarkdownDoc } from "@/db";

type SeedItem = Omit<IMarkdownDoc, "_id">;

async function run() {
  await connectMongo();
  await MarkdownModel.deleteMany({}).exec();

  const now = new Date();
  const add = (min: number) => new Date(now.getTime() + min * 60000);

  const docs: SeedItem[] = [];

  for (const nome of ["installazione", "configurazione", "troubleshooting"]) {
    docs.push(
      { categoria: "guides", nome, contenuto: `# ${nome} v1\nContenuto...`, data: add(1), versione: 1 },
      { categoria: "guides", nome, contenuto: `# ${nome} v2\nContenuto...`, data: add(2), versione: 2 },
      { categoria: "guides", nome, contenuto: `# ${nome} v3\nContenuto...`, data: add(3), versione: 3 },
    );
  }

  for (const nome of ["mensile", "trimestrale", "annuale"]) {
    docs.push(
      { categoria: "reports", nome, contenuto: `# ${nome} v1\nContenuto...`, data: add(4), versione: 1 },
      { categoria: "reports", nome, contenuto: `# ${nome} v2\nContenuto...`, data: add(5), versione: 2 },
    );
  }

  await MarkdownModel.insertMany(docs);
  console.log(`Seed completato: ${docs.length} documenti.`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
