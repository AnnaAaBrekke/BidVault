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
    extend: {
      screens: {
        xxl: "1700px",
      },
      colors: {
        primary: {
          bg: "#ffffff",
          alt: "#f8f8f8",
          secondary: "#d9d9d9",
        },
        secondary: {
          1: "#7d9da9",
          2: "#a4b9c2",
          3: "#c1d3d9",
        },
        font: {
          main: "#000000",
          secondary: "#ffffff",
          secondary1: "#848484",
          secondary2: "#727272",
        },
        accent: "#b45309",
        button: {
          bg: "#111111",
          hover: "#ffffff",
        },
      },
      backgroundImage: {
        primaryBg: "url('../../src/images/DesignSheet-Bg.jpg')",
        secondaryBg: "url('../../src/images/DesignSheet-bg2.jpg')",
      },
    },
  },
  plugins: [],
};
