import { API_AUTH_REGISTER } from "../constants.js";
import { getHeaders } from "../headers.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";

export async function register(userData) {
  const response = await fetch(API_AUTH_REGISTER, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify(userData), // Convert user data to JSON
  });

  if (response.ok) {
    showSuccessAlert("Registration successful! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 1500);
  } else {
    const errorMessage = await response.text();
    showErrorAlert(`Register failed: ${errorMessage}`);
    throw new Error(`Registration failed: ${errorMessage}`);
  }
}
