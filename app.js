import router from "./src/js/views/router.js";
import { setLogoutListener } from "./src/js/global/logout.js";

function initApp() {
  router();
  setLogoutListener();
}

document.addEventListener("DOMContentLoaded", initApp);
