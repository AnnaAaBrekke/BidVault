export function showSuccessAlert(message) {
  showAlert(message, "success");
}

export function showErrorAlert(message) {
  showAlert(message, "error");
}

/**
 * Displays an alert with the specified message and type (e.g., "success" or "error").
 * The alert fades out after 3 seconds.
 */
function showAlert(message, type) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert", `alert-${type}`);
  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.classList.add("show");
  }, 100);

  setTimeout(() => {
    alertContainer.classList.remove("show");
    alertContainer.classList.add("fade-out");
  }, 3000);

  setTimeout(() => {
    alertContainer.remove();
  }, 4000);
}
