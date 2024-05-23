/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@packages/ui", "@packages/supabase", "@packages/db"],
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
