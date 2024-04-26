import { env } from "@packages/env";

export const dev = process.env.NODE_ENV === "development";

export const defaultLayout = [10, 25, 65];

const url =
  ( env.NEXT_PUBLIC_STUDIO_APP_URL || "http://localhost:3000") + "/api";

export const baseUrl = dev ? "http://localhost:3000/api" : url;
