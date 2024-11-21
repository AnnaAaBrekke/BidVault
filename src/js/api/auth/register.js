import { API_AUTH_REGISTER } from "../constants.js";
import { getHeaders } from "../headers.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";

export async function register(userData) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(userData), // Convert user data to JSON
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || `Registration failed: ${response.status}`,
      );
    }

    const result = await response.json(); // Parse the JSON response
    console.log("User registered successfully:", result);
    showSuccessAlert("Registration successful! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "../../welcome.html";
    }, 1500);
    return result; // Return the registered user data
  } catch (error) {
    showErrorAlert("Register failed:", error.message);
    console.error("Error registering user:", error.message);
    throw error; // Re-throw the error for further handling
  }
}
