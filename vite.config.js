import { resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  appType: "mpa",
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "./index.html"),
        welcome: resolve(__dirname, "./welcome.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        updateProfile: resolve(__dirname, "./profile/update.html"),
        createListing: resolve(__dirname, "./listing/create.html"),
        viewListing: resolve(__dirname, "./listing/index.html"),
      },
    },
  },
  server: {
    historyApiFallback: false,
  },
});
