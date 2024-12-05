import { updateProfile } from "../../api/profile/update.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";
import { validateImageUrl } from "../../global/validImg.js";

export function avatarUpdate() {
  const avatarImg = document.getElementById("profile-avatar");
  const avatarUpdateContainer = document.getElementById(
    "avatar-update-container",
  );
  const avatarUpdateInput = document.getElementById("avatar-update-input");
  const avatarUpdateAlt = document.getElementById("avatar-update-alt");
  const avatarUpdateBtn = document.getElementById("avatar-update-btn");
  const avatarCancelBtn = document.getElementById("avatar-cancel-btn");

  let originalAvatarUrl = avatarImg.src;
  let originalAvatarAlt = avatarImg.alt;

  // Open the update container
  avatarImg.addEventListener("click", () => {
    avatarUpdateContainer.classList.remove("hidden");
    avatarUpdateInput.value = originalAvatarUrl; // Prefill with current avatar URL
    avatarUpdateAlt.value = originalAvatarAlt; // Prefill with current avatar alt
    avatarUpdateInput.focus();
  });

  // Update avatar
  avatarUpdateBtn.addEventListener("click", async () => {
    const newAvatarUrl = avatarUpdateInput.value.trim();
    const newAvatarAlt = avatarUpdateAlt.value.trim() || "User Avatar"; // Fallback alt text

    // Validate the new avatar URL and provide feedback
    if (!validateImageUrl(newAvatarUrl)) {
      avatarUpdateInput.classList.add("invalid"); // Highlight invalid input
      showErrorAlert("Please enter a valid HTTPS URL for the avatar.");
      return;
    }

    try {
      // Update the profile with the new avatar
      await updateProfile({ avatar: { url: newAvatarUrl, alt: newAvatarAlt } });

      // Update the image and alt text in the UI
      avatarImg.src = newAvatarUrl;
      avatarImg.alt = newAvatarAlt;

      // Reset inputs and hide the container
      avatarUpdateContainer.classList.add("hidden");
      originalAvatarUrl = newAvatarUrl;
      originalAvatarAlt = newAvatarAlt;
      avatarUpdateInput.value = "";
      avatarUpdateAlt.value = "";

      showSuccessAlert("Avatar updated successfully!");
    } catch (error) {
      console.error(error, "updating avatar");
      showErrorAlert("Failed to update avatar. Please try again.");
    }
  });

  // Cancel update
  avatarCancelBtn.addEventListener("click", () => {
    avatarUpdateContainer.classList.add("hidden");
    avatarImg.src = originalAvatarUrl; // Revert to the original URL
    avatarImg.alt = originalAvatarAlt; // Revert to the original alt text
    avatarUpdateInput.value = "";
    avatarUpdateAlt.value = "";
    avatarUpdateInput.classList.remove("invalid"); // Remove invalid styling
  });

  // Validate on input change
  avatarUpdateInput.addEventListener("input", () => {
    const url = avatarUpdateInput.value.trim();

    // Validate the avatar URL dynamically
    if (url && validateImageUrl(url)) {
      avatarUpdateInput.classList.remove("invalid"); // Remove invalid styling
    } else if (url) {
      avatarUpdateInput.classList.add("invalid"); // Highlight invalid input
    }
  });
}
