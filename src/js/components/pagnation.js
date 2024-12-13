import { listingService } from "../api/services/listingService.js";
import {
  hideCardLoaders,
  showCardLoaders,
} from "../global/loaders/loaderCard.js";
import { displayListings } from "./listings/displayListings.js";

let currentPage = 1; // Tracks the current page
const itemsPerPage = 12; // Number of items per page
let isLastPage = false; // Tracks if the last page is reached

/**
 * Loads more listings when the user requests or scrolls to the end.
 * Fetches additional listings from the service and displays them,
 * handling pagination dynamically.
 */
export async function loadMoreListings() {
  if (isLastPage) return; // Stop if no more pages are available

  try {
    showCardLoaders("listings-container", 12);
    // Fetch listings for the current page
    const listings = await listingService.fetchListings(
      currentPage,
      itemsPerPage,
    );
    console.log(`Fetched listings for page ${currentPage}:`, listings);

    // Check if it's the last page based on the response
    if (listings.length < itemsPerPage) {
      isLastPage = true;
    }
    hideCardLoaders("listings-container");

    // Display the fetched listings
    displayListings(listings, false, isLastPage, false), false; // Render data

    // Increment the page counter after successfully loading listings
    currentPage += 1;
  } catch (error) {
    console.error("Error loading more listings:", error);
    hideCardLoaders("listings-container");
  }
}
