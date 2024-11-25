import { searchListings } from "../api/listing/listingService.js";
import { showErrorAlert } from "../global/alert.js";
import { displayListings } from "../views/pages/listings.js";

/**
 * Initializes the search functionality for a page.
 * @param {string} searchInputId - The ID of the search input element.
 * @param {string} searchButtonId - The ID of the search button element.
 * @param {string} listingsContainerId - The ID of the container to display search results.
 * @param {string} searchHeadlineId - The ID of the search results headline element.
 */
export function initializeSearch(
  searchInputId,
  searchButtonId,
  listingsContainerId,
  searchHeadlineId,
) {
  const searchInput = document.getElementById(searchInputId);
  const searchButton = document.getElementById(searchButtonId);
  const listingsContainer = document.getElementById(listingsContainerId);
  const searchHeadline = document.getElementById(searchHeadlineId);

  const updateHeadline = (query, resultsCount) => {
    if (resultsCount > 0) {
      searchHeadline.textContent = `Search Results for "${query}" (${resultsCount} found)`;
      searchHeadline.classList.remove("hidden");
    } else {
      searchHeadline.textContent = `No results found for "${query}"`;
      searchHeadline.classList.remove("hidden");
    }
  };

  const handleSearch = async () => {
    const query = searchInput.value.trim();
    if (!query) {
      showErrorAlert("Please enter your search.");
      return;
    }
    try {
      const results = await searchListings(query);
      updateHeadline(query, results.length);
      if (results.length === 0) {
        listingsContainer.innerHTML = "<p>No results found.</p>";
      } else {
        displayListings(results);
      }
    } catch (error) {
      console.error("Search error:", error);
      listingsContainer.innerHTML = "<p>An error occurred while searching.</p>";
    }
  };

  // Event listener for search button on click
  searchButton.addEventListener("click", handleSearch);

  // Event listener for keypress (Enter key)
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });
}
