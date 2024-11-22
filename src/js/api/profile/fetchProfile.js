import { showErrorAlert } from "../../global/alert.js";
import { API_AUCTION_PROFILES } from "../constants.js";
import { getHeaders } from "../headers.js";

export async function fetchProfile(username) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (response.ok) {
      const { data } = await response.json();
      console.log("Profile fetched", data);
      return data;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error fetching profile: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    showErrorAlert(`Error fetching profile: ${error.message}`);
    throw error;
  }
}
