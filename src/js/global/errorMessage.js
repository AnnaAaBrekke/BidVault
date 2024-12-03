import { showErrorAlert } from "./alert";

export async function handleError(error, operation) {
  console.error(`Error ${operation}:`, error);

  let errorMessage = "An unexpected error occurred. Please try again.";

  if (error.response) {
    const errorText = await error.response.text();
    errorMessage = `Error ${operation}: ${errorText}`;
  }

  showErrorAlert(errorMessage);
}
