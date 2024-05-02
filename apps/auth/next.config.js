/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@packages/ui", "@packages/supabase"],

  async redirects() {
    return [
      {
        source: "/auth.zenta.dev",
        destination:
          process.env.NODE_ENV === "development"
            ? "https://zenta.local:3000"
            : "https://auth.zenta.dev",
        permanent: false,
        basePath: false,
      },
      {
        source: "/studio.zenta.dev",
        destination:
          process.env.NODE_ENV === "development"
            ? "https://zenta.local:3001"
            : "https://studio.zenta.dev",
        permanent: false,
        basePath: false,
      },
      {
        source: "/blog.zenta.dev",
        destination:
          process.env.NODE_ENV === "development"
            ? "https://zenta.local:3002"
            : "https://blog.zenta.dev",
        permanent: false,
        basePath: false,
      },
      {
        source: "/cv.zenta.dev",
        destination:
          process.env.NODE_ENV === "development"
            ? "https://zenta.local:3003"
            : "https://cv.zenta.dev",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default config;
