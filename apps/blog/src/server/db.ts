import { env } from "@/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./generated";

const createPrismaClient = () => {
  const connectionString = `${env.DATABASE_URL}`;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool, {
    schema: "blog",
  });
  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
