/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige-50': '#faf9f7',
        'beige-100': '#f5f3f0',
        'beige-200': '#ede9e3',
        'figma-bg': '#F8F7F0',
        'figma-green': '#5B8C51',
        'figma-dark': '#404A3D',
        'figma-yellow': '#EDDD5E',
        'figma-gray': '#666666',
      },
    },
  },
  plugins: [],
}

