/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        softOlive: "#606C38", // Young Olive Green
        deepOlive: "#283618", // Dark Earthy Green
        warmCream: "#FEFAE0", // Bright Warm Off-white
        caramelTan: "#DDA15E", // Light Warm Brown
        rusticBrown: "#BC6C25", // Deep Warm Brown
      },
      fontFamily: {
        heading: ["Archivo", "sans-serif"],
        body: ["Questrial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
