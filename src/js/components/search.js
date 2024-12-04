import { displayListings } from "../api/listing/displayListings.js";
import { searchListings } from "../api/listing/listingService.js";
import { showErrorAlert } from "../global/alert.js";

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
    searchHeadline.textContent =
      resultsCount > 0
        ? `Search Results for "${query}" (${resultsCount} found)`
        : `No results found for "${query}"`;
    searchHeadline.classList.remove("hidden");
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

      // Clear previous results
      listingsContainer.textContent = "";

      if (results.length === 0) {
        // Create a "no results" message dynamically
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No listings found for this search.";
        listingsContainer.appendChild(noResultsMessage);
      } else {
        // Display search results
        displayListings(results);
      }
    } catch (error) {
      console.error(error, "searching listings");

      // Create an error message dynamically
      listingsContainer.textContent = ""; // Clear container
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "An error occurred while searching.";
      listingsContainer.appendChild(errorMessage);
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
