import { displayListings } from "../../views/pages/listings.js";
import { fetchListingsByUser, deleteListing } from "./listingService.js";

export async function displayUserListings(username) {
  try {
    const listings = await fetchListingsByUser(username);
    const listingsContainer = document.getElementById("listings-container");

    if (listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings created yet.</p>";
      return;
    }

    // Use the existing displayListings function
    displayListings(listings, true);

    // Add event listener for delete buttons
    listingsContainer.addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete-button")) {
        const listingId = event.target.dataset.listingId;

        if (confirm("Are you sure you want to delete this listing?")) {
          try {
            await deleteListing(listingId);

            // Remove listing from the DOM
            document.querySelector(`#listing-${listingId}`).remove();
          } catch (error) {
            console.error("Failed to delete the listing:", error);
            alert("Unable to delete the listing. Please try again later.");
          }
        }
      }
    });
  } catch (error) {
    console.error("Failed to fetch user listings", error);
    document.getElementById("listings-container").innerHTML =
      "<p>Unable to fetch your listings. Please try again later.</p>";
  }
}
