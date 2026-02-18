/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#0A1F44',
          secondary: '#1C3D8F',
          accent: '#F4A100',
          background: '#F9FAFB',
        },
      },
    },
  },
  plugins: [],
};
