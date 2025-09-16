// server.js
require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cookieSession = require("cookie-session");
const { sessionMiddleware } = require('./config/session');
const { loadUsersFromEnv } = require("./config/users");
const mountRoutes = require("./routes/index");
const authRoutes = require('./routes/auth');  // API
const webRoutes  = require('./routes/web');   // pagine UI

const app = express();
const PORT = process.env.PORT || 3000;

async function start() {
  // Validazione ENV
  loadUsersFromEnv(); // lancia errore se mancano variabili
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  const maxDays = parseInt(process.env.SESSION_MAX_AGE_DAYS || "7", 10);

  // Sessione cookie
  app.use(cookieSession({
    name: "sid",
    secret: process.env.SESSION_SECRET || "dev-secret",
    maxAge: maxDays * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  }));

  // Parser per form login
  app.use(express.urlencoded({ extended: false }));

  // DB
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();

  // Statici pubblici (landing & assets)
  app.use(express.static("public"));

  // Rotte
  mountRoutes(app, db);

  // Error handler: restituisce dettagli utili in test
  app.use((err, req, res, next) => {
    console.error(err);
    const body = { error: 'internal', message: err.message };
    if (process.env.NODE_ENV !== 'production') body.stack = err.stack;
    res.status(500).json(body);
  });

  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
