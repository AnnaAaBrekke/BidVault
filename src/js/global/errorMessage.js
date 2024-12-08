import { showErrorAlert } from "./alert.js";

/**
 * Handles errors by logging them, extracting relevant error messages, and displaying an alert to the user.
 *
 * @param {Error|Object} error - The error object or response containing details about the error.
 * @param {string} operation - A description of the operation during which the error occurred.
 * @async
 * @returns {Promise<void>} - Resolves when the error has been handled and displayed to the user.
 */
export async function handleError(error, operation) {
  console.error(`Error during ${operation}:`, error);

  let errorMessage = "An unexpected error occurred. Please try again.";

  if (error.response) {
    try {
      const errorData = await error.response.json();

      if (errorData && errorData.errors && errorData.errors.length > 0) {
        errorMessage = errorData.errors[0];
      } else if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      console.error("Error parsing response JSON:", e);
    }
  } else {
    errorMessage = error.message || errorMessage;
  }

  showErrorAlert(errorMessage);
}
