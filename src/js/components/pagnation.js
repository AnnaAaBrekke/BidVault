import { listingService } from "../api/services/listingService.js";
import { displayListings } from "./listings/displayListings.js";

// Define state variables
let currentPage = 1; // Tracks the current page
const itemsPerPage = 12; // Number of items per page
let isLastPage = false; // Tracks if the last page has been reached

export async function loadMoreListings() {
  if (isLastPage) return;

  const listings = await listingService.fetchListings(
    currentPage,
    itemsPerPage,
  );

  if (listings.length < itemsPerPage) {
    isLastPage = true;
  }

  // Pass `false` for `isSearchResults`
  displayListings(listings, false, isLastPage, false);
  currentPage += 1;
}
