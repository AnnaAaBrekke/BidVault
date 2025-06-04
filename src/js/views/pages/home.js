import { loadMoreListings } from "../../components/pagination.js";
import { initializeSearch } from "../../components/search.js";

loadMoreListings();

initializeSearch(
  "search-input",
  "search-button",
  "listings-container",
  "search-results-headline",
);
