import { API_AUCTION, INCLUDE_BIDS_AND_SELLER } from "../constants.js";
import { getHeaders } from "../headers.js";
import { MainService } from "./mainService.js";

class ListingService extends MainService {
  constructor() {
    super(API_AUCTION);
  }

  async fetchListings() {
    return this.fetchRequest(`/listings/${INCLUDE_BIDS_AND_SELLER}`, {
      method: "GET",
      headers: await getHeaders(),
    });
  }

  async fetchSingleListing(listingId) {
    return this.fetchRequest(
      `/listings/${listingId}${INCLUDE_BIDS_AND_SELLER}`,
      {
        method: "GET",
        headers: await getHeaders(),
      },
    );
  }

  async searchListings(query) {
    if (!query) throw new Error("Search query cannot be empty.");
    return this.fetchRequest(
      `/listings/search?q=${encodeURIComponent(query)}&${INCLUDE_BIDS_AND_SELLER}`,
    );
  }

  async createListing(listingData) {
    return this.fetchRequest(`/listings`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(listingData),
    });
  }

  async fetchListingsByUser(username) {
    return this.fetchRequest(
      `/profiles/${username}/listings${INCLUDE_BIDS_AND_SELLER}`,
      {
        method: "GET",
        headers: await getHeaders(),
      },
    );
  }

  async deleteListing(listingId) {
    return this.fetchRequest(`/listings/${listingId}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });
  }

  async bidOnListing(listingId, amount) {
    return this.fetchRequest(`/listings/${listingId}/bids`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({ amount }),
    });
  }
}
export const listingService = new ListingService();
