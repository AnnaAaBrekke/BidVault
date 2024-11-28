import { handleDelete } from "../../components/delete.js";
import { isLoggedIn } from "../../global/authGuard.js";
import { fetchListingsByUser } from "./listingService.js";
import { getListingDetails, outputListings } from "./outputListing.js";
import FormHandler from "../../components/form/formHandler.js";
import { bidHandler } from "../../components/bid.js";
import { recentBidsToggle } from "../../components/buttons.js";
import { displayListings } from "./displayListings.js";

export function displaySingleListing(listing) {
  const mainContainer = document.getElementById("single-listing");

  // Additional elements not covered by "outputListings"
  // Gallery
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

  // Bids
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

  const { hasExpired } = getListingDetails(listing);

  // Bid Form
  const bidFormHTML =
    isLoggedIn() && !hasExpired
      ? `
    <div id="bid-form-container">
      <form id="bid-form" data-listing-id="${listing.id}">
        <label for="bid-amount">Place your bid:</label>
        <input type="number" id="bid-amount" name="bid-amount" min="1" required />
        <button type="submit" class="btn btn-primary">Place Bid</button>
      </form>
    </div>
  `
      : isLoggedIn()
        ? `  <button class="btn btn-secondary" disabled>Bid Closed</button>
        <p class='info-message'><a href='../../index.html' class='go-back-link'>Go back to listings</a>.</p>`
        : "<p>You need to log in to place a bid.</p>";

  const listingHTML = `
    ${outputListings(listing)} <!-- Shared layout -->
    
    <!-- Recent Bids -->
    <div id="bid-list-container">
      <button id="bid-list-button" class="btn btn-primary">
        Recent Bids
      </button>
      <div id="bids-container" class="hidden">
        <ul id="bids-list">${bidsHTML}</ul>
      </div>
    </div>

    <!-- Bid Form -->
    ${bidFormHTML}

    <!-- Description -->
    <p>${listing.description || "No description available"}</p>

    <!-- Gallery -->
    <div id="media-gallery">${gallery}</div>
  `;

  mainContainer.innerHTML = listingHTML;

  // Recent Bids
  recentBidsToggle("bid-list-button", "bids-container");

  // Initialize Bid Form if Active Auction
  if (isLoggedIn() && !hasExpired) {
    FormHandler.initialize("#bid-form", "bidOnListing");
    bidHandler();
  }
}

export async function displayUserListings(username) {
  try {
    const listings = await fetchListingsByUser(username);
    const listingsContainer = document.getElementById("listings-container");

    if (listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings created yet.</p>";
      return;
    }

    displayListings(listings, true);

    listingsContainer.addEventListener("click", handleDelete);
  } catch (error) {
    console.error("Failed to fetch user listings", error);
    document.getElementById("listings-container").innerHTML =
      "<p>Unable to fetch your listings. Please try again later.</p>";
  }
}
