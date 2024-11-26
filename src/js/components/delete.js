import { deleteListing } from "../api/listing/listingService.js";
import { showErrorAlert } from "../global/alert.js";

export async function handleDelete(event) {
  if (event.target.classList.contains("delete-button")) {
    const listingId = event.target.dataset.listingId;

    if (confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteListing(listingId);

        // Remove the listing element from the DOM
        document.querySelector(`#listing-${listingId}`).remove();
      } catch (error) {
        console.error("Failed to delete the listing:", error);
        showErrorAlert("Unable to delete the listing. Please try again later.");
      }
    }
  }
}
