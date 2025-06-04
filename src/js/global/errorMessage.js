import { showErrorAlert } from "./alert.js";

/**
 * Handles errors by extracting relevant messages and displaying a user-friendly alert.
 *
 * @param {Error|Object} error - The error object or response containing details about the error.
 * @param {string} operation - A description of the operation during which the error occurred.
 * @async
 * @returns {Promise<string>} - Resolves with the extracted error message for further handling if needed.
 */
export async function handleError(error, operation = "an operation") {
  console.error(`🔴 Error during ${operation}:`, error);

  let errorMessage = "Something went wrong. Please try again.";

  if (error.response) {
    try {
      const contentType = error.response.headers.get("Content-Type");
      let errorData;

      if (contentType && contentType.includes("application/json")) {
        errorData = await error.response.json();
      }

      if (errorData?.errors?.length) {
        errorMessage = errorData.errors[0]?.message || errorMessage;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else {
        errorMessage = error.response.statusText || errorMessage;
      }
    } catch (parseError) {
      console.warn("⚠️ Failed to parse error response JSON:", parseError);
    }
  } else if (error.message) {
    errorMessage = error.message;
  } else {
    console.warn("⚠️ Unrecognized error format:", error);
  }

  showErrorAlert(errorMessage);
  return errorMessage;
}
