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
    keyframes: {
      'scroll': {
        '0%': {transform: 'translateY(10px)', opacity: '0'},
        '100%': {transform: 'translateY(0px)', opacity: '100'}
      }
    },
    animation: {
      fadeIn: 'scroll 0.3s ease-out'
    },
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',

    ],
  },
  plugins: [],
}

