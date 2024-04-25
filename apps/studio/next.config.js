// Importing env files here to validate on build
import "@packages/env";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  // ) => {
  //   return config;
  // },
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default config;
