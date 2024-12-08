import { API_AUCTION_PROFILES } from "../constants.js";
import { getHeaders } from "../headers.js";
import { MainService } from "./mainService.js";

class ProfileService extends MainService {
  constructor() {
    super(API_AUCTION_PROFILES);
  }

  async fetchProfile() {
    try {
      const username = localStorage.getItem("name");
      const accessToken = localStorage.getItem("accessToken");

      if (!username || !accessToken) {
        throw new Error("Missing username or access token.");
      }

      return this.fetchRequest(`/${username}`, {
        method: "GET",
        headers: await getHeaders(),
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error; // Propagate the error to be handled by the caller.
    }
  }

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
