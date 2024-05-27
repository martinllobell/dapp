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
        primary: {
          DEFAULT: "#8A2BE2", // Violeta (Blue Violet)
          100: "#E6E6FA", // Lavanda (un tono muy claro de violeta)
          200: "#D8BFD8", // Cardo (un tono claro de violeta)
          300: "#DA70D6", // Orquídea (un tono medio de violeta)
          400: "#9932CC", // Violeta oscuro (Dark Violet)
          500: "#4B0082", // Índigo (un tono muy oscuro de violeta)
        },
        boxShadow: {
          'purple': '0 4px 6px -1px rgba(138, 43, 226, 0.5), 0 2px 4px -2px rgba(138, 43, 226, 0.5)',
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
    'tailwindcss',
    'autoprefixer',
    'tailwindcss-animated'
  ],
}

