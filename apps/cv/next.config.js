/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@packages/ui", "@packages/supabase"],
  eslint: { ignoreDuringBuilds: true },
};

export default config;
