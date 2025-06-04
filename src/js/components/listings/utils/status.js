import { updateCountdown } from "./countDown";

/**
 * Renders the countdown or closed message.
 * @param {HTMLElement} container - The container to append the countdown or message.
 * @param {boolean} hasExpired - Whether the auction has ended.
 * @param {string} endDate - The end date and time of the auction in ISO format.
 * @param {string} listingId - The unique identifier for the listing.
 */
export function renderAuctionStatus(container, hasExpired, endDate, listingId) {
  if (hasExpired) {
    const closedMessage = document.createElement("p");
    closedMessage.classList.add("closed-message");
    closedMessage.textContent = "This auction has ended.";
    container.appendChild(closedMessage);
  } else {
    const countdownLabel = document.createElement("span");
    countdownLabel.textContent = "Auction Ends In:";
    countdownLabel.classList.add("countdown-label");

    const countdown = document.createElement("span");
    countdown.id = `countdown-${listingId}`;
    countdown.classList.add("countdown-timer");

    container.appendChild(countdownLabel);
    container.appendChild(countdown);

    updateCountdown(endDate, listingId);
    setInterval(() => updateCountdown(endDate, listingId), 1000);
  }
}
