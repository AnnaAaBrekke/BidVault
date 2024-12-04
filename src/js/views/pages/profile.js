import { displayUserListings } from "../../api/listing/displayListing.js";
import { fetchProfile } from "../../api/profile/fetchProfile.js";
import { avatarUpdate } from "../../components/avatar.js";
import { setupPreviewInputs } from "../../components/previewHandler.js";
import { requireAuth } from "../../global/authGuard.js";

requireAuth();

function displayProfile(profile) {
  const avatarImg = document.getElementById("profile-avatar");
  avatarImg.src = profile.avatar?.url || "../../src/images/avatar.jpg";
  avatarImg.alt = profile.avatar?.alt || "Default Avatar";

  const bannerImg = document.getElementById("profile-banner");
  bannerImg.src = profile.banner.url || "../../src/images/banner-bid.jpg";
  bannerImg.alt = profile.banner.alt || "Default Banner";

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
      console.log(profile);
    }
  } catch (error) {
    console.error(error, "fetching profile details");
  }
}

initProfile();
