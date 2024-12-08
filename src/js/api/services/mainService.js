import { handleError } from "../../global/errorMessage.js";

/**
 * Base service class for handling API requests.
 * Provides a generic method to interact with APIs using fetch.
 */
export class MainService {
  /**
   * Initializes the MainService with the base URL of the API.
   *
   * @param {string} apiBase - The base URL for the API.
   */
  constructor(apiBase) {
    this.apiBase = apiBase;
  }

  /**
   * Makes a fetch request to the API and handles errors.
   *
   * @async
   * @param {string} endpoint - The endpoint to append to the base URL for the request.
   * @param {Object} [options={}] - Additional fetch options (e.g., method, headers, body).
   * @returns {Promise<Object|boolean>} - Resolves with the JSON data if the response contains JSON, or `true` if no content is expected.
   * @throws {Error} - Throws an error if the response status is not OK or if the request fails.
   */
  async fetchRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.apiBase}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const { data } = await response.json();
        return data;
      }

      return true;
    } catch (error) {
      handleError(error, `API request to ${this.apiBase}${endpoint}`);
      console.error(`Error during fetchRequest to ${endpoint}:`, error);
      throw error;
    }
  }
}
