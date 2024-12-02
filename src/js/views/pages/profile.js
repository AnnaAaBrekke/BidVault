import { displayUserListings } from "../../api/listing/displayListing.js";
import { fetchProfile } from "../../api/profile/fetchProfile.js";
import { avatarUpdate } from "../../components/avatar.js";
import { setupPreviewInputs } from "../../components/previewHandler.js";
import { showErrorAlert } from "../../global/alert.js";

function displayProfile(profile) {
  const avatarImg = document.getElementById("profile-avatar");
  avatarImg.src = profile.avatar.url || "../../src/images/avatar.jpg";
  avatarImg.alt = profile.avatar.alt || "Profile Avatar";

  document.getElementById("profile-banner").src =
    profile.banner.url || "../images/banner-bid.jpg";
  document.getElementById("profile-banner").alt =
    profile.banner.alt || "Profile Banner";

  document.getElementById("profile-name").textContent =
    profile.name || "Anonymous";
  document.getElementById("profile-bio").textContent =
    profile.bio || "No bio provided.";
  document.getElementById("profile-credits").innerHTML =
    `Current credit balance:${profile.credits || 0} credits`;

  setupPreviewInputs("avatar-update-input", "profile-avatar");
}

async function initProfile() {
  try {
    const profile = await fetchProfile();
    displayProfile(profile);
    avatarUpdate();

    if (profile.name) {
      await displayUserListings(profile.name);
    }
  } catch (error) {
    console.error("Failed to display and init profile", error);
    showErrorAlert("Failed to display profile details");
  }
}

initProfile();
