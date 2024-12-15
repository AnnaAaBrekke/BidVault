import { loadMoreListings } from "../pagnation.js";
import { outputListings } from "./outputListing.js";

export function displayListings(
  listings,
  isUserListings = false,
  isLastPage = false,
  isSearchResults = false,
  isProfile = false,
) {
  const listingsContainer = document.getElementById("listings-container");
  listings.forEach((listing) => {
    const listingDiv = document.createElement("div");
    listingDiv.id = `listing-${listing.id}`;
    listingDiv.classList.add("listing");

    const listingContent = outputListings(listing, false);
    listingDiv.appendChild(listingContent);

    // Add delete button only for user listings
    if (isUserListings) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-listing-id", listing.id);
      deleteButton.setAttribute(
        "aria-label",
        `Delete listing with ID ${listing.id}`,
      );

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("delete-icon", "fa-solid", "fa-trash");
      deleteButton.appendChild(deleteIcon);

      listingContent.appendChild(deleteButton);
    }

    listingsContainer.appendChild(listingDiv);
  });

  let seeMoreButton = document.getElementById("see-more-btn");

  if (seeMoreButton) {
    seeMoreButton.remove();
  }

  if (!isProfile && !isSearchResults && !isLastPage) {
    if (!isLastPage) {
      // "See More" button
      const seeMoreContainer = document.createElement("div");
      seeMoreContainer.classList.add("see-more-container");

      seeMoreButton = document.createElement("button");
      seeMoreButton.id = "see-more-btn";
      seeMoreButton.textContent = "Next Page";
      seeMoreButton.classList.add("button", "see-more-btn");

      seeMoreButton.addEventListener("click", loadMoreListings);

      seeMoreContainer.appendChild(seeMoreButton);

      listingsContainer.parentElement.appendChild(seeMoreContainer);
    }
  }
}
