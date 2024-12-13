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
          bg: "#ffffff", // Background Colour
          alt: "#f8f8f8", // Banner Colour
          secondary: "#d9d9d9",
        },
        secondary: {
          1: "#7d9da9", // Background and Font Colour
          2: "#a4b9c2", // Secondary Colour
          3: "#c1d3d9", // Secondary Colour
        },
        font: {
          main: "#000000", // Main Text Colour
          secondary: "#ffffff",
          secondary1: "#848484", // Text Colour
          secondary2: "#727272", // Text Colour
        },
        accent: "#b45309", // Icon and Font Colour
        button: {
          bg: "#111111", // Button Colour
          hover: "#ffffff", // Button Hover
        },
      },
      backgroundImage: {
        primaryBg: "url('./src/images/DesignSheet-Bg.jpg')",
        secondaryBg: "url('./src/images/DesignSheet-bg2.jpg')",
      },
    },
  },
  plugins: [],
};
