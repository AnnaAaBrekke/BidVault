import "./src/styles/scss/styles.scss";

import router from "./src/js/views/router.js";
import { setLogoutListener } from "./src/js/global/logout.js";

router();
setLogoutListener();
