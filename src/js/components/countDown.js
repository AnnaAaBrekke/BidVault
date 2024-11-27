export function updateCountdown(endDate, listingId) {
  const countdownElement = document.getElementById(`countdown-${listingId}`);
  if (!countdownElement) return; // If the countdown element is not found, exit the function

  const endTime = new Date(endDate).getTime();
  const now = new Date().getTime();
  const timeRemaining = endTime - now;

  if (timeRemaining <= 0) {
    countdownElement.textContent = "This auction has ended.";
    countdownElement.classList.add("expired");
  } else {
    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30.44)); // Estimate months (30.44 days in a month)
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)) % 30; // Remaining days after months
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
