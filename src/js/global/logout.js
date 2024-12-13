import { handleError } from "./errorMessage.js";

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-button");
  const logoutText = document.querySelector("#logout-button .logout-text");

  if (logoutBtn) {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    logoutText.textContent = isLoggedIn ? "Logout" : "Login";

    logoutBtn.replaceWith(logoutBtn.cloneNode(true));
    const updatedLogoutBtn = document.getElementById("logout-button");

    if (isLoggedIn) {
      updatedLogoutBtn.addEventListener("click", async () => {
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
      updatedLogoutBtn.addEventListener("click", () => {
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

  localStorage.clear();
  sessionStorage.clear();

  // Clear history and redirect
  window.location.replace("/welcome");
  setTimeout(() => {
    history.pushState(null, "", "/welcome");
    window.history.pushState(null, "", "/welcome");
  }, 100);
}
