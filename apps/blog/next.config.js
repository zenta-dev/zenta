/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@packages/ui"],
  eslint: { ignoreDuringBuilds: true },
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
