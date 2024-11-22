import { fetchListings } from "../../api/listing/listingService.js";
import { displayListings } from "./listings.js";

// Main Function to Fetch and Display Listings
async function main() {
  const listings = await fetchListings();
  displayListings(listings);
}

// Run the main function when the page loads
document.addEventListener("DOMContentLoaded", main);
