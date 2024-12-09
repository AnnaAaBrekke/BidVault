import { showErrorAlert } from "../global/alert";

export function renderHeader(isLoggedIn) {
  const avatarContainer = document.getElementById("avatar-container");
  const hamburgerContainer = document.getElementById("hamburger-container");
  const loggedInMenu = document.getElementById("logged-in-menu");
  const notLoggedInMenu = document.getElementById("not-logged-in-menu");

  if (
    !avatarContainer ||
    !hamburgerContainer ||
    !notLoggedInMenu ||
    !loggedInMenu
  ) {
    console.error("Header elements not found in the DOM.");
    return;
  }

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

export async function populateHeader(profile) {
  const avatarImg = document.getElementById("profile-avatar");
  const profileName = document.getElementById("profile-name");

  if (profile) {
    avatarImg.src = profile.avatar?.url || "src/images/avatar.jpg";
    avatarImg.alt = profile.avatar?.alt || "Default Avatar";
    profileName.textContent = profile.name || "Anonymous";
  } else {
    showErrorAlert("No profile data available.");
  }
}

export function hamburgerDropdown() {
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
