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
  const avatarPreview = document.getElementById("avatar-preview");
  const bannerPreview = document.getElementById("banner-preview");

  avatarPreview.src = profile.avatar?.url || "../../src/images/avatar.jpg";
  avatarPreview.alt = profile.avatar?.url
    ? `Avatar image from ${profile.avatar.url}`
    : "Default Avatar";

  bannerPreview.src = profile.banner?.url || "../../src/images/banner-bid.jpg";
  bannerPreview.alt = profile.banner?.url
    ? `Banner image from ${profile.banner.url}`
    : "Default Banner";

  document.getElementById("name").value = profile.name || "";
  document.getElementById("bio").value = profile.bio || "";
  document.getElementById("avatar-url").value = profile.avatar?.url || "";
  document.getElementById("avatar-alt").value = profile.avatar?.alt || "";
  document.getElementById("banner-url").value = profile.banner?.url || "";
  document.getElementById("banner-alt").value = profile.banner?.alt || "";
}

async function initUpdateForm() {
  try {
    const profile = await fetchProfile();
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
