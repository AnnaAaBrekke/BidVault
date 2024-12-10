import { profileService } from "../api/services/profileService";
import { showErrorAlert } from "./alert";
import { isLoggedIn } from "./authGuard";

export async function setupHeader() {
  const currentPage = window.location.pathname;

  // Skip rendering header for the register page
  if (currentPage.includes("auth/register/")) {
    return;
  }

  const checkLoginStatus = await isLoggedIn();
  renderHeader(checkLoginStatus);

  if (checkLoginStatus) {
    const profileHeader = await profileService.fetchProfile();
    populateHeader(profileHeader);
    hamburgerDropdown();
  }
}

function renderHeader(isLoggedIn) {
  const avatarContainer = document.getElementById("avatar-container");
  const hamburgerContainer = document.getElementById("hamburger-container");
  const loggedInMenu = document.getElementById("logged-in-menu");
  const notLoggedInMenu = document.getElementById("not-logged-in-menu");

  if (isLoggedIn) {
    // Show avatar, hamburger menu, and logged-in dropdown
    avatarContainer.classList.remove("hidden");
    hamburgerContainer.classList.remove("hidden");
    loggedInMenu.classList.remove("hidden");
    notLoggedInMenu.classList.add("hidden");
  } else {
    // Show not-logged-in menu and hide others
    avatarContainer.classList.add("hidden");
    hamburgerContainer.classList.add("hidden");
    loggedInMenu.classList.add("hidden");
    notLoggedInMenu.classList.remove("hidden");
  }
}

function populateHeader(profile) {
  const avatarImg = document.getElementById("header-profile-avatar");
  const profileName = document.getElementById("header-profile-name");

  if (profile) {
    avatarImg.src = profile.avatar?.url || "src/images/avatar.jpg";
    avatarImg.alt = profile.avatar?.alt || "Default Avatar";
    profileName.textContent = profile.name || "Anonymous";
  } else {
    showErrorAlert("No profile data available.");
  }
}

function hamburgerDropdown() {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (!hamburgerMenu || !dropdownMenu) {
    console.error("Hamburger menu or dropdown menu not found in the DOM.");
    return;
  }

  hamburgerMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("hidden");
    console.log("Hamburger menu clicked. Dropdown visibility toggled.");
  });

  document.addEventListener("click", (event) => {
    if (
      !hamburgerMenu.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
      console.log("Clicked outside. Dropdown closed.");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdownMenu.classList.add("hidden");
      console.log("Escape key pressed. Dropdown closed.");
    }
  });
}
