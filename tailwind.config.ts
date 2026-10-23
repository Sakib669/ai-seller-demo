import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#031711",
        foreground: "#F0FDF4",
        forest: {
          dark: "#064E3B",
          emerald: "#16A34A",
          mint: "#86EFAC",
          ice: "#D1FAE5",
          white: "#F0FDF4",
          card: "rgba(6, 78, 59, 0.35)",
          cardBorder: "#064E3B",
          cardBorderHover: "#16A34A",
        },
        hermes: {
          cobalt: "#16A34A",
          glow: "#86EFAC",
          cyan: "#86EFAC",
          midnight: "#031711",
          card: "rgba(6, 78, 59, 0.35)",
          cardBorder: "#064E3B",
          cardBorderHover: "#16A34A",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        bengali: ["'Hind Siliguri'", "sans-serif"],
      },
      boxShadow: {
        cobalt: "0 0 25px -5px rgba(22, 163, 74, 0.45)",
        cyan: "0 0 25px -5px rgba(134, 239, 172, 0.35)",
        emerald: "0 0 25px -5px rgba(22, 163, 74, 0.5)",
        mint: "0 0 25px -5px rgba(134, 239, 172, 0.4)",
        card: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
