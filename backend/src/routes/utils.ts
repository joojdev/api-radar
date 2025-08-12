import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { Log } from "../../generated/prisma";

const LogIDListSchema = z.array(z.coerce.number());

const utilsRoutes: FastifyPluginAsync = async (app) => {
  app.post("/updateCharts", async (request, response) => {
    const parsed = LogIDListSchema.safeParse(request.body);

    if (!parsed.success)
      return response.badRequest("Expected input: number list");

    const idList = parsed.data;

    for (let index = 0; index < idList.length; index++) {
      const id = idList[index];

      const log: Log | null = await app.prisma.log.findUnique({
        where: {
          id,
        },
      });

      if (!log) continue;
      app.io.to(`api_${log.apiId}`).emit("data", log);
    }

    return response
      .code(200)
      .send({ success: true, message: "Charts updated successfully!" });
  });
};

export default utilsRoutes;
