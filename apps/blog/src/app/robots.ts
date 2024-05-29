import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseURL = process.env.NEXT_PUBLIC_APP_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
