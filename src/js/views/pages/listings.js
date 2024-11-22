export function displayListings(listings) {
  const listingsContainer = document.getElementById("listings-container");

  listingsContainer.innerHTML = "";

  listings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.classList.add("listing");

    const mediaUrl =
      listing.media.length > 0
        ? listing.media[0].url
        : "../../src/images/logo.jpg";

    listingElement.innerHTML = `
      <img src="${mediaUrl}" alt="${listing.title}" class="listing-image" />
      <h2>${listing.title}</h2>
      <p><strong>Ends At:</strong> ${new Date(listing.endsAt).toLocaleString()}</p>
      <p><strong>Bids:</strong> ${listing._count.bids || 0}</p>
      <a href="listing/listing.html?id=${listing.id}" class="view-details-btn">View Details</a>
      <p>${listing.description || "No description available"}</p>
    `;

    listingsContainer.appendChild(listingElement);
  });
}
