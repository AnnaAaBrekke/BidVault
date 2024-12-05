import { validateImageUrl } from "./validImg";

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

export function setupMainImgPreview() {
  // Main Image Preview
  const mainImgInput = document.getElementById("mainImgUrl");
  const mainImgPreview = document.getElementById("main-image-preview");
  const mainImgLabel = document.querySelector('label[for="mainImgUrl"]');

  // Ensure elements exist
  if (mainImgInput && mainImgPreview && mainImgLabel) {
    // Move the preview image above the label
    mainImgLabel.parentNode.insertBefore(mainImgPreview, mainImgLabel);

    // Add event listener to update the main image preview
    mainImgInput.addEventListener("input", () => {
      const url = mainImgInput.value;

      if (validateImageUrl(url)) {
        mainImgPreview.src = url; // Set the image source
        mainImgPreview.classList.remove("hidden"); // Show the preview
      } else {
        mainImgPreview.src = ""; // Clear the image source
        mainImgPreview.classList.add("hidden"); // Hide the preview
      }
    });
  } else {
    console.error("Main image input, preview, or label element not found.");
  }

  // Gallery Previews
  const mediaInputs = document.querySelectorAll(".media-input");
  mediaInputs.forEach((input, index) => {
    // Create a preview image for each media input
    const preview = document.createElement("img");
    preview.alt = `Gallery Image ${index + 1} Preview`;
    preview.classList.add("image-preview", "hidden");

    // Insert the preview above the input
    input.parentNode.insertBefore(preview, input);

    // Add event listener to update the gallery preview
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
