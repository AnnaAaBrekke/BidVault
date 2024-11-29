import { showErrorAlert } from "./alert.js";

/**
 * Checks if the user is logged in by verifying the presence of an access token.
 *
 * @returns {boolean} - `true` if the user is logged in, `false` otherwise.
 */
export function isLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");
  return Boolean(accessToken);
}

/**
 * Redirects the user to the login page if not logged in.
 *
 * @param {string} [redirectUrl="/welcome"] - The URL to redirect to.
 */
export function requireAuth(redirectUrl = "/welcome") {
  if (!isLoggedIn()) {
    showErrorAlert("You must be logged in to view this page.");

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
  }
}
