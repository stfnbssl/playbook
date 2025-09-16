import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectMongo } from "@/db";
import jsonInsightRouter from "@/domains/jsonInsight/api";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/json", jsonInsightRouter);

const PORT = Number(process.env.PORT || 3001);
connectMongo().then(() => {
  app.listen(PORT, () => console.log(`JSON Insight in ascolto su http://localhost:${PORT}`));
}).catch((e) => {
  console.error("MongoDB connection error:", e);
  process.exit(1);
});
