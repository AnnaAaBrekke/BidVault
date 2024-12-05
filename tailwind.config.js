/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./welcome.html",
    "./auth/**/*.html",
    "./profile/**/*.html",
    "./listing/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
