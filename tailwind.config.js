/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: "#1a2744", light: "#eef2ff", dark: "#0f1929" },
        gold:  { DEFAULT: "#d4a017", light: "#fef9c3" },
        teal:  { DEFAULT: "#006d77", light: "#e0f7f9" },
      },
    },
  },
  plugins: [],
};
