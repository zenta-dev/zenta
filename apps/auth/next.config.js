// Importing env files here to validate on build
import "@packages/env";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return config;
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@packages/api",
    "@packages/auth",
    "@packages/db",
    "@packages/ui",
    "@packages/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async redirects() {
    return [
      {
        source: "/blog.zenta.dev",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://zenta.local:3001"
            : "https://blog.zenta.dev",
        permanent: false,
        basePath: false,
      },
      {
        source: "/cv.zenta.dev",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://zenta.local:3002"
            : "https://cv.zenta.dev",
        permanent: false,
        basePath: false,
      },
      {
        source: "/studio.zenta.dev",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://zenta.local:3003"
            : "https://studio.zenta.dev",
        permanent: false,
        basePath: false,
      },
    ];
  },

  async headers() {
    // cors policy
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default config;
