import { fetchSingleListing } from "../../api/listing/listingService.js";
import { showErrorAlert } from "../../global/alert.js";

export function displaySingleListing(listing) {
  // Main Media (Firs Image in Media Gallery)
  const mainListingImg = document.getElementById("media-item");
  const mainListingImgUrl =
    listing.media && listing.media.length > 0
      ? listing.media[0].url
      : "../../src/images/logo.jpg";
  mainListingImg.innerHTML = `
    <img src="${mainListingImgUrl}" alt="${listing.title}" class="main-listing-image" />
  `;

  // Title
  const titleElement = document.getElementById("listing-title");
  titleElement.textContent = listing.title;

  // Seller/Author with Avatar
  const sellerContainer = document.getElementById("seller-container");
  sellerContainer.innerHTML = `
    <img
      src="${listing.seller?.avatar?.url || "../../src/images/avatar.jpg"}"
      alt="${listing.seller?.name || "Seller"}'s avatar"
      class="seller-avatar"
    />
    <p><strong>${listing.seller?.name || "Unknown Seller"}</strong></p>
  `;

  // Deadline
  const deadlineElement = document.getElementById("deadline");
  deadlineElement.textContent = listing.endsAt
    ? new Date(listing.endsAt).toLocaleString()
    : "No deadline specified.";

  // Current Bid
  const currentBidAmount =
    listing.bids && listing.bids.length > 0
      ? Math.max(...listing.bids.map((bid) => bid.amount))
      : 0;
  const currentBidElement = document.createElement("p");
  currentBidElement.innerHTML = `<strong>Current Bid:</strong> ${currentBidAmount} credits`;
  const bidsSection = document.getElementById("bids-section");
  bidsSection.prepend(currentBidElement);

  // Recent Bids
  const bidsList = document.getElementById("bids-list");
  bidsList.innerHTML =
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

  // Bid Form Insert Later

  // Description
  const descriptionElement = document.getElementById("listing-description");
  descriptionElement.textContent =
    listing.description || "No description available.";

  // Media Gallery
  const mediaGallery = document.getElementById("media-gallery");
  if (listing.media && listing.media.length > 1) {
    const galleryImages = listing.media
      .slice(1) // Skip the first image
      .map(
        (media) => `
          <img
            src="${media.url}"
            alt="${media.alt || "Listing Media"}"
            class="gallery-image"
          />
        `,
      )
      .join("");
    mediaGallery.innerHTML = galleryImages;
  } else {
    mediaGallery.innerHTML =
      "<p>No additional media available for this listing.</p>";
  }
}

async function initSingleListing() {
  // Might make this global later
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
