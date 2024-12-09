export function dropdownDesktop(avatarContainerId, dropdownMenuId) {
  const avatarContainer = document.getElementById(avatarContainerId);
  const dropdownMenu = document.getElementById(dropdownMenuId);

  avatarContainer.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  // Close the dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !avatarContainer.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });
}
