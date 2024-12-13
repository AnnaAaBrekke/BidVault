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
    // Calculate time components -  chatGPT created this
    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((timeRemaining / (1000 * 60 * 60 * 24)) % 30);
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Clear the existing content
    countdownElement.innerHTML = "";

    const createBox = (label, value) => {
      const box = document.createElement("div");
      box.classList.add("countdown-box");

      const valueElement = document.createElement("span");
      valueElement.textContent = value;
      valueElement.classList.add("countdown-value");

      const labelElement = document.createElement("span");
      labelElement.textContent = label;
      labelElement.classList.add("countdown-label");

      box.appendChild(valueElement);
      box.appendChild(labelElement);

      return box;
    };

    // Add countdown boxes in a row layout
    const row = document.createElement("div");
    row.classList.add("countdown-row");

    if (months > 0) {
      row.appendChild(createBox(" Months", months));
    }
    row.appendChild(createBox(" Days", days));
    row.appendChild(createBox(`${hours}h ${minutes}m ${seconds}s`));

    countdownElement.appendChild(row);
  }
}
