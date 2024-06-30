/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'containerColor': '#1d6023c7',
      'buttonColor': '#1d6023',
      'white': '#ffffff',
      'black': '#000000',
      'lightred': '#FF474C',
      'lightgreen': '#90EE90',
    },
  },
  plugins: [],
}