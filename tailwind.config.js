/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#000000',
        'primary': '#00A3FF',
        'accent-blue': '#1E3A8A',
        'accent-emerald': '#0E7490',
        'danger': '#FF3131',
        'warning': '#FACC15',
        'info': '#00D1FF'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
