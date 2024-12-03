import { showErrorAlert } from "../../global/alert.js";
import { API_AUCTION_PROFILES } from "../constants.js";
import { getHeaders } from "../headers.js";

/**
 * Fetches the profile of the logged-in user.
 *
 * @returns {Object} - The profile data.
 */
export async function fetchProfile() {
  try {
    const username = localStorage.getItem("name");
    const accessToken = localStorage.getItem("accessToken");

    console.log("Username:", username);
    console.log("Access Token:", accessToken); // Debug log

    if (!username || !accessToken) {
      showErrorAlert("Username or Access Token is missing. Please log in.");
      throw new Error("Missing username or access token.");
    }

    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "GET",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error response:", errorMessage); // Debug log
      throw new Error(`Error fetching profile: ${errorMessage}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    showErrorAlert(`Error fetching profile: ${error.message}`);
    throw error;
  }
}
