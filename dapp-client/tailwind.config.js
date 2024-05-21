/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode": "class",

  theme: {
    extend: {
      colors: {
        dark: {
          bg: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)',
        },
      },
    },
  },

  plugins: [
    'tailwindcss',
    'autoprefixer'
  ],
}

