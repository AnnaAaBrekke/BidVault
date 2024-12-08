import { isLoggedIn } from "../global/authGuard.js";

/**
 * Generates HTTP headers for API requests, including authentication and API key headers.
 *
 * @param {boolean} [includeAuth=true] - Determines whether to include the Authorization header.
 * @returns {Promise<Headers>} - A promise that resolves to a `Headers` object containing the necessary headers.
 * @throws {Error} - Throws an error if the API key is missing in the environment configuration.
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
