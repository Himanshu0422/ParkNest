import type { Config } from "tailwindcss";
import uiConfig from "../../packages/ui/tailwind.config";

export default {
  presets: [uiConfig],
  content: ["./app/**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
} satisfies Config;
