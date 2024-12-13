export function renderMedia(mediaList, includeGallery = false) {
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-container");

  // Main media or placeholder
  const mainMedia = document.createElement("img");
  if (mediaList && mediaList.length > 0) {
    mainMedia.src = mediaList[0].url;
    mainMedia.alt = mediaList[0].alt || "Main Media";
  } else {
    mainMedia.src = "https://picsum.photos/id/139/367/267";
    mainMedia.alt = "Placeholder Image";
  }
  mainMedia.classList.add("main-media");
  mediaContainer.appendChild(mainMedia);

  // Render gallery images
  if (includeGallery && mediaList && mediaList.length > 1) {
    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("gallery-container");

    mediaList.slice(1).forEach((media) => {
      const img = document.createElement("img");
      img.src = media.url;
      img.alt = media.alt || "Gallery Image";
      img.classList.add("gallery-image");
      galleryContainer.appendChild(img);
    });

    mediaContainer.appendChild(galleryContainer);
  }

  return mediaContainer;
}
