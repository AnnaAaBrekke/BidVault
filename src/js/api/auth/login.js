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
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const { data } = await response.json();
      const { accessToken: token, ...user } = data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      return data;
    }

    const errorMessage = await response.text();
    showErrorAlert(`Login failed: ${errorMessage}`);
    throw new Error(`Login failed: ${errorMessage}`);
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
}
