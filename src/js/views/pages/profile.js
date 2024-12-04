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
  // Set the profile name
  const profileName = document.getElementById("profile-name");
  profileName.textContent = profile.name || "Anonymous";

  // Set the profile bio
  const profileBio = document.getElementById("profile-bio");
  profileBio.textContent = profile.bio || "No bio provided.";

  // Set the profile credits dynamically
  const profileCreditsContainer = document.getElementById("profile-credits");
  profileCreditsContainer.textContent = ""; // Clear previous content

  const creditsLabel = document.createElement("span");
  creditsLabel.textContent = "Current credit balance: ";

  const creditsValue = document.createElement("span");
  creditsValue.textContent = `${profile.credits || 0} credits`;

  profileCreditsContainer.appendChild(creditsLabel);
  profileCreditsContainer.appendChild(creditsValue);

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
