import { isLoggedIn } from "../global/authGuard.js";

/**
 * Generates headers for API requests, including API key and optional access token.
 *
 * @param {boolean} [includeAuth=true] - Whether to include the Authorization header.
 * @returns {Headers} - A Headers object with the necessary headers.
 */
export async function getHeaders(includeAuth = true) {
  const headers = new Headers();
  const apiKey = import.meta.env.VITE_API_KEY;

  console.log("key", apiKey);
  if (!apiKey) {
    console.error("API key is missing.");
    throw new Error(
      "API key is missing. Check your environment configuration.",
    );
  }

  headers.append("X-Noroff-API-Key", apiKey);
  headers.append("Content-Type", "application/json");

  if (includeAuth && isLoggedIn()) {
    const accessToken = localStorage.getItem("accessToken");

    headers.append("Authorization", `Bearer ${accessToken}`);
    console.log("Access token", accessToken);
  }

  return headers;
}
