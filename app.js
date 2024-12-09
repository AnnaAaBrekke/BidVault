import router from "./src/js/views/router.js";
import { setLogoutListener } from "./src/js/global/logout.js";
import "./src/styles/css/styles.scss";
import {
  hamburgerDropdown,
  populateHeader,
  renderHeader,
} from "./src/js/components/navbar.js";
import { profileService } from "./src/js/api/services/profileService.js";
import { isLoggedIn } from "./src/js/global/authGuard.js";

router();
setLogoutListener();

document.addEventListener("DOMContentLoaded", async () => {
  const checkLoginStatus = await isLoggedIn();
  renderHeader(checkLoginStatus);

  if (checkLoginStatus) {
    const profile = await profileService.fetchProfile();
    populateHeader(profile);
    hamburgerDropdown();
  }
});
