import { API_AUCTION, INCLUDE_BIDS_AND_SELLER } from "../constants.js";
import { getHeaders } from "../headers.js";
import { MainService } from "./mainService.js";

/**
 * Service class for managing auction listings.
 * Extends the `MainService` class for shared functionality.
 */
class ListingService extends MainService {
  /**
   * Initializes the ListingService with the API endpoint for listings.
   */
  constructor() {
    super(API_AUCTION);
  }

  /**
   * Fetches all listings, including bids and seller information.
   *
   * @async
   * @returns {Promise<Object[]>} - Resolves with an array of listings.
   */
  async fetchListings(page = 1, limit = 12) {
    return this.fetchRequest(
      `/listings?page=${page}&limit=${limit}&${INCLUDE_BIDS_AND_SELLER}`,
      {
        method: "GET",
        headers: await getHeaders(),
      },
    );
  }

  /**
   * Fetches a single listing by its ID, including bids and seller information.
   *
   * @async
   * @param {string} listingId - The ID of the listing to fetch.
   * @returns {Promise<Object>} - Resolves with the listing data.
   */
  async fetchSingleListing(listingId) {
    return this.fetchRequest(
      `/listings/${listingId}${INCLUDE_BIDS_AND_SELLER}`,
      {
        method: "GET",
        headers: await getHeaders(),
      },
    );
  }

  /**
   * Searches for listings based on a query string.
   *
   * @async
   * @param {string} query - The search query.
   * @returns {Promise<Object[]>} - Resolves with an array of matching listings.
   * @throws {Error} - Throws an error if the search query is empty.
   */
  async searchListings(query) {
    if (!query) throw new Error("Search query cannot be empty.");
    return this.fetchRequest(
      `/listings/search?q=${encodeURIComponent(query)}&${INCLUDE_BIDS_AND_SELLER}`,
    );
  }

  /**
   * Creates a new listing.
   *
   * @async
   * @param {Object} listingData - The data for the new listing.
   * @returns {Promise<Object>} - Resolves with the created listing data.
   */
  async createListing(listingData) {
    return this.fetchRequest(`/listings`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(listingData),
    });
  }

  /**
   * Fetches all listings created by a specific user.
   *
   * @async
   * @param {string} username - The username of the user whose listings are to be fetched.
   * @returns {Promise<Object[]>} - Resolves with an array of the user's listings.
   */
  async fetchListingsByUser(username) {
    return this.fetchRequest(
      `/profiles/${username}/listings${INCLUDE_BIDS_AND_SELLER}`,
      {
        method: "GET",
        headers: await getHeaders(),
      },
    );
  }

  /**
   * Deletes a listing by its ID.
   *
   * @async
   * @param {string} listingId - The ID of the listing to delete.
   * @returns {Promise<void>} - Resolves when the listing is successfully deleted.
   */
  async deleteListing(listingId) {
    return this.fetchRequest(`/listings/${listingId}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });
  }

  /**
   * Places a bid on a specific listing.
   *
   * @async
   * @param {string} listingId - The ID of the listing to bid on.
   * @param {number} amount - The bid amount.
   * @returns {Promise<Object>} - Resolves with the updated listing data, including the bid.
   */
  async bidOnListing(listingId, amount) {
    return this.fetchRequest(`/listings/${listingId}/bids`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({ amount }),
    });
  }
}

export const listingService = new ListingService();
