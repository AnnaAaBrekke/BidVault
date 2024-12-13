import { profileService } from "../../api/services/profileService.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";
import { validateImageUrl } from "../form/utils/validImg.js";

/**
 * Initializes the avatar update functionality.
 * Allows users to update their avatar image and alt text dynamically.
 */
export function avatarUpdate() {
  const avatarImg = document.getElementById("profile-avatar");
  const avatarEditIcon = document.getElementById("avatar-edit-icon"); // New camera icon
  const avatarUpdateContainer = document.getElementById(
    "avatar-update-container",
  );
  const avatarUpdateInput = document.getElementById("avatar-update-input");
  const avatarUpdateAlt = document.getElementById("avatar-update-alt");
  const avatarUpdateBtn = document.getElementById("avatar-update-btn");
  const avatarCancelBtn = document.getElementById("avatar-cancel-btn");

  let originalAvatarUrl = avatarImg.src;
  let originalAvatarAlt = avatarImg.alt;

  /**
   * Opens the avatar update container when the camera icon is clicked.
   */
  avatarEditIcon.addEventListener("click", () => {
    avatarUpdateContainer.classList.remove("hidden");
    avatarUpdateInput.value = originalAvatarUrl;
    avatarUpdateAlt.value = originalAvatarAlt;
    avatarUpdateInput.focus();
  });

  /**
   * Updates the user's avatar image and alt text.
   */
  avatarUpdateBtn.addEventListener("click", async () => {
    const newAvatarUrl = avatarUpdateInput.value.trim();
    const newAvatarAlt = avatarUpdateAlt.value.trim() || "User Avatar";

    if (!validateImageUrl(newAvatarUrl)) {
      avatarUpdateInput.classList.add("invalid");
      showErrorAlert("Please enter a valid HTTPS URL for the avatar.");
      return;
    }

    try {
      await profileService.updateProfile({
        avatar: { url: newAvatarUrl, alt: newAvatarAlt },
      });

      avatarImg.src = newAvatarUrl;
      avatarImg.alt = newAvatarAlt;

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

  /**
   * Cancels the avatar update process.
   */
  avatarCancelBtn.addEventListener("click", () => {
    avatarUpdateContainer.classList.add("hidden");
    avatarImg.src = originalAvatarUrl;
    avatarImg.alt = originalAvatarAlt;
    avatarUpdateInput.value = "";
    avatarUpdateAlt.value = "";
    avatarUpdateInput.classList.remove("invalid");
  });

  /**
   * Validates the avatar URL dynamically.
   */
  avatarUpdateInput.addEventListener("input", () => {
    const url = avatarUpdateInput.value.trim();

    if (url && validateImageUrl(url)) {
      avatarUpdateInput.classList.remove("invalid");
    } else if (url) {
      avatarUpdateInput.classList.add("invalid");
    }
  });
}
