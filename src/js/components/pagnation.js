import { listingService } from "../api/services/listingService.js";
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
    // Fetch listings for the current page
    const listings = await listingService.fetchListings(
      currentPage,
      itemsPerPage,
    );

    // Check if it's the last page based on the response
    if (listings.length < itemsPerPage) {
      isLastPage = true;
    }

    // Display the fetched listings
    displayListings(listings, false, isLastPage, false);

    // Increment the page counter after successfully loading listings
    currentPage += 1;

    // If "See More" button exists, ensure the event listener is attached
    const seeMoreButton = document.getElementById("see-more-btn");
    if (seeMoreButton) {
      seeMoreButton.addEventListener("click", loadMoreListings);
    }
  } catch (error) {
    console.error("Error loading more listings:", error);
  }
}
