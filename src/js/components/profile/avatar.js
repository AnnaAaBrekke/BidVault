import { profileService } from "../../api/services/profileService.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";
import { validateImageUrl } from "../form/utils/validImg.js";

/**
 * Initializes the avatar update functionality.
 * Allows users to update their avatar image and alt text dynamically.
 */
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

  /**
   * Opens the avatar update container and pre-fills the input fields with the current avatar details.
   */
  avatarImg.addEventListener("click", () => {
    avatarUpdateContainer.classList.remove("hidden");
    avatarUpdateInput.value = originalAvatarUrl;
    avatarUpdateAlt.value = originalAvatarAlt;
    avatarUpdateInput.focus();
  });

  /**
   * Updates the user's avatar image and alt text.
   * Performs URL validation and sends the updated details to the profile service.
   */
  avatarUpdateBtn.addEventListener("click", async () => {
    const newAvatarUrl = avatarUpdateInput.value.trim();
    const newAvatarAlt = avatarUpdateAlt.value.trim() || "User Avatar";

    // Validate the new avatar URL and provide feedback
    if (!validateImageUrl(newAvatarUrl)) {
      avatarUpdateInput.classList.add("invalid"); // Highlight invalid input
      showErrorAlert("Please enter a valid HTTPS URL for the avatar.");
      return;
    }

    try {
      await profileService.updateProfile({
        avatar: { url: newAvatarUrl, alt: newAvatarAlt },
      });

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

  /**
   * Cancels the avatar update and reverts any changes made to the input fields.
   */
  avatarCancelBtn.addEventListener("click", () => {
    avatarUpdateContainer.classList.add("hidden");
    avatarImg.src = originalAvatarUrl; // Revert to the original URL
    avatarImg.alt = originalAvatarAlt; // Revert to the original alt text
    avatarUpdateInput.value = "";
    avatarUpdateAlt.value = "";
    avatarUpdateInput.classList.remove("invalid"); // Remove invalid styling
  });

  /**
   * Validates the avatar URL dynamically as the user types.
   * Adds or removes invalid styling based on the validity of the URL.
   */
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
