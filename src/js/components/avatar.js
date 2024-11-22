import { updateProfile } from "../api/profile/update.js";
import { showErrorAlert, showSuccessAlert } from "../global/alert.js";

export function avatarUpdate() {
  const avatarImg = document.getElementById("profile-avatar");
  const avatarUpdateContainer = document.getElementById(
    "avatar-update-container",
  );
  const avatarUpdateInput = document.getElementById("avatar-update-input");
  const avatarUpdateBtn = document.getElementById("avatar-update-btn");

  // // Regular expression to validate URL
  // const isValidUrl = (url) => {
  //   const urlPattern = new RegExp(
  //     "^(https?:\\/\\/)" + // protocol
  //     "((([a-zA-Z\\d](([a-zA-Z\\d-]*[a-zA-Z\\d])?))\\.)+[a-zA-Z]{2,}|" + // domain name
  //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IPv4
  //     "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // port and path
  //     "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
  //     "(\\#[-a-zA-Z\\d_]*)?$", // fragment locator
  //     "i"
  //   );
  //   return urlPattern.test(url);
  // };

  avatarImg.addEventListener("click", async () => {
    avatarUpdateContainer.classList.remove("hidden");
    avatarUpdateInput.focus();
  });

  avatarUpdateBtn.addEventListener("click", async () => {
    const newAvatarUrl = avatarUpdateInput.value;

    if (!newAvatarUrl) {
      showErrorAlert("Please enter a valid URL for the avatar");
      return;
    }

    try {
      await updateProfile({ avatar: { url: newAvatarUrl } });

      avatarImg.src = newAvatarUrl;

      avatarUpdateContainer.classList.add("hidden");
      avatarUpdateInput.value = "";

      showSuccessAlert("Avatar updated successfully!");
    } catch (error) {
      console.error("Failed to update avatar:", error);
      showErrorAlert("Failed to update avatar. Please try again.");
    }
  });
}
