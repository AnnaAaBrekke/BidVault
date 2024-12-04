import { outputListings } from "./outputListing.js";

export function displayListings(listings, addDeleteButtons = false) {
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = ""; // Clear the container

  listings.forEach((listing) => {
    // Create the main listing container
    const listingDiv = document.createElement("div");
    listingDiv.id = `listing-${listing.id}`;
    listingDiv.classList.add("listing");

    // Add the listing content using outputListings
    const listingContent = document.createElement("div");
    listingContent.innerHTML = outputListings(listing);
    listingDiv.appendChild(listingContent);

    // Add the 'View Details' button
    const viewDetailsButton = document.createElement("a");
    viewDetailsButton.href = `../listing/?id=${listing.id}`;
    viewDetailsButton.classList.add("view-details-btn");
    viewDetailsButton.textContent = "View Details";
    listingDiv.appendChild(viewDetailsButton);

    // Optionally add the delete button
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
