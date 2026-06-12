/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A66C2',
          dark: '#004182',
          light: '#378FE9'
        },
        secondary: {
          DEFAULT: '#00A0DC',
          dark: '#0077B5',
          light: '#33B3E5'
        }
      }
    },
  },
  plugins: [],
}
