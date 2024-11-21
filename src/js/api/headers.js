/**
 * Generates headers for API requests, including API key and optional access token.
 *
 * @param {boolean} [includeAuth=true] - Whether to include the Authorization header.
 * @returns {Headers} - A Headers object with the necessary headers.
 */
export function getHeaders(includeAuth = true) {
  const headers = new Headers();
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    console.error(
      "API key is missing. Ensure VITE_API_KEY is set in your .env file.",
    );
    throw new Error(
      "API key is missing. Check your environment configuration.",
    );
  }

  headers.append("X-Noroff-API-Key", apiKey);
  headers.append("Content-Type", "application/json");

  if (includeAuth) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.warn("Access token is missing. User may not be logged in.");
        throw new Error(
          "Access token is missing. Authorization header not included.",
        );
      }
      headers.append("Authorization", `Bearer ${accessToken}`);
    } catch (error) {
      console.error("Error accessing localStorage for token:", error);
    }
  }

  return headers;
}
