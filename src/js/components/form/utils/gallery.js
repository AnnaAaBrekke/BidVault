// function setupMediaGallery(containerId, numberOfInputs) {
//   const mediaContainer = document.getElementById(containerId);

//   if (!mediaContainer) {
//     console.error("Media container not found.");
//     return;
//   }

//   for (let i = 1; i <= numberOfInputs; i++) {
//     // Create media item wrapper
//     const mediaItem = document.createElement("div");
//     mediaItem.classList.add("media-item");

//     // Create the image preview
//     const preview = document.createElement("img");
//     preview.classList.add("image-preview", "hidden");
//     preview.alt = `Gallery Image ${i} Preview`;

//     // Create the URL input for media
//     const inputUrl = document.createElement("input");
//     inputUrl.type = "url";
//     inputUrl.classList.add("form-input", "media-input");
//     inputUrl.name = `media${i}`;
//     inputUrl.placeholder = `Enter the URL for Media ${i}`;
//     inputUrl.required = i === 1; // Only the first input is required

//     // Create the alt text input for media
//     const inputAlt = document.createElement("input");
//     inputAlt.type = "text";
//     inputAlt.classList.add("form-input", "media-alt");
//     inputAlt.name = `mediaAlt${i}`;
//     inputAlt.placeholder = `Enter alt text for Media ${i}`;

//     // Append the elements in the correct order
//     mediaItem.appendChild(preview);
//     mediaItem.appendChild(inputUrl);
//     mediaItem.appendChild(inputAlt);

//     // Append the media item to the container
//     mediaContainer.appendChild(mediaItem);

//     // Add an event listener to update the preview
//     inputUrl.addEventListener("input", () => {
//       const url = inputUrl.value;

//       if (validateImageUrl(url)) {
//         preview.src = url;
//         preview.classList.remove("hidden");
//       } else {
//         preview.src = "";
//         preview.classList.add("hidden");
//       }
//     });
//   }
// }
