import { listingService } from "../api/services/listingService.js";
import { displayListings } from "./listings/displayListings.js";

// Define state variables
let currentPage = 1; // Tracks the current page
const itemsPerPage = 12; // Number of items per page
let isLastPage = false; // Tracks if the last page has been reached

export async function loadMoreListings() {
  if (isLastPage) return; // Exit if already on the last page

  const listings = await listingService.fetchListings(
    currentPage,
    itemsPerPage,
  );

  if (listings.length < itemsPerPage) {
    // If fewer items are returned, we've reached the last page
    isLastPage = true;
  }

  // Pass `isLastPage` to displayListings
  displayListings(listings, false, isLastPage);
  currentPage += 1; // Increment page count
}
