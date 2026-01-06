/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        organicGreen: '#4A7C59',
        organicLight: '#F3F8F2',
        earthyBrown: '#8D6E63'
      }
    },
  },
  plugins: [],
}