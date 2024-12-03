import { API_AUCTION_PROFILES } from "../constants.js";
import { getHeaders } from "../headers.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";

/**
 * Update the profile of the currently logged-in user.
 * @param {Object} updatedData - The updated profile data.
 */
export async function updateProfile(updatedData) {
  try {
    const username = localStorage.getItem("name");
    console.log("Update name", username);

    if (!username) {
      throw new Error("User is not logged in.");
    }

    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error updating profile: ${errorMessage}`);
    }

    showSuccessAlert("Profile updated successfully!");
    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    showErrorAlert(`Error updating profile: ${error.message}`);
    throw error;
  }
}
