import { loadMoreListings } from "../../components/pagnation.js";
import { initializeSearch } from "../../components/search.js";

// Load the first batch of listings
loadMoreListings();

initializeSearch(
  "search-input",
  "search-button",
  "listings-container",
  "search-results-headline",
);
