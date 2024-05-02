/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@packages/ui", "@packages/supabase"],
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
