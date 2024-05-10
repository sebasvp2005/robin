/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#B5C18E",
        secondary : "#EADBC8"
      }
    },
  },
  plugins: [],
}

