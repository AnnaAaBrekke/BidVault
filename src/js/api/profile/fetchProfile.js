import { showErrorAlert } from "../../global/alert.js";
import { handleError } from "../../global/errorMessage.js";
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

    if (!username || !accessToken) {
      showErrorAlert("Username or Access Token is missing. Please log in.");
      throw new Error("Missing username or access token.");
    }

    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "GET",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile.");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    handleError(error, "fetching profile");
    throw error;
  }
}
