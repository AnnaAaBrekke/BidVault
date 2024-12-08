// SOURCE: https://medium.com/geekculture/23-javascript-countdown-timer-for-website-273efc2f5618

/**
 * Updates the countdown timer for an auction.
 * @param {string} endDate - The end date and time of the auction in ISO format.
 * @param {string} listingId - The unique identifier for the listing.
 */
export function updateCountdown(endDate, listingId) {
  const countdownElement = document.getElementById(`countdown-${listingId}`);
  if (!countdownElement) return;

  const endTime = new Date(endDate).getTime();
  const now = new Date().getTime();
  const timeRemaining = endTime - now;

  if (timeRemaining <= 0) {
    countdownElement.textContent = "This auction has ended.";
    countdownElement.classList.add("expired");
  } else {
    // Copied from ChatGPT:
    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)) % 30;
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    let countdownText = "";

    // Display months if greater than 0
    if (months > 0) {
      countdownText += `${months} month${months > 1 ? "s" : ""}, `;
      // Do not include seconds if months
      countdownText += `${days} day${days !== 1 ? "s" : ""}, ${hours}h ${minutes}m`;
    } else {
      // Include seconds when no months
      countdownText += `${days} day${days !== 1 ? "s" : ""}, ${hours}h ${minutes}m ${seconds}s`;
    }

    countdownElement.textContent = `Ends in: ${countdownText}`;
  }
}
