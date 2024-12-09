import router from "./src/js/views/router.js";
import { setLogoutListener } from "./src/js/global/logout.js";
import "./src/styles/css/styles.scss";
import { setupHeader } from "./src/js/global/header.js";

router();
setLogoutListener();
setupHeader();
