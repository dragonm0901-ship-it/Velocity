/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepVoid: '#121212', // deepCharcoal
        plasma: '#D4AF37',   // mutedGold
        ghost: '#FAFAFA',    // cream
        graphite: '#1A1A1A'  // slightly lighter charcoal
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        drama: ['"Instrument Serif"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      }
    },
  },
  plugins: [],
}