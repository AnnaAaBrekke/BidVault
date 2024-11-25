import { searchListings } from "../api/listing/listingService.js";
import { showErrorAlert } from "../global/alert.js";
import { displayListings } from "../views/pages/listings.js";

/**
 * Initializes the search functionality for a page.
 * @param {string} searchInputId - The ID of the search input element.
 * @param {string} searchButtonId - The ID of the search button element.
 * @param {string} listingsContainerId - The ID of the container to display search results.
 */
export function initializeSearch(
  searchInputId,
  searchButtonId,
  listingsContainerId,
) {
  const searchInput = document.getElementById(searchInputId);
  const searchButton = document.getElementById(searchButtonId);
  const listingsContainer = document.getElementById(listingsContainerId);

  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) {
      showErrorAlert("Please enter your search.");
      return;
    }
    try {
      const results = await searchListings(query);
      if (results.length === 0) {
        listingsContainer.innerHTML = "<p>No results found.</p>";
      } else {
        displayListings(results);
      }
    } catch (error) {
      console.error("Search error:", error);
      listingsContainer.innerHTML = "<p>An error occurred while searching.</p>";
    }
  });
}
