import { updateProfile } from "../api/profile/update.js";
import { showErrorAlert, showSuccessAlert } from "../global/alert.js";

export function avatarUpdate() {
  const avatarImg = document.getElementById("profile-avatar");
  const avatarUpdateContainer = document.getElementById(
    "avatar-update-container",
  );
  const avatarUpdateInput = document.getElementById("avatar-update-input");
  const avatarUpdateBtn = document.getElementById("avatar-update-btn");
  const avatarCancelBtn = document.getElementById("avatar-cancel-btn");

  // Add (alt) here to ?? Because changing the images..

  // Store the original avatar URL for fallback
  let originalAvatarUrl = avatarImg.src;
  // Regular expression to validate URL: Chat GPT + https://regexr.com/3g1v7 created this
  const isValidUrl = (url) => {
    const urlPattern = /^https:\/\/[^\s?]+(?:\?[^\s#]*)?$/i;
    return urlPattern.test(url);
  };

  const isImageAccessible = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      // Check if the response is OK and the content type is an image
      return (
        response.ok &&
        response.headers.get("content-type")?.startsWith("image/")
      );
    } catch {
      return false; // Return false if the request fails
    }
  };

  avatarImg.addEventListener("click", async () => {
    avatarUpdateContainer.classList.remove("hidden");
    avatarUpdateInput.value = originalAvatarUrl; // Prefill with current avatar
    avatarUpdateInput.focus();
  });

  avatarUpdateBtn.addEventListener("click", async () => {
    const newAvatarUrl = avatarUpdateInput.value.trim();

    // Validate the new avatar URL
    if (!newAvatarUrl || !isValidUrl(newAvatarUrl)) {
      showErrorAlert("Please enter a valid URL for the avatar.");
      return;
    }
    // Check if the URL points to an accessible image
    if (!(await isImageAccessible(newAvatarUrl))) {
      showErrorAlert(
        "The provided URL is not a live and publicly accessible image.",
      );
      return;
    }

    try {
      await updateProfile({ avatar: { url: newAvatarUrl } });

      avatarImg.src = newAvatarUrl;

      avatarUpdateContainer.classList.add("hidden");
      originalAvatarUrl = newAvatarUrl;
      avatarUpdateInput.value = "";

      showSuccessAlert("Avatar updated successfully!");
    } catch (error) {
      console.error(error, "updating avatar");
      showErrorAlert("Failed to update avatar. Please try again.");
    }
  });

  avatarCancelBtn.addEventListener("click", () => {
    avatarUpdateContainer.classList.add("hidden");
    avatarImg.src = originalAvatarUrl;
    avatarUpdateInput.value = "";
  });
}
