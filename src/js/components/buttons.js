import { showErrorAlert } from "../global/alert";
import { isLoggedIn } from "../global/authGuard";

export function recentBidsToggle(toggleButtonId, bidsContainerId) {
  const toggleButton = document.getElementById(toggleButtonId);
  const bidsContainer = document.getElementById(bidsContainerId);

  if (!toggleButton || !bidsContainer) {
    console.warn("Toggle button or bids container not found.");
    return;
  }

  toggleButton.addEventListener("click", () => {
    if (isLoggedIn()) {
      const isHidden = bidsContainer.classList.toggle("hidden");
      toggleButton.textContent = isHidden ? "Recent Bids" : "Hide Recent Bids";
    } else {
      showErrorAlert("You need to be logged in to view recent bids.");
    }
  });
}
