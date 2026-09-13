/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uncen: {
          navy: '#064e3b',
          'navy-dark': '#022c22',
          'navy-light': '#047857',
          gold: '#D97706',
          'gold-light': '#F59E0B',
          teal: '#0d9488',
          'teal-light': '#14b8a6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
