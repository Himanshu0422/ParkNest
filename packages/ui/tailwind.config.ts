import type { Config } from "tailwindcss";
import {
  animationConfig,
  colorsConfig,
  keyframesConfig,
  spacingConfig,
} from "./styles/config";

const config: Config = {
  important: true,
  content: ["./app/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: colorsConfig,
    extend: {
      ringColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      outlineColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      borderRadius: {
        DEFAULT: "0",
      },
      spacing: spacingConfig,
      animation: animationConfig,
      keyframes: keyframesConfig,
    },
  },
  plugins: [],
};

export default config;
