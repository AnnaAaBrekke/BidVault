import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";
import { deleteListing } from "./listingService.js";

export async function onDeletePost(event) {
  const listingId = event.target.getAttribute("id");

  if (!listingId) {
    throw new Error("No post ID found in the button's data-id attribute.");
  }

  if (
    !confirm(`Are you sure you want to delete the post with ID ${listingId}?`)
  ) {
    return;
  }

  try {
    await deleteListing(listingId);
    showSuccessAlert(
      `Post with ID ${listingId} has been deleted successfully!`,
    );
    setTimeout(() => {
      window.location.href = "../../welcome.html";
    }, 2000);
  } catch (error) {
    if (error.message.includes("permission")) {
      showErrorAlert("You do not have permission to delete this post.");
    } else {
      showErrorAlert(`Failed to delete post: ${error.message}`);
    }
  }
}
