import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../ui/global/alertHandler.js";

/**
 * Registers a new user by sending their details to the API.
 * This function handles the user registration process by submitting the user's
 * personal data including name, email, password, bio, avatar, and banner.
 * On a successful registration, a success alert is shown, and the user is redirected
 * to the login page.
 *
 * @async
 * @function register
 * @param {Object} userData - The user's registration details.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email address (must be a valid email).
 * @param {string} userData.password - The user's password (must be at least 8 characters).
 * @param {string} [userData.bio] - The user's bio (optional).
 * @param {Object} [userData.avatar] - The user's avatar object (optional).
 * @param {string} [userData.avatar.url] - The URL of the user's avatar image.
 * @param {string} [userData.avatar.alt] - The alt text describing the avatar image.
 * @param {Object} [userData.banner] - The user's banner object (optional).
 * @param {string} [userData.banner.url] - The URL of the user's banner image.
 * @param {string} [userData.banner.alt] - The alt text describing the banner image.
 * @returns {Promise<void>} - Resolves if the registration is successful and the user is redirected.
 * @throws {Error} - Throws an error if the registration request fails or there is a network error.
 */
export async function register({ name, email, password, bio, avatar, banner }) {
  const body = {
    name,
    email,
    password,
    bio,
    avatar: {
      url: avatar.url,
      alt: avatar.alt,
    },
    banner: {
      url: banner.url,
      alt: banner.alt,
    },
  };

  const response = await fetch(API_AUTH_REGISTER, {
    headers: headers(),
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.ok) {
    showSuccessAlert("Registration successful! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "#";
    }, 1500);
  } else {
    const errorMessage = await response.text();
    showErrorAlert(`Register failed: ${errorMessage}`);
    throw new Error(`Registration failed: ${errorMessage}`);
  }
}
