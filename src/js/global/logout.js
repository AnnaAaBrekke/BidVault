import { handleError } from "./errorMessage.js";

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

async function onLogout() {
  if (!localStorage.getItem("accessToken")) {
    console.warn("No active session found.");
    return;
  }

  // Clear session and local storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("accessToken");

  // Prevents back navigation by replacing the history
  window.location.replace("/welcome");
  window.history.replaceState(null, "", "/welcome");
}
