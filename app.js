import router from "./src/js/views/router.js";
import { setLogoutListener } from "./src/js/global/logout.js";

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  router();
  setLogoutListener;
});
