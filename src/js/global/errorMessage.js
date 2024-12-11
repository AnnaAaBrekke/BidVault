import { showErrorAlert } from "./alert.js";

/**
 * Handles errors by extracting relevant messages and displaying a user-friendly alert.
 *
 * @param {Error|Object} error - The error object or response containing details about the error.
 * @param {string} operation - A description of the operation during which the error occurred.
 * @async
 * @returns {Promise<string>} - Resolves with the extracted error message for further handling if needed.
 */
export async function handleError(error, operation) {
  console.error(`Error during ${operation}:`, error);

  let errorMessage = "Something went wrong. Please try again.";

  if (error.response) {
    try {
      // Parse the response JSON to extract error details
      const errorData = await error.response.json();
      if (errorData?.errors?.length) {
        // Extract the first error message
        errorMessage = errorData.errors[0]?.message || errorMessage;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch (parseError) {
      console.warn("Failed to parse error response JSON:", parseError);
    }
  } else if (error.message) {
    errorMessage = error.message;
  }

  showErrorAlert(errorMessage);

  return errorMessage;
}
