import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0F172A",
          900: "#14213D",
          800: "#17233A",
          700: "#1F3154"
        },
        amberline: {
          500: "#F59E0B",
          400: "#F2A541",
          100: "#FDECC8"
        },
        ivory: "#FAF7F2"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
