import { loadMoreListings } from "../../components/pagnation.js";
import { initializeSearch } from "../../components/search.js";
import { hideCardLoader, showCardLoader } from "../../global/loader.js";

// Show the skeleton loader initially
showCardLoader("listings-container", 12); // Display 6 skeleton loaders

// Load the first batch of listings
loadMoreListings()
  .then(() => {
    // Hide the skeleton loader once listings are loaded
    hideCardLoader("listings-container");
  })
  .catch((error) => {
    console.error("Error loading the initial listings:", error);
    hideCardLoader("listings-container"); // Hide loader even if there's an error
  });

// Initialize search functionality
initializeSearch(
  "search-input",
  "search-button",
  "listings-container",
  "search-results-headline",
);
