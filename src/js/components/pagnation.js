import { listingService } from "../api/services/listingService.js";
import { displayListings } from "./listings/displayListings.js";

let currentPage = 1;
const itemsPerPage = 12;
let isLastPage = false;

/**
 * Loads more listings when the user reaches the end of the current page.
 * Fetches additional listings from the service and displays them,
 * marking if the last page is reached based on the response.
 */
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
