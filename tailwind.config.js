/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        richBlue: '#0F52BA', // Sapphire blue
        forestGreen: '#228B22',
        softRed: '#FF6347',
        pureWhite: '#FFFFFF',
        offWhite: '#F8F9FA'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Clash Display"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
