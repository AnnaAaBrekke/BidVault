import { hideCardLoaders, showCardLoaders } from "../../global/loader.js";
import { loadMoreListings } from "../pagnation.js";
import { outputListings } from "./outputListing.js";

export function displayListings(
  listings,
  addDeleteButtons = false,
  isLastPage,
  isSearchResults = false,
  isProfile = false,
  loading = false,
) {
  const listingsContainer = document.getElementById("listings-container");

  if (loading) {
    showCardLoaders("listings-container", 12);
    return;
  }

  hideCardLoaders("listings-container");

  let seeMoreButton = document.getElementById("see-more-btn");

  // If no "See More" button exists, clear the container before appending listings
  if (!seeMoreButton) {
    while (listingsContainer.firstChild) {
      listingsContainer.removeChild(listingsContainer.firstChild);
    }
  }

  // Render each listing
  listings.forEach((listing) => {
    const listingDiv = document.createElement("div");
    listingDiv.id = `listing-${listing.id}`;
    listingDiv.classList.add("listing");

    const listingContent = outputListings(listing);
    listingDiv.appendChild(listingContent);

    const viewDetailsButton = document.createElement("a");
    viewDetailsButton.href = `../listing/?id=${listing.id}`;
    viewDetailsButton.classList.add("view-details-btn");
    viewDetailsButton.textContent = "View Details";
    listingDiv.appendChild(viewDetailsButton);

    if (addDeleteButtons) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-listing-id", listing.id);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-xmark");
      deleteButton.appendChild(deleteIcon);

      listingDiv.appendChild(deleteButton);
    }

    listingsContainer.appendChild(listingDiv);
  });

  // Remove the existing "See More" button (if any) and recreate it
  if (seeMoreButton) {
    seeMoreButton.remove();
  }

  // Handle "See More" button placement
  if (!isProfile && !isSearchResults) {
    if (!isLastPage) {
      seeMoreButton = document.createElement("button");
      seeMoreButton.id = "see-more-btn";
      seeMoreButton.textContent = "See More";
      seeMoreButton.classList.add("see-more-btn");
      seeMoreButton.addEventListener("click", loadMoreListings);

      // Append the button after all the listings
      listingsContainer.appendChild(seeMoreButton);
    }
  }
}
