import { fetchProfile } from "../../api/profile/fetchProfile.js";
import FormHandler from "../../components/form/formHandler.js";
import { setupPreviewInputs } from "../../components/previewHandler.js";
import { showErrorAlert } from "../../global/alert.js";
import { setLogoutListener } from "../../global/logout.js";

setLogoutListener();

/**
 * Populate the update form with fetched profile data.
 * @param {Object} profile - Profile data to populate.
 */
function populateUpdateForm(profile) {
  document.getElementById("name").value = profile.name || "";
  document.getElementById("bio").value = profile.bio || "";
  document.getElementById("avatar-url").value = profile.avatar?.url || "";
  document.getElementById("banner-url").value = profile.banner?.url || "";

  // Add (alt) here to ?? Because changing the images..

  document.getElementById("avatar-preview").src =
    profile.avatar?.url || "../../src/images/avatar.jpg";
  document.getElementById("banner-preview").src =
    profile.banner?.url || "../../src/images/banner-bid.jpg";
}

/**
 * Initialize the update profile page.
 */
async function initUpdateForm() {
  try {
    const profile = await fetchProfile();
    populateUpdateForm(profile);

    setupPreviewInputs(
      "avatar-url",
      "avatar-preview",
      "banner-url",
      "banner-preview",
    );

    FormHandler.initialize("#update-profile-form", "updateProfile");
  } catch (error) {
    console.error("Failed to initialize update form:", error);
    showErrorAlert("Failed to load profile data.");
  }
}

initUpdateForm();
