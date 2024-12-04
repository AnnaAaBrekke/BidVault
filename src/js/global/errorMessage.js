import { showErrorAlert } from "./alert.js";

/**
 * Handle errors by showing an error alert with the appropriate message.
 *
 * @param {Error} error - The error object.
 * @param {string} operation - The operation that failed.
 */
export async function handleError(error, operation) {
  console.error(`Error during ${operation}:`, error);

  let errorMessage = "An unexpected error occurred. Please try again.";

  if (error.response) {
    try {
      const errorData = await error.response.json(); // Assuming the response is JSON

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
