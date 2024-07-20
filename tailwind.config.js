/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      translate: {
        'neg-full': '-100%',
      },
      width: {
        '60vw': '60%',
      },
    },
  },
  plugins: [],
}

