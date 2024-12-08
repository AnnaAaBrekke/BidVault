import { API_AUTH } from "../constants.js";
import { getHeaders } from "../headers.js";
import { MainService } from "./mainService.js";

/**
 * Service class for authentication-related operations.
 * Extends the `MainService` class for shared functionality.
 */
class AuthService extends MainService {
  /**
   * Initializes the AuthService with the API endpoint for authentication.
   */
  constructor() {
    super(API_AUTH);
  }

  /**
   * Logs in a user with the provided credentials.
   * Stores the user's access token, name, and other details in local storage upon successful login.
   *
   * @async
   * @param {Object} userData - The user's login data (e.g., email and password).
   * @param {string} userData.email - The user's email address.
   * @param {string} userData.password - The user's password.
   * @returns {Promise<Object>} - Resolves with the user's data (excluding name and access token).
   * @throws {Error} - Throws an error if login fails or the response is invalid.
   */
  async login(userData) {
    try {
      const response = await this.fetchRequest(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await getHeaders(false)),
        },
        body: JSON.stringify(userData),
      });

      if (!response || !response.name || !response.accessToken) {
        throw new Error("Invalid login response. Missing required fields.");
      }

      localStorage.clear();

      const { accessToken, name, ...user } = response;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", name);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  }

  /**
   * Registers a new user with the provided data.
   *
   * @async
   * @param {Object} userData - The user's registration data (e.g., name, email, password).
   * @param {string} userData.name - The user's name.
   * @param {string} userData.email - The user's email address.
   * @param {string} userData.password - The user's password.
   * @returns {Promise<Object>} - Resolves with the server's response, including the registered user's data.
   * @throws {Error} - Throws an error if registration fails.
   */
  async register(userData) {
    return this.fetchRequest(`/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await getHeaders(false)),
      },
      body: JSON.stringify(userData),
    });
  }
}

export const authService = new AuthService();
