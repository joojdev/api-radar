import "dotenv/config";
import axios from "axios";
import { Api, PrismaClient } from "../../generated/prisma";
import schedule from "node-schedule";
import { performance } from "perf_hooks";

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
  console.log(`Starting to request "${url}"...`);

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
  } finally {
    console.log(`Finished requesting "${url}"!`);
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
    await prisma.$disconnect();
    process.exit(1);
  }

  process.on("SIGINT", async () => {
    console.log("Gracefully shutting down...");
    await prisma.$disconnect();
    process.exit(0);
  });
}

let isRunning: boolean = false;

function startCron(prisma: PrismaClient) {
  schedule.scheduleJob("* * * * *", async () => {
    console.log("Starting scheduled job.");
    if (isRunning) return console.log("Previous job still running.");
    isRunning = true;

    const apis = await prisma.api.findMany();

    const currentDate = new Date();
    const currentMinute = Math.round(currentDate.getTime() / (1000 * 60));

    const tasks = apis
      .filter((api) => api.running && currentMinute % api.accessInterval == 0)
      .map(async (api) => {
        const data = await fetchWithMetrics(getFullUrl(api));

        try {
          await prisma.log.create({
            data: {
              responseTime: data.responseTime ?? -1,
              statusCode: data.status ?? -1,
              apiId: api.id,
            },
          });
        } catch (error: any) {
          console.error(
            `[UNHANDLED ERROR] ${api.name}:`,
            error.message ?? error,
          );
        }
      });

    try {
      await Promise.allSettled(tasks);
    } finally {
      isRunning = false;
      console.log("Scheduled job finished.");
    }
  });
}

main();
