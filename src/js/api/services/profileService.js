import { API_AUCTION_PROFILES } from "../constants.js";
import { getHeaders } from "../headers.js";
import { MainService } from "./mainService.js";

class ProfileService extends MainService {
  constructor() {
    super(API_AUCTION_PROFILES);
  }

  async fetchProfile() {
    const username = localStorage.getItem("name");
    if (!username) throw new Error("User is not logged in.");

    return this.fetchRequest(`/${username}`, {
      method: "GET",
      headers: await getHeaders(),
    });
  }

  async updateProfile(updatedData) {
    const username = localStorage.getItem("name");
    if (!username) throw new Error("User is not logged in.");

    return this.fetchRequest(`/${username}`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(updatedData),
    });
  }
}
export const profileService = new ProfileService();
