import { bidOnListing } from "../api/listing/listingService.js";
import { showErrorAlert, showSuccessAlert } from "../global/alert.js";

/**
 * Handles the bid action on a listing.
 *
 * @param {Event} event - The event triggered by clicking the bid button.
 */
export async function bidHandler(event) {
  if (!event.target.classList.contains("bid-button")) return;

  const listingId = event.target.dataset.listingId;

  if (!listingId) {
    showErrorAlert("Listing ID is missing. Please try again.");
    return;
  }

  // Prompt user for bid amount
  const bidAmount = prompt("Enter your bid amount:");

  if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
    showErrorAlert("Invalid bid amount. Please enter a positive number.");
    return;
  }

  const amount = parseFloat(bidAmount);

  // Confirm bid
  if (!confirm(`Are you sure you want to place a bid of ${amount} credits?`)) {
    return;
  }

  try {
    // Call the service function to place the bid
    await bidOnListing(listingId, amount);

    showSuccessAlert(
      `Your bid of ${amount} credits has been successfully placed!`,
    );

    // Optionally reload to reflect updated bids
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Failed to place bid:", error);
    showErrorAlert("Unable to place the bid. Please try again.");
  }
}
