import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { Log } from "../../generated/prisma";

const SelectLogsSchema = z.object({
  apiId: z.uuidv4(),
});

const SelectByTimestampSchema = z.object({
  apiId: z.uuidv4(),
  timestamp: z.coerce.number().transform((value) => new Date(value)),
});

const logsRoutes: FastifyPluginAsync = async (app) => {
  app.get("/logs/:apiId", (request, response) => {
    const parsed = SelectLogsSchema.safeParse(request.params);

    if (!parsed.success)
      return response.badRequest('Invalid parameter. "apiId" must be an UUID.');

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
      return response.badRequest('Invalid parameter. "apiId" must be an UUID.');

    const log: Log | null = await app.prisma.log.findFirst({
      where: {
        apiId: parsed.data.apiId,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    if (!log) return response.notFound("No Logs found yet.");
    return log;
  });

  app.get("/logs/since/:apiId/:timestamp", async (request, response) => {
    const parsed = SelectByTimestampSchema.safeParse(request.params);

    if (!parsed.success)
      return response.badRequest(
        'Invalid parameters. "apiId" and "timestamp" must be UUID and number, respectively.',
      );

    const logs: Log[] = await app.prisma.log.findMany({
      where: {
        apiId: parsed.data.apiId,
        timestamp: {
          gt: parsed.data.timestamp,
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    if (!logs.length) return response.notFound("No Logs found yet.");
    return response.code(200).send(logs);
  });
};

export default logsRoutes;
