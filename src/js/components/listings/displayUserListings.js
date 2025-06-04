import { listingService } from "../../api/services/listingService.js";
import { showErrorAlert } from "../../global/alert.js";
import { handleError } from "../../global/errorMessage.js";
import {
  hideCardLoaders,
  showCardLoaders,
} from "../../global/loaders/loaderCard.js";
import { handleDelete } from "../delete.js";
import { displayListings } from "./displayListings.js";

export async function displayUserListings(username) {
  showCardLoaders("listings-container", 6);
  try {
    const listings = await listingService.fetchListingsByUser(username);
    const listingsContainer = document.getElementById("listings-container");

    hideCardLoaders("listings-container");

    while (listingsContainer.firstChild) {
      listingsContainer.removeChild(listingsContainer.firstChild);
    }

    if (listings.length === 0) {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.textContent = "No listings created yet.";
      listingsContainer.appendChild(noListingsMessage);
      return;
    }

    displayListings(listings, true, false, true);

    listingsContainer.addEventListener("click", handleDelete);
  } catch (error) {
    hideCardLoaders("listings-container");
    await handleError(error, "fetching user listings");
  }
}
