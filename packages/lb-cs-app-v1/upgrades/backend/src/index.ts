import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes/markdowns";
import { connectDB } from "./db";

const PORT = Number(process.env.PORT || 3001);
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/lbcyber";
const fastify = Fastify({ logger: true });

async function start() {
  await fastify.register(cors, { origin: true });
  await connectDB(MONGODB_URI);
  await fastify.register(routes);

  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`API listening on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
