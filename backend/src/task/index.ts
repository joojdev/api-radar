import axios from "axios";
import { Api, PrismaClient } from "../../generated/prisma";
import cron from "node-cron";

interface ResponseMetrics {
  status: number | null;
  responseTime: number | null;
  error?: string;
}

function getFullUrl(api: Api): string {
  return `${api.protocol}://${api.domain}${api.endpoint}`;
}

async function fetchWithMetrics(url: string): Promise<ResponseMetrics> {
  const startTime = performance.now();

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
    });

    const endTime = performance.now();
    const responseTime = endTime - startTime;

    return {
      status: response.status,
      responseTime: parseFloat(responseTime.toFixed(2)),
    };
  } catch (error: any) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    return {
      status: null,
      responseTime: parseFloat(responseTime.toFixed(2)),
      error: error.message,
    };
  }
}

async function main() {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    console.log("Connected to database!");
    startCron(prisma);
  } catch (error) {
    console.error("There was an error trying to connect to database...");
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
}

function startCron(prisma: PrismaClient) {
  cron.schedule("* * * * *", async () => {
    const apis = await prisma.api.findMany();

    const currentDate = new Date();
    const currentMinute = Math.round(currentDate.getTime() / (1000 * 60));

    for await (const api of apis) {
      if (currentMinute % api.accessInterval != 0) continue;

      const data: ResponseMetrics = await fetchWithMetrics(getFullUrl(api));

      try {
        await prisma.log.create({
          data: {
            responseTime: data.responseTime ?? -1,
            statusCode: data.status ?? -1,
            apiId: api.id,
          },
        });
      } catch (error: any) {
        console.error(`[UNHANDLED ERROR] ${api.name}:`, error.message ?? error);
      }
    }
  });
}

main();
