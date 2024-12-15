import FormHandler from "../../components/form/formHandler.js";
import { setupPreviewInputs } from "../../components/form/utils/previewHandler.js";

FormHandler.initialize("#register-form", "register");
setupPreviewInputs("avatar-url", "avatar-preview", "avatar-alt");
