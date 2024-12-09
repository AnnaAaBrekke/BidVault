import router from "./src/js/views/router.js";
import { setLogoutListener } from "./src/js/global/logout.js";
import "./src/styles/css/styles.scss";
import { dropdownDesktop } from "./src/js/components/navbar.js";

router();
setLogoutListener();

document.addEventListener("DOMContentLoaded", () => {
  dropdownDesktop("avatar-container", "dropdown-menu");
});
