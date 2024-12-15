import FormHandler from "../../components/form/formHandler.js";
import { setupDynamicImageAdding } from "../../components/form/utils/dynamicFields.js";
import { setupMainImgPreview } from "../../components/form/utils/previewHandler.js";
import { requireAuth } from "../../global/authGuard.js";

requireAuth();

FormHandler.initialize("#create-listing-form", "createListing");

setupMainImgPreview();
setupDynamicImageAdding();
