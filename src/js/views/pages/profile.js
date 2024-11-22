import { fetchProfile } from "../../api/profile/fetchProfile.js";
import { showErrorAlert } from "../../global/alert.js";

function displayProfile(profile) {
  document.getElementById("profile-avatar").src =
    profile.avatar.url || "../images/avatar.jpg";
  document.getElementById("profile-avatar").alt =
    profile.avatar.alt || "Profile Avatar";

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
}

async function initProfile() {
  try {
    const profile = await fetchProfile();
    displayProfile(profile);
  } catch (error) {
    console.error("Failed to display and init profile", error);
    showErrorAlert("FFailed to display profile details");
  }
}

document.addEventListener("DOMContentLoaded", initProfile);
