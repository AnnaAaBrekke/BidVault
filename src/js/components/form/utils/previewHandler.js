import { validateImageUrl } from "./validImg.js";

/**
 * Sets up preview functionality for avatar and banner inputs, allowing real-time image and alt text updates.
 *
 * **/

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

      // Validate the URL and provides feedback
      if (url && !validateImageUrl(url, avatarUrlInput)) {
        avatarUrlInput.classList.add("invalid"); // Highlight invalid input
        avatarPreview.src = "../../src/images/avatar.jpg"; // Reset preview
      } else {
        avatarUrlInput.classList.remove("invalid"); // Remove invalid styling
        avatarPreview.src = url || "../../src/images/avatar.jpg"; // Update preview
      }
    });

    if (avatarAltInput) {
      avatarAltInput.addEventListener("input", () => {
        avatarPreview.alt = avatarAltInput.value || "Default Avatar";
      });
    }
  }

  if (bannerUrlInput && bannerPreview) {
    bannerUrlInput.addEventListener("input", () => {
      const url = bannerUrlInput.value;

      if (url && !validateImageUrl(url, bannerUrlInput)) {
        bannerUrlInput.classList.add("invalid"); // Highlight invalid input
        bannerPreview.src = "../src/images/banner-bid.jpg"; // Reset preview
      } else {
        bannerUrlInput.classList.remove("invalid"); // Remove invalid styling
        bannerPreview.src = url || "../src/images/banner-bid.jpg"; // Update preview
      }
    });

    if (bannerAltInput) {
      bannerAltInput.addEventListener("input", () => {
        bannerPreview.alt = bannerAltInput.value || "Default Banner";
      });
    }
  }
}

/**
 * Sets up a preview for the main image and a gallery of media inputs, allowing real-time updates.
 */
export function setupMainImgPreview() {
  const mainImgInput = document.getElementById("mainImgUrl");
  const mainImgPreview = document.getElementById("main-image-preview");
  const mainImgLabel = document.querySelector('label[for="mainImgUrl"]');

  if (mainImgInput && mainImgPreview && mainImgLabel) {
    mainImgLabel.parentNode.insertBefore(mainImgPreview, mainImgLabel);

    mainImgInput.addEventListener("input", () => {
      const url = mainImgInput.value;

      if (validateImageUrl(url)) {
        mainImgPreview.src = url;
        mainImgPreview.classList.remove("hidden");
      } else {
        mainImgPreview.src = "";
        mainImgPreview.classList.add("hidden");
      }
    });
  } else {
    console.error("Main image input, preview, or label element not found.");
  }

  // Gallery Previews
  const mediaInputs = document.querySelectorAll(".media-input");
  mediaInputs.forEach((input, index) => {
    const preview = document.createElement("img");
    preview.alt = `Gallery Image ${index + 1} Preview`;
    preview.classList.add("image-preview", "hidden");

    input.parentNode.insertBefore(preview, input);

    input.addEventListener("input", () => {
      const url = input.value;

      if (validateImageUrl(url)) {
        preview.src = url;
        preview.classList.remove("hidden");
      } else {
        preview.src = "";
        preview.classList.add("hidden");
      }
    });
  });
}
