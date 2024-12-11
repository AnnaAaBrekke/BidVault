import { listingService } from "../../api/services/listingService";
import { showErrorAlert } from "../../global/alert";
import { handleDelete } from "../delete";
import { displayListings } from "./displayListings";

export async function displayUserListings(username) {
  try {
    const listings = await listingService.fetchListingsByUser(username);
    const listingsContainer = document.getElementById("listings-container");

    while (listingsContainer.firstChild) {
      listingsContainer.removeChild(listingsContainer.firstChild);
    }

    if (listings.length === 0) {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.textContent = "No listings created yet.";
      listingsContainer.appendChild(noListingsMessage);
      return;
    }

    displayListings(listings, true, false, false, true);

    listingsContainer.addEventListener("click", handleDelete);
  } catch (error) {
    console.error("Failed to fetch user listings:", error);
    showErrorAlert(
      "Unable to fetch your listings. Please try to reload the page.",
    );
  }
}
