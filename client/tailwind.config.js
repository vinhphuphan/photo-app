/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : {
          DEFAULT : "#e60023",
          text : "#cc0000",
          hover : "#b60000"
        }
      }
    },
  },
  plugins: [],
}