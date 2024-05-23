import baseConfig from "@configs/tailwind-config";
import type { Config } from "tailwindcss";

const config = {
  content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
  theme: baseConfig.theme,
  plugins: baseConfig.plugins,
} satisfies Config;

export default config;
