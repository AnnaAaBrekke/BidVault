import { fetchListings } from "../../api/listing/listingService.js";
import { displayListings } from "../../components/listings/displayListings.js";
import { initializeSearch } from "../../components/search.js";

async function displayHome() {
  const listings = await fetchListings();

  // Sort listings by date created (newest first)
  const sortedListings = listings.sort(
    (a, b) => new Date(b.created) - new Date(a.created),
  );
  // 12 most recent listings
  const recentListings = sortedListings.slice(0, 12);

  displayListings(recentListings);
}

displayHome();
initializeSearch(
  "search-input",
  "search-button",
  "listings-container",
  "search-results-headline",
);
