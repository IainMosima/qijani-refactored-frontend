/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: '#454230',
        yellow: '#E09132',
        gray: '#cdcec9',
        success: '#4bb543',
        danger: '#a83e4e'
      },
    },
  },
  plugins: [],
}
