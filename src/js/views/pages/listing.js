import { fetchSingleListing } from "../../api/listing/listingService.js";
import { outputListings } from "../../api/listing/outputListing.js";
import { showErrorAlert } from "../../global/alert.js";
import { isLoggedIn } from "../../global/authGuard.js";

export function displaySingleListing(listing) {
  const mainContainer = document.getElementById("single-listing");

  // Generate gallery
  const gallery =
    listing.media.length > 1
      ? listing.media
          .slice(1)
          .map(
            (media) => `
        <img src="${media.url}" alt="${media.alt || "Listing Media"}" class="gallery-image" />
      `,
          )
          .join("")
      : "<p>No additional media available for this listing.</p>";

  // Generate bids
  const bidsHTML =
    listing.bids && listing.bids.length
      ? listing.bids
          .map(
            (bid) => `
        <li class="bid-item">
          <span class="bid-amount">${bid.amount} credits</span>
          <span class="bid-time">(${new Date(bid.created).toLocaleString()})</span>
          <span class="bid-creator">${bid.bidder?.name || "Anonymous"}</span>
        </li>
      `,
          )
          .join("")
      : "<li class='bid-item'>No bids yet. Be the first to bid!</li>";

  const listingHTML = `
    ${outputListings(listing)}
    <p>${listing.description || "No description available"}</p>
    <div id="bid-list-container">
      <button id="bid-list-button" class="btn btn-primary">
        Recent Bids
      </button>
      <div id="bids-container" class="hidden">
        <ul id="bids-list">${bidsHTML}</ul>
      </div>
    </div>
    <div id="media-gallery">${gallery}</div>
    `;

  mainContainer.innerHTML = listingHTML;

  const toggleButton = document.getElementById("bid-list-button");
  const bidsContainer = document.getElementById("bids-container");

  toggleButton.addEventListener("click", () => {
    if (isLoggedIn()) {
      const isHidden = bidsContainer.classList.toggle("hidden");
      toggleButton.textContent = isHidden ? "Recent Bids" : "Hide Recent Bids";
    } else {
      showErrorAlert("You need to be logged in to view recent bids.");
    }
  });

  // Bid Form Insert Later (get headers = true (false else why)
}
async function initSingleListing() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    showErrorAlert("No listing ID was found");
    return;
  }

  try {
    const listing = await fetchSingleListing(listingId);
    displaySingleListing(listing);
  } catch (error) {
    console.error("Failed to load the detailed view of listing", error);
    showErrorAlert("Failed to load listing details. Please try again later.");
  }
}

document.addEventListener("DOMContentLoaded", initSingleListing);
