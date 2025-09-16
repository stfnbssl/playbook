import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectMongo } from "./db";
import { connectNativeMongo } from "./db-native";
import markdownsRouter from "@/routes/markdowns";
import llmRouter from "@/domains/llm/api";
import jsonRouter from "@/domains/jsonInsight/api";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", markdownsRouter);
app.use("/api/llm", llmRouter);
app.use("/api/json", jsonRouter);

const PORT = Number(process.env.PORT || 3000);

connectMongo()
  .then(() => {
    connectNativeMongo()
      .then(() => {
        app.listen(PORT, () => console.log(`API su http://localhost:${PORT}`));
      })
  })
  .catch((err) => {
    console.error("Errore connessione MongoDB:", err);
    process.exit(1);
  });
  
