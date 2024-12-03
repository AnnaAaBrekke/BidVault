import { showErrorAlert } from "./alert";

// Centralized API error handling function
export async function handleError(error, operation) {
  console.error(`Error ${operation}:`, error);

  let errorMessage = "An unexpected error occurred. Please try again.";

  if (error.response) {
    // Get error message from response body (using response.text() for simplicity)
    const errorText = await error.response.text();
    errorMessage = `Error ${operation}: ${errorText}`;
  }

  // Show a single error alert with the message
  showErrorAlert(errorMessage);
}
