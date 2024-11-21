import { API_AUTH_LOGIN } from "../constants.js";
import { getHeaders } from "../headers.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";

/**
 * Logs in a user.
 *
 * @param {Object} userData - The user data to log in.
 * @returns {Object} - The logged-in user data.
 */
export async function login(userData) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Login failed: ${response.status}`);
    }

    const { data } = await response.json();

    if (!data?.accessToken) {
      throw new Error("Access token is missing in the response.");
    }

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data));

    showSuccessAlert("Login successful! Redirecting...");
    setTimeout(() => (window.location.href = "../../index.html"), 1500);

    return data;
  } catch (error) {
    showErrorAlert(`Login failed: ${error.message}`);
    console.error("Error logging in:", error.message);
    throw error;
  }
}
