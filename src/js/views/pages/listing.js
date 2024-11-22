import { fetchSingleListing } from "../../api/listing/listingService";
import { showErrorAlert } from "../../global/alert";

export function displaySingleListing(listing) {
  // Media (one)
  const mainListingImg = document.getElementById("media-item");
  const mainListingImgUrl =
    listing.media.length > 0
      ? listing.media[0].url
      : "../../src/images/logo.jpg";
  mainListingImg.innerHTML = `
    <img src="${mainListingImgUrl}" alt="${listing.title}"/>
  `;

  // Title
  document.getElementById("listing-title").textContent = listing.title;

  // Seller/Author with Avatar
  const sellerElement = document.createElement("p");
  sellerElement.innerHTML = `
    <img
      src="${listing.seller?.avatar.url || "../../src/images/avatar.jpg"}"
      alt="${listing.seller?.avatar.alt || "Seller"}'s avatar"
      class="seller-avatar"
    />
    <strong>${listing.seller?.name || "Unknown Seller"}</strong>
  `;
  document.getElementById("listing-details-section").appendChild(sellerElement);

  // Deadline
  document.getElementById("deadline").textContent = new Date(
    listing.endsAt,
  ).toLocaleString();

  // Current Bid
  const currentBid =
    listing.bids.length > 0
      ? Math.max(...listing.bids.map((bid) => bid.amount))
      : 0;
  const currentBidElement = document.createElement("p");
  currentBidElement.innerHTML = `<strong>Current Bid:</strong> ${currentBid} credits`;
  document.getElementById("bids-section").prepend(currentBidElement);

  // Recent Bids
  const bidsList = document.getElementById("bids-list");
  bidsList.innerHTML = listing.bids.length
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

  // Bid form

  // Descripton

  document.getElementById("listing-description").textContent =
    listing.description || "No description available.";

  // Media Gallery
  const mediaGallery = document.getElementById("media-gallery");
  mediaGallery.innerHTML = listing.media.length
    ? listing.media
        .slice(1) // Skipping the frist image main
        .map(
          (media) => `
        <img
          src="${media.url}"
          alt="${media.alt || "Listing Media"}"
          class="gallery-image"
        />
      `,
        )
        .join("")
    : "<p>No media available for this listing.</p>";
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
  }
}

document.addEventListener("DOMContentLoaded", initSingleListing);
