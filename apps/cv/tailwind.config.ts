import type { Config } from "tailwindcss";
import baseConfig from "@configs/tailwind-config";

const config = {
  content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
  theme: baseConfig.theme,
} satisfies Config;

export default config;
