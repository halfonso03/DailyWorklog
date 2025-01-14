/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      minHeight: {
        0.5: '3rem',
        1: '4rem',
        2: '8rem',
        3: '12rem',
        4: '16rem',
      },
    },
  },
  plugins: [],
};
