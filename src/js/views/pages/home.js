import { loadMoreListings } from "../../components/pagnation.js";
import { initializeSearch } from "../../components/search.js";

loadMoreListings();

initializeSearch(
  "search-input",
  "search-button",
  "listings-container",
  "search-results-headline",
);
