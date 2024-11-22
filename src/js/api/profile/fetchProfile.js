import { showErrorAlert } from "../../global/alert.js";
import { API_AUCTION_PROFILES } from "../constants.js";
import { getHeaders } from "../headers.js";

export async function fetchProfile() {
  try {
    const username = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).name
      : null;

    if (!username) {
      showErrorAlert("User is not logged in.");
      window.location.href = "../../welcome.html";
      return;
    }
    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
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
