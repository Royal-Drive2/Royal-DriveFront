import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: "#f5d98a",
          400: "#e8c55a",
          500: "#D4AF37",
          600: "#b8960c",
          700: "#9a7a00",
        },
        obsidian: {
          900: "#0a0a0a",
          800: "#111111",
          700: "#1a1a1a",
          600: "#242424",
          500: "#2e2e2e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "pulse-gold": "pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-up": "float-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.7)" },
          "50%": { boxShadow: "0 0 0 12px rgba(212, 175, 55, 0)" },
        },
        "float-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
