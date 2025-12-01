/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lol-dark': '#0a0a0c',
        'lol-gold': '#c8aa6e',
        'lol-blue': '#0ac8b9',
        'lol-red': '#ff4655', // Valorant-ish red but good for accents
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
