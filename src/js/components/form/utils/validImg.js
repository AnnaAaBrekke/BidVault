import { showErrorAlert } from "../../../global/alert.js";

/**
 * Validates a single media URL or input field.
 * @param {string|HTMLInputElement} input - The media URL string or input field to validate.
 * @returns {boolean} - Returns `true` if the URL is valid, otherwise `false`.
 */
export function validateImageUrl(input) {
  const urlPattern = /^https:\/\/[^\s?]+(?:\?[^\s#]*)?$/i;
  let url = "";

  if (typeof input === "string") {
    url = input.trim();
  } else if (input instanceof HTMLInputElement) {
    url = input.value.trim();

    // Validate and provide feedback for input fields
    if (!url || !urlPattern.test(url)) {
      input.classList.add("border-red-500"); // Add red border
      showErrorAlert("The provided media URL is invalid.");
      return false;
    } else {
      input.classList.remove("border-red-500");
    }
  } else {
    console.error("Invalid parameter passed to validateImageUrl.");
    return false;
  }

  // Validate string URLs
  if (!urlPattern.test(url)) {
    showErrorAlert("The provided media URL is invalid.");
    return false;
  }

  return true;
}
