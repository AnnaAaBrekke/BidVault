import { API_AUCTION_PROFILES } from "../constants.js";
import { getHeaders } from "../headers.js";
import { showSuccessAlert } from "../../global/alert.js";
import { handleError } from "../../global/errorMessage.js";

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
      throw new Error("Error updating profile.");
    }
    showSuccessAlert("Profile updated successfully!");
    return await response.json();
  } catch (error) {
    handleError(error, "updating profile");
    throw error;
  }
}
