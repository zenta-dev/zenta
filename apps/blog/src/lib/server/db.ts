import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { dev } from "../config";

const prismaClientSingleton = () => {
  if (dev) {
    const client = new PrismaClient();
    // const client = new PrismaClient();

    return client;
  } else {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const client = new PrismaClient({ adapter });
    // const client = new PrismaClient();

    return client;
  }
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

if (dev) globalThis.prismaGlobal = prisma;
