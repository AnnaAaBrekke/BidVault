// import { handleError } from "../../global/errorMessage.js";
// import {
//   API_AUCTION_LISTINGS,
//   API_AUCTION_PROFILES,
//   API_AUCTION_SEARCH,
//   INCLUDE_BIDS_AND_SELLER,
// } from "../constants.js";

// import { getHeaders } from "../headers.js";

// export async function fetchListings() {
//   try {
//     const response = await fetch(
//       `${API_AUCTION_LISTINGS}/${INCLUDE_BIDS_AND_SELLER}`,
//       {
//         method: "GET",
//         headers: getHeaders(),
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Error fetching listings.");
//     }

//     const { data } = await response.json();
//     return data;
//   } catch (error) {
//     handleError(error, "fetching listings");
//     throw error;
//   }
// }

// export async function fetchSingleListing(listingId) {
//   try {
//     const response = await fetch(
//       `${API_AUCTION_LISTINGS}/${listingId}${INCLUDE_BIDS_AND_SELLER}`,
//       {
//         method: "GET",
//         headers: getHeaders(),
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Error fetching single listing.");
//     }

//     const { data } = await response.json();
//     return data;
//   } catch (error) {
//     handleError(error, "fetching single listing");
//     throw error;
//   }
// }

// export async function searchListings(query) {
//   try {
//     if (!query) {
//       throw new Error("Search query cannot be empty");
//     }

//     const response = await fetch(
//       `${API_AUCTION_SEARCH}${encodeURIComponent(query)}&${INCLUDE_BIDS_AND_SELLER}`,
//     );

//     if (!response.ok) {
//       throw new Error("Error fetching search results.");
//     }

//     const { data } = await response.json();
//     console.log("Search Results:", data); // Inspect `bids` values - ISSUE? FIX LATER

//     return data;
//   } catch (error) {
//     handleError(error, "searching listings");
//     throw error;
//   }
// }

// export async function createListing(listingData) {
//   try {
//     const response = await fetch(API_AUCTION_LISTINGS, {
//       method: "POST",
//       headers: await getHeaders(),
//       body: JSON.stringify(listingData),
//     });

//     if (!response.ok) {
//       throw new Error("Error creating listing.");
//     }

//     const { data } = await response.json();
//     return data;
//   } catch (error) {
//     handleError(error, "creating listing");
//     throw error;
//   }
// }

// export async function fetchListingsByUser(username) {
//   try {
//     const response = await fetch(
//       `${API_AUCTION_PROFILES}/${username}/listings${INCLUDE_BIDS_AND_SELLER}`,
//       {
//         method: "GET",
//         headers: await getHeaders(),
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Error fetching listings for user.");
//     }

//     const { data } = await response.json();
//     return data;
//   } catch (error) {
//     handleError(error, "fetching listings by profile");
//     throw error;
//   }
// }

// export async function deleteListing(listingId) {
//   try {
//     const response = await fetch(`${API_AUCTION_LISTINGS}/${listingId}`, {
//       method: "DELETE",
//       headers: await getHeaders(),
//     });

//     if (!response.ok) {
//       throw new Error("Error deleting listing.");
//     }

//     return true;
//   } catch (error) {
//     handleError(error, "deleting listing");
//     throw error;
//   }
// }

// export async function bidOnListing(listingId, amount) {
//   try {
//     const response = await fetch(`${API_AUCTION_LISTINGS}/${listingId}/bids`, {
//       method: "POST",
//       headers: await getHeaders(),
//       body: JSON.stringify({ amount }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to place bid.");
//     }

//     const { data } = await response.json();

//     return data;
//   } catch (error) {
//     handleError(error, "bidding on listing");
//     throw error;
//   }
// }

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
