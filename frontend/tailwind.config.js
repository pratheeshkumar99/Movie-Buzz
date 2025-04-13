const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      fontFamily : {
        'heading': ["Silkscreen" , 'sans- serif'],
        'primary' :['DM Sans']
      },
      colors : {
        'primary': '#FFD700',
        'foreground' : '#FFFFFF',
        'background-primary': '#0C0C0C',
        'background-secondary': '#272829',
        transparent: 'transparent',
        red: colors.rose,
        slate: colors.slate,
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
      },
    extend: {},
  },
  plugins: [],
}

