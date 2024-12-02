import { API_AUTH_REGISTER } from "../constants.js";
import { getHeaders } from "../headers.js";
import { showErrorAlert } from "../../global/alert.js";

/**
 * Registers a new user.
 *
 * @param {Object} userData - The user data to register.
 * @returns {Object} - The registered user data.
 */
export async function register(userData) {
  try {
    // Ensure payload includes only required fields
    const registerBody = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

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
    console.error("Registration error:", error);
    showErrorAlert(`An error occurred during registration: ${error.message}`);
    throw error;
  }
}
