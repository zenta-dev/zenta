import { env } from "@packages/env";

export const dev = process.env.NODE_ENV === "development";

export const defaultLayout = [10, 25, 65];

const url =
  (env.NEXT_PUBLIC_BLOG_APP_URL || "https://zenta.local:3003") + "/api";

export const baseUrl = dev ? "https://zenta.local:3003" : url;
