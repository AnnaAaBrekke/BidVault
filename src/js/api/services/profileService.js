import { showErrorAlert } from "../../global/alert.js";
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

      console.log("Username from localStorage:", username);
      console.log("AccessToken from localStorage:", accessToken);

      if (!username) {
        console.error("Username is missing from localStorage.");
        showErrorAlert("You must log in to view your profile.");
        throw new Error("Missing username.");
      }

      if (!accessToken) {
        console.error("Access token is missing from localStorage.");
        showErrorAlert("You must log in to view your profile.");
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
