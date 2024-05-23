import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const dev = process.env.NODE_ENV === "development";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().url(),
  },
  client: {},

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  },

  emptyStringAsUndefined: true,
});
