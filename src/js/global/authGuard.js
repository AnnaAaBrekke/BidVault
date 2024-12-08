import { showErrorAlert } from "./alert.js";

/**
 * Checks if the user is logged in by verifying the presence of an access token.
 *
 * @returns {boolean} - Returns `true` if the user is logged in (access token is present), otherwise `false`.
 */
export function isLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");
  return Boolean(accessToken);
}

/**
 * Redirects the user to the login page if they are not logged in.
 * Displays an alert message notifying the user about the need to log in.
 */
export function requireAuth() {
  if (!isLoggedIn()) {
    showErrorAlert("You must be logged in to view this page.");

    setTimeout(() => {
      window.location.href = "/welcome";
    }, 1000);
  }
}
