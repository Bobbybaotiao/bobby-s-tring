/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bobby-black': '#1a1a1a',
        'bobby-gray': '#4a4a4a',
        'bobby-gold': '#d4af37',
        'bobby-wine': '#8b0000',
        'bobby-green': '#006400',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}