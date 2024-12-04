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

  if (avatarUrlInput && avatarPreview && avatarAltInput) {
    avatarUrlInput.addEventListener("input", () => {
      const url = avatarUrlInput.value;
      avatarPreview.src = url || "../../src/images/avatar.jpg";
    });

    avatarAltInput.addEventListener("input", () => {
      avatarPreview.alt = avatarAltInput.value || "Default Avatar";
    });
  }

  if (bannerUrlInput && bannerPreview && bannerAltInput) {
    bannerUrlInput.addEventListener("input", () => {
      const url = bannerUrlInput.value;
      bannerPreview.src = url || "../../src/images/banner-bid.jpg";
    });

    bannerAltInput.addEventListener("input", () => {
      bannerPreview.alt = bannerAltInput.value || "Default Banner";
    });
  }
}
