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
      screens: {
        xs: "360px",
        ms: "600px",
        md: "905px",
        lg: "1280px",
        xl: "1440px",
        xxl: "1899px",
        xxxl: "1920px",
      },
    },
  },

  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}