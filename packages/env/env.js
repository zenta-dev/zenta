import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_JWT_SECRET: z.string(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_AUTH_APP_URL: z.string(),
    NEXT_PUBLIC_BLOG_APP_URL: z.string(),
    NEXT_PUBLIC_CV_APP_URL: z.string(),
    NEXT_PUBLIC_AUTH_APP_NAME: z.string(),
    NEXT_PUBLIC_BLOG_APP_NAME: z.string(),
    NEXT_PUBLIC_CV_APP_NAME: z.string(),

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_JWT_SECRET: process.env.NEXTAUTH_JWT_SECRET,

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

    NEXT_PUBLIC_AUTH_APP_URL: process.env.NEXT_PUBLIC_AUTH_APP_URL,
    NEXT_PUBLIC_BLOG_APP_URL: process.env.NEXT_PUBLIC_BLOG_APP_URL,
    NEXT_PUBLIC_CV_APP_URL: process.env.NEXT_PUBLIC_CV_APP_URL,
    NEXT_PUBLIC_AUTH_APP_NAME: process.env.NEXT_PUBLIC_AUTH_APP_NAME,
    NEXT_PUBLIC_BLOG_APP_NAME: process.env.NEXT_PUBLIC_BLOG_APP_NAME,
    NEXT_PUBLIC_CV_APP_NAME: process.env.NEXT_PUBLIC_CV_APP_NAME,

    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
