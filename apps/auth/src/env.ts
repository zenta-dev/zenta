import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const dev = process.env.NODE_ENV === "development";

export const env = createEnv({
  server: {
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,

    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: dev
      ? "https://zenta.local:3000"
      : process.env.NEXT_PUBLIC_APP_URL,
  },

  emptyStringAsUndefined: true,
});
