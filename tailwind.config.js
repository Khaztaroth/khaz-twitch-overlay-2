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
        'default': 'rgba(32, 32, 32, 0.904)',
        'bold': 'rgba(32, 32, 32, 0.99)',
        'green': 'rgba(0, 203, 48, 0.8)',
        'white': 'rgba(250, 250 ,250, 1)',
        'black': 'rgba(10, 10, 10, 1)'
      }
    },
    
  },
  plugins: [],
}

