export function renderHeader(isLoggedIn) {
  const loggedInMenu = document.getElementById("logged-in-menu");
  const notLoggedInMenu = document.getElementById("not-logged-in");

  if (!loggedInMenu || !notLoggedInMenu) {
    console.error("Header menu sections not found in the DOM.");
    return;
  }

  if (isLoggedIn) {
    loggedInMenu.classList.remove("hidden");
    notLoggedInMenu.classList.add("hidden");
  } else {
    loggedInMenu.classList.add("hidden");
    notLoggedInMenu.classList.remove("hidden");
  }
}
export async function populateHeader(profile) {
  const avatarImg = document.getElementById("profile-avatar");
  const profileName = document.getElementById("profile-name");

  if (profile) {
    // Set avatar image
    avatarImg.src = profile.avatar?.url || "src/images/avatar.jpg";
    avatarImg.alt = profile.avatar?.alt || "Default Avatar";

    // Set profile name
    profileName.textContent = profile.name || "Anonymous";
  } else {
    console.warn("No profile data available");
  }
}

export function hamburgerDropdown() {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const dropdownMenu = document.getElementById("dropdown-menu");

  // Toggle dropdown visibility on hamburger click
  hamburgerMenu.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent bubbling
    dropdownMenu.classList.toggle("hidden"); // Toggle visibility
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !hamburgerMenu.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

  // Close dropdown on Escape key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdownMenu.classList.add("hidden");
    }
  });
}
