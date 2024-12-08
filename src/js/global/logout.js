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
  localStorage.clear();
  sessionStorage.clear();

  // Clear the browser's history - prevents navigation backwords
  window.location.replace("/welcome");
  setTimeout(() => {
    history.pushState(null, "", "/welcome");
    window.history.pushState(null, "", "/welcome");
  }, 100);
}
