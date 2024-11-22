export function setupPreviewInputs(avatarInputId, avatarPreviewId, bannerInputId, bannerPreviewId) {
  const avatarUrlInput = document.getElementById(avatarInputId);
  const avatarPreview = document.getElementById(avatarPreviewId);

  const bannerUrlInput = document.getElementById(bannerInputId);
  const bannerPreview = document.getElementById(bannerPreviewId);

  if (avatarUrlInput && avatarPreview) {
    avatarUrlInput.addEventListener("input", () => {
      const url = avatarUrlInput.value;
      avatarPreview.src = url || "../../src/images/avatar.jpg"; // Fallback to default avatar
    });
  }

  if (bannerUrlInput && bannerPreview) {
    bannerUrlInput.addEventListener("input", () => {
      const url = bannerUrlInput.value;
      bannerPreview.src = url || "../../src/images/banner-bid.jpg"; // Fallback to default banner
    });
  }
}
