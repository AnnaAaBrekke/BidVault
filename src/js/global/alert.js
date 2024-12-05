export function showSuccessAlert(message) {
  showAlert(message, "success");
}

export function showErrorAlert(message) {
  showAlert(message, "error");
}

function showAlert(message, type) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert", `alert-${type}`);
  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.classList.add("show");
  }, 500);

  setTimeout(() => {
    alertContainer.classList.remove("show");
    alertContainer.classList.add("fade-out");
  }, 3000);

  setTimeout(() => {
    alertContainer.remove();
  }, 4000);
}
