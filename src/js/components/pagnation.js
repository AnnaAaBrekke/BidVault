import { listingService } from "../api/services/listingService.js";
import {
  hideCardLoaders,
  showCardLoaders,
} from "../global/loaders/loaderCard.js";
import { displayListings } from "./listings/displayListings.js";

let currentPage = 1;
const itemsPerPage = 12;
let isLastPage = false;
let allListings = [];

/**
 * Loads more listings when the user requests or scrolls to the end.
 * Fetches additional listings from the service and displays them,
 * handling pagination dynamically.
 */
export async function loadMoreListings() {
  if (isLastPage) return;

  try {
    showCardLoaders("listings-container", 12);

    // Fetch listings for the current page
    const listings = await listingService.fetchListings(
      currentPage,
      itemsPerPage,
    );

    if (listings.length < itemsPerPage) {
      isLastPage = true;
    }

    allListings = [...allListings, ...listings];

    hideCardLoaders("listings-container");

    displayListings(allListings, false, isLastPage, false);

    currentPage += 1;
  } catch (error) {
    console.error("Error loading more listings:", error);
    hideCardLoaders("listings-container");
  }
}
