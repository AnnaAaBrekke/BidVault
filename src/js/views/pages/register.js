import FormHandler from "../../components/form/formHandler.js";

FormHandler.initialize("#register-form", "register");

document.addEventListener("DOMContentLoaded", () => {
  const avatarUrlInput = document.getElementById("avatar-url");
  const avatarPreview = document.getElementById("avatar-preview");

  const bannerUrlInput = document.getElementById("banner-url");
  const bannerPreview = document.getElementById("banner-preview");

  // Update avatar preview when the user types a URL
  avatarUrlInput.addEventListener("input", () => {
    const url = avatarUrlInput.value;
    avatarPreview.src = url || "../../src/images/avatar.jpg"; // Fallback to default
  });

  // Update banner preview when the user types a URL
  bannerUrlInput.addEventListener("input", () => {
    const url = bannerUrlInput.value;
    bannerPreview.src = url || "../../src/images/banner-bid.jpg"; // Fallback to default
  });
});
