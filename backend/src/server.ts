import "dotenv/config";
import { file, z } from "zod";
import Fastify from "fastify";
import sensible from "@fastify/sensible";
import prismaPlugin from "./plugins/prisma";
import path from "path";
import Autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import socketIOPlugin from "./plugins/socket.io";
import { fileURLToPath } from "url";

const EnvSchema = z.object({
  PORT: z.coerce.number(),
});

const { PORT } = EnvSchema.parse(process.env);

const buildServer = () => {
  const app = Fastify();

  app.register(sensible);
  app.register(prismaPlugin);
  app.register(socketIOPlugin);
  app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  app.register(Autoload, {
    dir: path.join(__dirname, "routes"),
    options: { prefix: "" },
  });

  return app;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

buildServer()
  .listen({ port: PORT })
  .then(() => {
    console.log(`API Server is listening on port ${PORT}!`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
