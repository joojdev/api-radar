import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { Api, Prisma } from "../../generated/prisma";

enum Protocol {
  HTTP = "http",
  HTTPS = "https",
}

const CreateApiSchema = z.object({
  name: z.string().nonempty(),
  protocol: z.enum(Protocol),
  domain: z
    .string()
    .regex(
      /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/,
      "Must be a valid domain.",
    ),
  endpoint: z
    .string()
    .regex(
      /^\/[A-Za-z0-9_\-\/]*$/,
      "Endpoint must start with '/' and contain only letters, numbers, '-', '_' or '/'.",
    ),
  accessInterval: z.coerce.number(),
});

const DeleteApiSchema = z.object({
  apiId: z.coerce.number()
});

const EditApiSchema = z.object({
  id: z.coerce.number(),
  protocol: z.enum(Protocol),
  domain: z
    .string()
    .regex(
      /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/,
      "Must be a valid domain.",
    ),
  endpoint: z
    .string()
    .regex(
      /^\/[A-Za-z0-9_\-\/]*$/,
      "Endpoint must start with '/' and contain only letters, numbers, '-', '_' or '/'.",
    ),
  accessInterval: z.coerce.number(),
  name: z.string().nonempty()
});

const apisRoutes: FastifyPluginAsync = async (app) => {
  app.get("/apis", async () => {
    return app.prisma.api.findMany();
  });

  app.post("/api", async (request, response) => {
    const parsed = CreateApiSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.badRequest(parsed.error.issues.map((error) => error.message).join('\n'));
    }

    try {
      const api = await app.prisma.api.create({
        data: parsed.data,
      });

      return response.code(201).send(api);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return response.badRequest(
          "There is an API with that protocol, domain and endpoint already.",
        );
      }
      throw error;
    }
  });

  app.delete('/api/:apiId', async (request, response) => {
    const parsed = DeleteApiSchema.safeParse(request.params);

    if (!parsed.success) {
      return response.badRequest(parsed.error.issues.map((error) => error.message).join('\n'));
    }

    try {
      await app.prisma.api.delete({
        where: {
          id: parsed.data.apiId
        }
      });

      return response.code(200).send(true);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return response.notFound('API not found.');
      }

      app.log.error(error, 'Unexpected error while deleting API');
      return response.internalServerError('An unexpected error occurred.');
    }
  });

  app.put('/api', async (request, response) => {
    const parsed = EditApiSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.badRequest(parsed.error.issues.map((error) => error.message).join('\n'));
    }

    try {
      const api: Api = await app.prisma.api.update({
        data: parsed.data,
        where: {
          id: parsed.data.id
        }
      });

      return response.code(200).send(api);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          return response.badRequest(
            "There is an API with that protocol, domain and endpoint already."
          );
        }
        if (error.code === 'P2025') {
          return response.notFound("API not found.");
        }
      }

      app.log.error(error, 'Unexpected error while updating API');
      return response.internalServerError('An unexpected error occurred.');
    }
  });
};

export default apisRoutes;
