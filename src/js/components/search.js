import { listingService } from "../api/services/listingService.js";
import { showErrorAlert } from "../global/alert.js";
import { displayListings } from "./listings/displayListings.js";
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

  let clearButton;

  /**
   * Updates the search headline with the query and results count.
   * @param {string} query - The search query entered by the user.
   * @param {number} resultsCount - The number of results returned by the search.
   */
  const updateHeadline = (query, resultsCount) => {
    searchHeadline.textContent =
      resultsCount > 0
        ? `Search Results for "${query}" (${resultsCount} found)`
        : `No results found for "${query}"`;
    searchHeadline.classList.remove("hidden");
  };

  /**
   * Handles the search functionality by fetching results based on the user's query.
   * Displays the results or a message if no results are found.
   */
  const handleSearch = async () => {
    const query = searchInput.value.trim();
    if (!query) {
      showErrorAlert("Please enter your search.");
      return;
    }

    try {
      const results = await listingService.searchListings(query);
      updateHeadline(query, results.length);

      listingsContainer.textContent = "";

      if (results.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No listings found for this search.";
        listingsContainer.appendChild(noResultsMessage);
      } else {
        displayListings(results);
      }

      if (!clearButton) {
        clearButton = document.createElement("button");
        clearButton.textContent = "X";
        clearButton.classList.add("clear-button");
        listingsContainer.parentElement.insertBefore(
          clearButton,
          listingsContainer,
        );
        clearButton.addEventListener("click", handleClear);
      }
    } catch (error) {
      console.error(error, "searching listings");

      listingsContainer.textContent = "";
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "An error occurred while searching.";
      listingsContainer.appendChild(errorMessage);
    }
  };

  /**
   * Handles clearing the search results and redirects the user to the home page.
   */
  const handleClear = () => {
    window.location.href = "/";
  };

  // Event listeners for search functionality
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });
}
