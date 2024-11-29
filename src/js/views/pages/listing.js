import { displaySingleListing } from "../../api/listing/displayListing.js";
import { fetchSingleListing } from "../../api/listing/listingService.js";
import { showErrorAlert } from "../../global/alert.js";

async function initSingleListing() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    console.error("No listing ID provided in query string");
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

initSingleListing();
