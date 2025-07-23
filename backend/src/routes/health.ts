import { FastifyPluginAsync } from "fastify";

const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", () => ({ ok: true }));
};

export default healthRoutes;
