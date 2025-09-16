
async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/lbcyber";
  await connectDB(uri);
  const Markdown = getMarkdownModel();

  await Markdown.deleteMany({}).exec();

  const now = new Date();
  const docs = [
    { categoria: "guides", nome: "installazione", versione: 1, data: new Date(now.getTime() - 86400e3*15), contenuto: "# Installazione v1\nPassi base..." },
    { categoria: "guides", nome: "installazione", versione: 2, data: new Date(now.getTime() - 86400e3*7), contenuto: "# Installazione v2\nAggiornamenti..." },
    { categoria: "guides", nome: "installazione", versione: 3, data: new Date(now.getTime() - 86400e3*1), contenuto: "# Titolo\nContenuto..." },
    { categoria: "guides", nome: "configurazione", versione: 1, data: new Date(now.getTime() - 86400e3*10), contenuto: "# Config v1\nDettagli..." },
    { categoria: "guides", nome: "configurazione", versione: 2, data: new Date(now.getTime() - 86400e3*3), contenuto: "# Config v2\nDettagli..." },
    { categoria: "guides", nome: "troubleshooting", versione: 1, data: new Date(now.getTime() - 86400e3*20), contenuto: "# Troubleshooting\n..." },
    { categoria: "guides", nome: "troubleshooting", versione: 2, data: new Date(now.getTime() - 86400e3*2), contenuto: "# Troubleshooting v2\n..." },
    { categoria: "reports", nome: "q2-2025", versione: 1, data: new Date(now.getTime() - 86400e3*60), contenuto: "# Report Q2 v1\n..." },
    { categoria: "reports", nome: "q2-2025", versione: 2, data: new Date(now.getTime() - 86400e3*30), contenuto: "# Report Q2 v2\n..." },
    { categoria: "reports", nome: "q3-2025", versione: 1, data: new Date(now.getTime() - 86400e3*5), contenuto: "# Report Q3 v1\n..." },
    { categoria: "reports", nome: "q1-2025", versione: 1, data: new Date(now.getTime() - 86400e3*90), contenuto: "# Report Q1 v1\n..." }
  ];

  await Markdown.insertMany(docs);
  console.log("Seed completed.");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
