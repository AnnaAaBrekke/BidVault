import { setupPreviewInputs } from "../form/utils/previewHandler";

export function displayProfile(profile) {
  if (!profile) {
    console.error("Profile data is missing.");
    return;
  }

  // Avatar setup
  const avatarImg = document.getElementById("profile-avatar");
  if (avatarImg) {
    avatarImg.src = profile.avatar?.url || "../src/images/avatar.jpg";
    avatarImg.alt = profile.avatar?.alt || "Default Avatar";
  }

  // Banner setup
  const bannerImg = document.getElementById("profile-banner");
  if (bannerImg) {
    bannerImg.src = profile.banner?.url || "../src/images/banner-bid.jpg";
    bannerImg.alt = profile.banner?.alt || "Default Banner";
  }

  // Profile name
  const profileName = document.getElementById("profile-name");
  if (profileName) {
    profileName.textContent = profile.name || "Anonymous";
  }

  // Profile bio
  const profileBio = document.getElementById("profile-bio");
  if (profileBio) {
    profileBio.textContent = profile.bio || "No bio provided.";
  }

  // Profile credits
  const profileCreditsContainer = document.getElementById("profile-credits");
  if (profileCreditsContainer) {
    profileCreditsContainer.textContent = ""; // Clear previous content

    const creditsLabel = document.createElement("span");
    creditsLabel.textContent = "Current credit balance: ";

    const creditsValue = document.createElement("span");
    creditsValue.textContent = `${profile.credits || 0} credits`;

    profileCreditsContainer.appendChild(creditsLabel);
    profileCreditsContainer.appendChild(creditsValue);
  }

  // Preview input setup
  try {
    setupPreviewInputs("avatar-update-input", "profile-avatar");
  } catch (error) {
    console.warn("Failed to set up preview inputs:", error.message);
  }
}
