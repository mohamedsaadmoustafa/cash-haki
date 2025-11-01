/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables manual theme toggling via "dark" class
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // includes TS/TSX for full compatibility
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Tajawal", "sans-serif"],
        english: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          light: "#3b82f6", // Tailwind blue-500
          dark: "#1e3a8a",  // Tailwind blue-900
        },
        surface: {
          light: "#ffffff",
          dark: "#1f1f1f",
        },
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
      transitionProperty: {
        theme: "background-color, color, border-color, fill, stroke",
      },
    },
  },
  plugins: [
    // Adds utilities for logical direction support (useful with Arabic)
    function ({ addBase }) {
      addBase({
        ".rtl": { direction: "rtl" },
        ".ltr": { direction: "ltr" },
      });
    },
  ],
};
