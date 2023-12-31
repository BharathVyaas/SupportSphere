/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px #fff",
      },
      colors: {
        bg: "#f2f2f4",
        text: "#320763",
        lightText: "#32076350",
        accent: "#3498db",
        softPurple: "#d5d8dc",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito"],
        playFairD: ["Playfair Display", "serif"],
        roboto: ["Roboto", "Arial", "sans-serif"],
      },
      screens: {
        w1100: "1100px",
        w800: "800px",
        w550: "550px",
      },
    },
  },
  plugins: [],
};
