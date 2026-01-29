/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        softolive: "#606C38", // Young Olive Green
        deepolive: "#283618", // Dark Earthy Green
        warmcream: "#FEFAE0", // Bright Warm Off-white
        carameltan: "#DDA15E", // Light Warm Brown
        rusticbrown: "#BC6C25", // Deep Warm Brown
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Questrial", "sans-serif"],
        accent: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
