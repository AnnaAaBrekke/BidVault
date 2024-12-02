import { API_AUTH_LOGIN } from "../constants.js";
import { getHeaders } from "../headers.js";
import { showErrorAlert } from "../../global/alert.js";

/**
 * Logs in a user.
 *
 * @param {Object} userData - The user data to log in.
 * @returns {Object} - The logged-in user data.
 */
export async function login(userData) {
  try {
    // Ensure payload includes only required fields
    const loginBody = {
      email: userData.email,
      password: userData.password,
    };

    console.log("Logging in with:", loginBody);

    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
      body: JSON.stringify(loginBody),
    });

    if (response.ok) {
      const { data } = await response.json();
      const { accessToken: token, ...user } = data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      localStorage.setItem("name", user.name);

      console.log("Login successful:", user);
      return data;
    }

    const errorDetails = await response.json().catch(() => response.text());
    console.error("Login failed:", errorDetails);
    showErrorAlert(
      `Login failed: ${errorDetails.message || "Please check your credentials."}`,
    );
    throw new Error(`Login failed: ${errorDetails.message || "Unknown error"}`);
  } catch (error) {
    console.error("Login error:", error);
    showErrorAlert(`An error occurred during login: ${error.message}`);
    throw error;
  }
}
