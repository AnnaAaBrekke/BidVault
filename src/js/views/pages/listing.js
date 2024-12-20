import { listingService } from "../../api/services/listingService.js";
import { displaySingleListing } from "../../components/listings/displayListing.js";
import { showErrorAlert } from "../../global/alert.js";
import { handleError } from "../../global/errorMessage.js";

async function initSingleListing() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    console.error("No listing ID provided in query string");
    showErrorAlert("No listing ID was found");
    return;
  }

  try {
    const listing = await listingService.fetchSingleListing(listingId);
    displaySingleListing(listing);
  } catch (error) {
    handleError(error, "loading listing details");
    throw error;
  }
}

initSingleListing();
