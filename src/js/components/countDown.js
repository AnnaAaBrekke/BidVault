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
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownElement.textContent = `Ends in: ${hours}h ${minutes}m ${seconds}s`;
  }
}
