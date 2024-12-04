import { API_AUTH_REGISTER } from "../constants.js";
import { getHeaders } from "../headers.js";
import { showErrorAlert } from "../../global/alert.js";
import { handleError } from "../../global/errorMessage.js";

/**
 * Registers a new user.
 *
 * @param {Object} userData - The user data to register.
 * @returns {Object} - The registered user data.
 */
export async function register(userData) {
  try {
    const registerBody = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    // Add avatar field if provided
    if (userData.avatarUrl) {
      registerBody.avatar = {
        url: userData.avatarUrl,
        alt: userData.avatarAlt || "Default Avatar", // Fallback for alt
      };
    }

    // Add banner field if provided
    if (userData.bannerUrl) {
      registerBody.banner = {
        url: userData.bannerUrl,
        alt: userData.bannerAlt || "Default Banner", // Fallback for alt
      };
    }

    // Add bio if provided
    if (userData.bio) {
      registerBody.bio = userData.bio.trim(); // Ensure it's not just whitespace
    }

    console.log("Registering with:", registerBody);

    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
      body: JSON.stringify(registerBody),
    });

    if (response.ok) {
      const { data } = await response.json();

      console.log("Registration successful:", data);
      return data;
    }

    // Handle errors from API
    const errorDetails = await response.json().catch(() => response.text());
    console.error("Registration failed:", errorDetails);
    showErrorAlert(
      `Registration failed: ${errorDetails.message || "Please try again."}`,
    );
    throw new Error(
      `Registration failed: ${errorDetails.message || "Unknown error"}`,
    );
  } catch (error) {
    handleError(error, "registering");
    throw error;
  }
}
