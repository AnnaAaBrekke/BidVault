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

    // Need to fix and make dry later
    const currentBid =
      listing.bids && listing.bids.length > 0
        ? Math.max(...listing.bids.map((bid) => bid.amount))
        : 0;

    listingElement.innerHTML = `
      <img src="${mediaUrl}" alt="${listing.title}" class="listing-image" />
      <h2>${listing.title}</h2>
      <p><strong>Current Bid:</strong> ${currentBid} credits</p>
      <p><strong>Ends At:</strong> ${new Date(listing.endsAt).toLocaleString()}</p>
      <p><strong>Bids:</strong> ${listing._count.bids || 0}</p>
      <a href="listing/listing.html?id=${listing.id}" class="view-details-btn">View Details</a>
      <p>${listing.description || "No description available"}</p>
    `;

    listingsContainer.appendChild(listingElement);
  });
}
