import { fetchSingleListing } from "../../api/listing/listingService";
import { showErrorAlert } from "../../global/alert";

export function displaySingleListing(listing) {
  document.getElementById("listing-title").textContent = listing.title;
  document.getElementById("listing-description").textContent =
    listing.description || "No description available.";
  document.getElementById("deadline").textContent = new Date(
    listing.endsAt,
  ).toLocaleString();

  // Bids

  // Media

  // Bid form
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
