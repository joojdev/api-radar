import "dotenv/config";
import { z } from "zod";
import Fastify from "fastify";
import sensible from "@fastify/sensible";
import prismaPlugin from "./plugins/prisma";
import path from "path";
import Autoload from "@fastify/autoload";

const EnvSchema = z.object({
  PORT: z.coerce.number(),
});

const { PORT } = EnvSchema.parse(process.env);

const buildServer = () => {
  const app = Fastify();

  app.register(sensible);
  app.register(prismaPlugin);

  app.register(Autoload, {
    dir: path.join(__dirname, "routes"),
    options: { prefix: "" },
  });

  return app;
};

if (require.main === module) {
  buildServer()
    .listen({ port: PORT })
    .then(() => {
      console.log(`API Server is listening on port ${PORT}!`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
