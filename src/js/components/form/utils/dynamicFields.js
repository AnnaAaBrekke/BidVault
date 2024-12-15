import { validateImageUrl } from "./validImg.js";

export function setupDynamicImageAdding() {
  const mediaContainer = document.getElementById("media-container");
  const addImageBtn = document.getElementById("add-image-btn");
  let imageCount = 1;

  addImageBtn.addEventListener("click", () => {
    if (imageCount >= 5) {
      alert("You can only add up to 5 images.");
      return;
    }

    imageCount++;

    const mediaItem = document.createElement("div");
    mediaItem.classList.add("media-item");

    const preview = document.createElement("img");
    preview.classList.add("image-preview", "hidden");
    preview.alt = `Gallery Image ${imageCount} Preview`;
    preview.src = "https://via.placeholder.com/150";

    const urlLabel = document.createElement("label");
    urlLabel.setAttribute("for", `media${imageCount}`);
    urlLabel.classList.add("form-label");
    urlLabel.textContent = `Media ${imageCount} URL:`;

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.id = `media${imageCount}`;
    urlInput.classList.add("form-input", "media-input");
    urlInput.name = "media";
    urlInput.placeholder = `Enter the URL for Media ${imageCount}`;

    const altLabel = document.createElement("label");
    altLabel.setAttribute("for", `mediaAlt${imageCount}`);
    altLabel.classList.add("form-label");
    altLabel.textContent = `Alt Text for Media ${imageCount}:`;

    const altInput = document.createElement("input");
    altInput.type = "text";
    altInput.id = `mediaAlt${imageCount}`;
    altInput.classList.add("form-input", "media-alt");
    altInput.name = "mediaAlt";
    altInput.placeholder = `Enter alt text for Media ${imageCount}`;

    mediaItem.appendChild(preview);
    mediaItem.appendChild(urlLabel);
    mediaItem.appendChild(urlInput);
    mediaItem.appendChild(altLabel);
    mediaItem.appendChild(altInput);

    mediaContainer.appendChild(mediaItem);

    setupGalleryPreview(urlInput, preview);
  });

  function setupGalleryPreview(input, preview) {
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
  }
}
