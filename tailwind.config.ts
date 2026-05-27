import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fff0f3",
          100: "#ffe0e8",
          200: "#ffc2d4",
          300: "#ff8fab",
          400: "#ff5c8a",
          500: "#e8496a",
          600: "#c9184a",
          700: "#a4133c",
          800: "#800f2f",
          900: "#590d22",
        },
        blush: {
          50: "#fff5f7",
          100: "#ffe4ea",
          200: "#ffccd5",
          300: "#ffaab8",
          400: "#ff8096",
          500: "#f7637a",
          600: "#e8496a",
          700: "#c93a58",
        },
        lavender: {
          50: "#f5f0ff",
          100: "#ede0ff",
          200: "#d8c2ff",
          300: "#bf99ff",
          400: "#a56eff",
          500: "#8b3dff",
          600: "#7928d4",
          700: "#611fad",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        petal: "#fce7f3",
        stem: "#2d5a27",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        dancing: ['"Dancing Script"', "cursive"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "romantic-gradient":
          "linear-gradient(135deg, #fff0f3 0%, #fce7f3 50%, #ede0ff 100%)",
      },
      animation: {
        "petal-float": "petalFloat 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in-up": "fadeInUp 0.4s ease-out",
      },
      keyframes: {
        petalFloat: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
