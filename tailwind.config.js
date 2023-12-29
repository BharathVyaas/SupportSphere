/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      text: "#320763",
      accent: "#3498db",
      softPurple: "#d5d8dc",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito"],
        playFairD: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
