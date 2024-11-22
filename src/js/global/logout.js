import { showErrorAlert } from "./alert.js";

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
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
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("accessToken");

  window.location.href = "../../welcome.html";
}
