import { handleError } from "../../global/errorMessage.js";

export class MainService {
  constructor(apiBase) {
    this.apiBase = apiBase;
  }

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

      // Return `true` for successful responses without a body (e.g., DELETE requests)
      return true;
    } catch (error) {
      handleError(error, `API request to ${this.apiBase}${endpoint}`);
      console.error(`Error during fetchRequest to ${endpoint}:`, error);
      throw error;
    }
  }
}
