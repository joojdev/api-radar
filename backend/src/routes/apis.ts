import { FastifyPluginAsync } from "fastify";
import { z } from 'zod';
import { Prisma } from "../../generated/prisma";

const CreateApiSchema = z.object({
  domain: z.url('Invalid domain URL!'),
  endpoint: z.string().regex(/^\/[A-Za-z0-9_\-\/]*$/, "Endpoint must start with '/' and contain only letters, numbers, '-', '_' or '/'."),
  accessInterval: z.coerce.number()
});

const apisRoutes: FastifyPluginAsync = async (app) => {
  app.get("/apis", async () => {
    return app.prisma.api.findMany();
  });

  app.post("/api", async (request, response) => {
    const parsed = CreateApiSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.badRequest(parsed.error.message);
    }

    try {
      const api = await app.prisma.api.create({
        data: parsed.data
      });

      return response.code(201).send(api);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return response.badRequest('There is an API with that domain and endpoint already.');
      }
      throw error;
    }
  });
};

export default apisRoutes;
