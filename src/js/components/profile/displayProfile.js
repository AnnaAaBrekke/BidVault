import { setupPreviewInputs } from "../previewHandler.js";

/**
 * Display profile information dynamically.
 * @param {Object} profile - The profile data to display.
 */
export function displayProfile(profile) {
  // Avatar setup
  const avatarImg = document.getElementById("profile-avatar");
  avatarImg.src = profile.avatar?.url || "../../src/images/avatar.jpg";
  avatarImg.alt = profile.avatar?.alt || "Default Avatar";

  // Banner setup
  const bannerImg = document.getElementById("profile-banner");
  bannerImg.src = profile.banner?.url || "../../src/images/banner-bid.jpg";
  bannerImg.alt = profile.banner?.alt || "Default Banner";

  // Profile name
  const profileName = document.getElementById("profile-name");
  profileName.textContent = profile.name || "Anonymous";

  // Profile bio
  const profileBio = document.getElementById("profile-bio");
  profileBio.textContent = profile.bio || "No bio provided.";

  // Profile credits
  const profileCreditsContainer = document.getElementById("profile-credits");
  profileCreditsContainer.textContent = ""; // Clear previous content

  const creditsLabel = document.createElement("span");
  creditsLabel.textContent = "Current credit balance: ";

  const creditsValue = document.createElement("span");
  creditsValue.textContent = `${profile.credits || 0} credits`;

  profileCreditsContainer.appendChild(creditsLabel);
  profileCreditsContainer.appendChild(creditsValue);

  // Preview input setup
  setupPreviewInputs("avatar-update-input", "profile-avatar");
}
