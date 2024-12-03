import { showErrorAlert } from "./alert.js";

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (!confirm("Are you sure you want to log out?")) {
        return; // User canceled logout
      }
      try {
        await onLogout();
      } catch (error) {
        console.error("Logout failed:", error);
        showErrorAlert("An error occurred during logout. Please try again.");
      }
    });
  }
}

async function onLogout() {
  if (!localStorage.getItem("accessToken")) {
    console.warn("No active session found.");
    return;
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("accessToken");

  window.location.replace("/welcome");
}
