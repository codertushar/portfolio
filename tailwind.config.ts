import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050507",
          900: "#0a0a10",
          800: "#111119",
          700: "#1a1a24",
          600: "#26262f",
        },
        bone: {
          100: "#f6f5f2",
          200: "#e9e7e1",
          300: "#c9c7c2",
          400: "#9a988f",
          500: "#6f6e69",
        },
        signal: {
          violet: "#a78bfa",
          indigo: "#818cf8",
          cyan: "#5eead4",
          amber: "#fbbf24",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
    },
  },
  plugins: [],
};

export default config;
