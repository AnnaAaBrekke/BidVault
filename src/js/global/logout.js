import { handleError } from "./errorMessage.js";

/**
 * Sets up a logout button listener to handle user login/logout actions dynamically.
 * Updates the button text and behavior based on the user's login state.
 */
export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    logoutBtn.textContent = isLoggedIn ? "Log Out" : "Log In";

    if (isLoggedIn) {
      logoutBtn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to log out?")) {
          return;
        }
        try {
          await onLogout();
          setLogoutListener();
        } catch (error) {
          handleError(error, "logging out");
        }
      });
    } else {
      logoutBtn.addEventListener("click", () => {
        window.location.href = "/welcome";
      });
    }
  }
}

/**
 * Handles the logout process, clearing user session data and redirecting to the welcome page.
 *
 * @async
 * @returns {Promise<void>} - Resolves when the logout process is complete.
 */
async function onLogout() {
  if (!localStorage.getItem("accessToken")) {
    console.warn("No active session found.");
    return;
  }

  localStorage.clear();
  sessionStorage.clear();

  // Clear the browser's history to prevent backward navigation
  window.location.replace("/welcome");
  setTimeout(() => {
    history.pushState(null, "", "/welcome");
    window.history.pushState(null, "", "/welcome");
  }, 100);
}
