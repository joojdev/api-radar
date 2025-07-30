import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { Log } from "../../generated/prisma";

const SelectLogsSchema = z.object({
  apiId: z.coerce.number(),
});

const logsRoutes: FastifyPluginAsync = async (app) => {
  app.get("/logs/:apiId", (request, response) => {
    const parsed = SelectLogsSchema.safeParse(request.params);

    if (!parsed.success)
      return response.badRequest(
        'Invalid parameter. "apiId" must be a number.',
      );

    return app.prisma.log.findMany({
      where: {
        apiId: parsed.data.apiId,
      },
      orderBy: {
        timestamp: "asc",
      },
    });
  });

  app.get("/log/last/:apiId", async (request, response) => {
    const parsed = SelectLogsSchema.safeParse(request.params);

    if (!parsed.success)
      return response.badRequest(
        'Invalid parameter. "apiId" must be a number.',
      );

    const logs: Log[] = await app.prisma.log.findMany({
      where: {
        apiId: parsed.data.apiId,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    if (!logs) return response.notFound("This API doesn't have any log!");
    return logs[0];
  });
};

export default logsRoutes;
