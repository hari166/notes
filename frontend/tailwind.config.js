const { transition } = require('@angular/animations')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        font: {
          base: 'var(--color-text-base)',
          dark: 'var(--color-text-dark)'
        },
        base: {
          p: 'var(--color-base-primary)',
          s: 'var(--color-base-secondary)'
        },
        dark: {
          p: 'var(--color-dark-primary)',
          s: 'var(--color-dark-secondary)'
        }
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}