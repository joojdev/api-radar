import { PrismaClient } from "../../generated/prisma";

(async () => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  await prisma.api.createMany({
    data: [
      {
        name: "OpenAI API",
        domain: "api.openai.com",
        endpoint: "/",
        protocol: "https",
        accessInterval: 5,
      },
      {
        name: "Google No Content",
        domain: "www.google.com",
        endpoint: "/generate_204",
        protocol: "https",
        accessInterval: 10,
      },
      {
        name: "AWS IP Ranges",
        domain: "ip-ranges.amazonaws.com",
        endpoint: "/ip-ranges.json",
        protocol: "https",
        accessInterval: 20,
      },
    ],
  });

  await prisma.$disconnect();
})();
