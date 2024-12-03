import { bidOnListing } from "../api/listing/listingService.js";
import { showErrorAlert, showSuccessAlert } from "../global/alert.js";
import { handleError } from "../global/errorMessage";

/**
 * Handles the bid action on a listing.
 */
export function bidHandler() {
  const bidForm = document.getElementById("bid-form");

  if (!bidForm) {
    console.error("Bid form not found");
    return;
  }

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const listingId = bidForm.dataset.listingId;
    const bidAmountInput = bidForm.querySelector("#bid-amount");
    const bidAmount = bidAmountInput.value;

    if (!listingId) {
      showErrorAlert("Listing ID is missing. Please try again.");
      return;
    }

    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
      showErrorAlert("Invalid bid amount. Please enter a positive number.");
      return;
    }

    const amount = parseFloat(bidAmount);

    if (
      !confirm(`Are you sure you want to place a bid of ${amount} credits?`)
    ) {
      return;
    }

    try {
      await bidOnListing(listingId, amount);

      showSuccessAlert(
        `Your bid of ${amount} credits has been successfully placed!`,
      );

      bidAmountInput.value = "";
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      handleError(error, "bidding");
    }
  });
}
