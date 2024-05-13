/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#da1a32', 'secondary' : '#a00c30'
      },
      fontFamily: {
        logo: ['Bebas Neue']
      }
    },
  },
  plugins: [],
}