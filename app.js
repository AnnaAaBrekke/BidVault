import router from "./src/js/views/router.js";
import { setLogoutListener } from "./src/js/global/logout.js";
import "./src/styles/css/styles.scss";
import { header } from "./src/js/components/navbar.js";

router();
setLogoutListener();
header();
