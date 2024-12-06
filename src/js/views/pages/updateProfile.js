import { profileService } from "../../api/services/profileService.js";
import FormHandler from "../../components/form/formHandler.js";
import { populateUpdateForm } from "../../components/form/populateForm.js";
import { setupPreviewInputs } from "../../components/form/utils/previewHandler.js";
import { showErrorAlert } from "../../global/alert.js";
import { setLogoutListener } from "../../global/logout.js";

setLogoutListener();

async function initUpdateForm() {
  try {
    const profile = await profileService.fetchProfile();
    populateUpdateForm(profile);
    setupPreviewInputs(
      "avatar-url",
      "avatar-preview",
      "banner-url",
      "banner-preview",
      "avatar-alt",
      "banner-alt",
    );

    FormHandler.initialize("#update-profile-form", "updateProfile");
  } catch (error) {
    console.error("Failed to initialize update form:", error);
    showErrorAlert("Failed to load update form.");
  }
}

initUpdateForm();
