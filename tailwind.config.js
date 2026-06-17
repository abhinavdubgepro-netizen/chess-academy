/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chess: { dark: "#1a1a2e", light: "#16213e", accent: "#e94560", gold: "#f5a623" },
      },
    },
  },
  plugins: [],
};
