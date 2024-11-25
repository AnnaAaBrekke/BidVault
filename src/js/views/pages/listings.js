import { outputListings } from "../../api/listing/outputListing.js";

export function displayListings(listings) {
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = "";

  listings.forEach((listing) => {
    const listingHTML = `
      <div class="listing">
        ${outputListings(listing)}
        <a href="../../listing/listing.html?id=${listing.id}" class="view-details-btn">
          View Details
        </a>
      </div>
    `;
    listingsContainer.innerHTML += listingHTML;
  });
}
