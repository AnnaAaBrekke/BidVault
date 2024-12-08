import { API_AUCTION_PROFILES } from "../constants.js";
import { getHeaders } from "../headers.js";
import { MainService } from "./mainService.js";

/**
 * Service class for managing user profiles in the auction application.
 * Extends the `MainService` class for shared functionality.
 */
class ProfileService extends MainService {
  /**
   * Initializes the ProfileService with the API endpoint for profiles.
   */
  constructor() {
    super(API_AUCTION_PROFILES);
  }

  /**
   * Fetches the profile of the currently logged-in user.
   *
   * @async
   * @returns {Promise<Object>} - Resolves with the profile data of the user.
   * @throws {Error} - Throws an error if the username or access token is missing, or if the request fails.
   */
  async fetchProfile() {
    try {
      const username = localStorage.getItem("name");
      const accessToken = localStorage.getItem("accessToken");

      if (!username) {
        console.error("Username is missing from localStorage.");
        throw new Error("Missing username.");
      }

      if (!accessToken) {
        console.error("Access token is missing from localStorage.");
        throw new Error("Missing access token.");
      }

      return this.fetchRequest(`/${username}`, {
        method: "GET",
        headers: await getHeaders(),
      });
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      throw error;
    }
  }

  /**
   * Updates the profile of the currently logged-in user with the provided data.
   *
   * @async
   * @param {Object} updatedData - The data to update in the user's profile.
   * @returns {Promise<Object>} - Resolves with the updated profile data.
   * @throws {Error} - Throws an error if the user is not logged in, or if the request fails.
   */
  async updateProfile(updatedData) {
    try {
      const username = localStorage.getItem("name");
      const accessToken = localStorage.getItem("accessToken");

      if (!username || !accessToken) {
        throw new Error("User is not logged in.");
      }

      return this.fetchRequest(`/${username}`, {
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
