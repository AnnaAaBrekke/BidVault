import { deleteListing } from "../api/listing/listingService.js";
import { showErrorAlert, showSuccessAlert } from "../global/alert.js";

export async function handleDelete(event) {
  if (!event.target.matches(".delete-button, .delete-button *")) {
    return; 
  }

  const button = event.target.closest(".delete-button");
  const listingId = button.getAttribute("data-listing-id");

  try {
    const confirmDelete = confirm(
      "Are you sure you want to delete this listing?",
    );
    if (!confirmDelete) {
      return;
    }

    await deleteListing(listingId);

    const listingElement = document.getElementById(`listing-${listingId}`);
    if (listingElement) listingElement.remove();
  } catch (error) {
    console.error("Error deleting listing:", error);
    showErrorAlert(
      "An error occurred while deleting the listing. Please try again.",
    );
  }
}
