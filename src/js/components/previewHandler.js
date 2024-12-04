import { validateImageUrl } from "../global/validImg.js";

export function setupPreviewInputs(
  avatarInputId,
  avatarPreviewId,
  bannerInputId,
  bannerPreviewId,
  avatarAltInputId,
  bannerAltInputId,
) {
  const avatarUrlInput = document.getElementById(avatarInputId);
  const avatarPreview = document.getElementById(avatarPreviewId);
  const avatarAltInput = document.getElementById(avatarAltInputId);

  const bannerUrlInput = document.getElementById(bannerInputId);
  const bannerPreview = document.getElementById(bannerPreviewId);
  const bannerAltInput = document.getElementById(bannerAltInputId);

  // Handle avatar input changes
  if (avatarUrlInput && avatarPreview) {
    avatarUrlInput.addEventListener("input", () => {
      const url = avatarUrlInput.value;

      // Validate the avatar URL and provide feedback
      if (url && !validateImageUrl(url, avatarUrlInput)) {
        avatarUrlInput.classList.add("invalid"); // Highlight invalid input
        avatarPreview.src = "../../src/images/avatar.jpg"; // Reset preview
      } else {
        avatarUrlInput.classList.remove("invalid"); // Remove invalid styling
        avatarPreview.src = url || "../../src/images/avatar.jpg"; // Update preview
      }
    });

    // Handle alt text updates
    if (avatarAltInput) {
      avatarAltInput.addEventListener("input", () => {
        avatarPreview.alt = avatarAltInput.value || "Default Avatar";
      });
    }
  }

  // Handle banner input changes
  if (bannerUrlInput && bannerPreview) {
    bannerUrlInput.addEventListener("input", () => {
      const url = bannerUrlInput.value;

      // Validate the banner URL and provide feedback
      if (url && !validateImageUrl(url, bannerUrlInput)) {
        bannerUrlInput.classList.add("invalid"); // Highlight invalid input
        bannerPreview.src = "../../src/images/banner-bid.jpg"; // Reset preview
      } else {
        bannerUrlInput.classList.remove("invalid"); // Remove invalid styling
        bannerPreview.src = url || "../../src/images/banner-bid.jpg"; // Update preview
      }
    });

    // Handle alt text updates
    if (bannerAltInput) {
      bannerAltInput.addEventListener("input", () => {
        bannerPreview.alt = bannerAltInput.value || "Default Banner";
      });
    }
  }
}
