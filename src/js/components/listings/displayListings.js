import { loadMoreListings } from "../pagnation.js";
import { outputListings } from "./outputListing.js";

export function displayListings(
  listings,
  addDeleteButtons = false,
  isLastPage,
  isSearchResults = false,
  isProfile = false,
) {
  const listingsContainer = document.getElementById("listings-container");
  // Render each listing
  listings.forEach((listing) => {
    const listingDiv = document.createElement("div");
    listingDiv.id = `listing-${listing.id}`;
    listingDiv.classList.add("listing");

    const listingContent = outputListings(listing, false);
    listingDiv.appendChild(listingContent);

    if (addDeleteButtons) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-listing-id", listing.id);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("delete-icon", "fa-solid", "fa-trash");
      deleteButton.appendChild(deleteIcon);

      listingContent.appendChild(deleteButton);
    }

    listingsContainer.appendChild(listingDiv);
  });

  let seeMoreButton = document.getElementById("see-more-btn");

  // Remove the existing "See More" button (if any) and recreate it
  if (seeMoreButton) {
    seeMoreButton.remove();
  }

  // Handle "See More" button placement
  if (!isProfile && !isSearchResults && !isLastPage) {
    if (!isLastPage) {
      seeMoreButton = document.createElement("button");
      seeMoreButton.id = "see-more-btn";
      seeMoreButton.textContent = "See More";
      seeMoreButton.classList.add("button", "see-more-btn");
      seeMoreButton.addEventListener("click", loadMoreListings);

      // Append the button after all the listings
      listingsContainer.appendChild(seeMoreButton);
    }
  }
}
