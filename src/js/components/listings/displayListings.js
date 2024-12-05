import { outputListings } from "./outputListing.js";

export function displayListings(listings, addDeleteButtons = false) {
  const listingsContainer = document.getElementById("listings-container");

  // Clear the container
  while (listingsContainer.firstChild) {
    listingsContainer.removeChild(listingsContainer.firstChild);
  }

  listings.forEach((listing) => {
    // main listing container
    const listingDiv = document.createElement("div");
    listingDiv.id = `listing-${listing.id}`;
    listingDiv.classList.add("listing");

    //  listing content using outputListings
    const listingContent = outputListings(listing); // Now returns a DOM element
    listingDiv.appendChild(listingContent);

    // 'View Details' button
    const viewDetailsButton = document.createElement("a");
    viewDetailsButton.href = `../listing/?id=${listing.id}`;
    viewDetailsButton.classList.add("view-details-btn");
    viewDetailsButton.textContent = "View Details";
    listingDiv.appendChild(viewDetailsButton);

    // Delete button
    if (addDeleteButtons) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-listing-id", listing.id);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-xmark");
      deleteButton.appendChild(deleteIcon);

      listingDiv.appendChild(deleteButton);
    }

    // Append the listing to the container
    listingsContainer.appendChild(listingDiv);
  });
}
