import { fetchListings } from "../../api/listing/listingService.js";
import { displayListings } from "../../components/listings/displayListings.js";
import { initializeSearch } from "../../components/search.js";

async function displayHome() {
  const listings = await fetchListings();
  displayListings(listings);
}

// Run the main function when the page loads
displayHome();
initializeSearch(
  "search-input",
  "search-button",
  "listings-container",
  "search-results-headline",
);
