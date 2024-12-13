export function renderMedia(mediaList, includeGallery = false) {
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-container");

  if (includeGallery && mediaList && mediaList.length > 1) {
    // Render gallery only (excluding the first image)
    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("gallery-container");

    mediaList.forEach((media, index) => {
      const img = document.createElement("img");
      img.src = media.url;
      img.alt = media.alt || `Gallery Image ${index + 1}`;
      img.classList.add("gallery-image");
      galleryContainer.appendChild(img);
    });

    mediaContainer.appendChild(galleryContainer);
  } else {
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
  }

  return mediaContainer;
}
