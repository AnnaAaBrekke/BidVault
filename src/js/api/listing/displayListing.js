import { displayListings } from "../../views/pages/listings.js";
import { fetchListingsByUser } from "./listingService.js";

export async function displayUserListings(username) {
  try {
    const listings = await fetchListingsByUser(username);
    const listingsContainer = document.getElementById("listings-container");

    if (listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings created yet.</p>";
      return;
    }

    // Use the existing displayListings function
    displayListings(listings);
  } catch (error) {
    console.error("Failed to fetch user listings", error);
    document.getElementById("listings-container").innerHTML =
      "<p>Unable to fetch your listings. Please try again later.</p>";
  }
}
