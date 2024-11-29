import { outputListings } from "./outputListing.js";

export function displayListings(listings, addDeleteButtons = false) {
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = "";

  listings.forEach((listing) => {
    const listingHTML = `
      <div id="listing-${listing.id}" class="listing">
        ${outputListings(listing)}
        <a href="../listing/index.html?id=${listing.id}" class="view-details-btn">
          View Details
        </a>
  ${
    addDeleteButtons
      ? `<button class="delete-button" data-listing-id="${listing.id}">
                 <i class="fa-solid fa-xmark"></i>
               </button>`
      : ""
  }
      </div>
    `;
    listingsContainer.innerHTML += listingHTML;
  });
}
