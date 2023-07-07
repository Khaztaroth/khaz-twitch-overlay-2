/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'default': 'rgb(128, 128, 128, 0.5)',
        'bold': 'rgb(128, 128, 128, 0.95)',
      }
    },
  },
  plugins: [],
}