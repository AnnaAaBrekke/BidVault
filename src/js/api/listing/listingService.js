import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";
import { handleError } from "../../global/errorMessage.js";
import {
  API_AUCTION_LISTINGS,
  API_AUCTION_PROFILES,
  API_AUCTION_SEARCH,
  INCLUDE_BIDS_AND_SELLER,
} from "../constants.js";

import { getHeaders } from "../headers.js";

export async function fetchListings() {
  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}/${INCLUDE_BIDS_AND_SELLER}`,
      {
        method: "GET",
        headers: getHeaders(),
      },
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error fetching profile: ${errorMessage}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    showErrorAlert(`Error fetching listings: ${error.message}`);
    throw error;
  }
}

export async function fetchSingleListing(listingId) {
  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}/${listingId}${INCLUDE_BIDS_AND_SELLER}`,
      {
        method: "GET",
        headers: getHeaders(),
      },
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error fetching profile: ${errorMessage}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching single listing:", error);
    showErrorAlert(`Error fetching single listing: ${error.message}`);
    throw error;
  }
}

export async function searchListings(query) {
  try {
    if (!query) {
      throw new Error("Search query cannot be empty");
    }

    const response = await fetch(
      `${API_AUCTION_SEARCH}${encodeURIComponent(query)}&${INCLUDE_BIDS_AND_SELLER}`,
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error fetching search results: ${errorMessage}`);
    }
    const { data } = await response.json();
    console.log("Search Results:", data); // Inspect `bids` values - ISSUE? FIX LATER

    return data;
  } catch (error) {
    console.error("Error when searching", error);
    showErrorAlert(`Error when searching for listings: ${error.message}`);
    throw error;
  }
}

export async function createListing(listingData) {
  try {
    const response = await fetch(API_AUCTION_LISTINGS, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error creating listing: ${errorMessage}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}

export async function fetchListingsByUser(username) {
  try {
    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}/listings${INCLUDE_BIDS_AND_SELLER}`,
      {
        method: "GET",
        headers: await getHeaders(),
      },
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error fetching listings for user: ${errorMessage}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings by profile:", error);
    showErrorAlert(`Error fetching user listings: ${error.message}`);
    throw error;
  }
}

export async function deleteListing(listingId) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${listingId}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error deleting listing: ${errorMessage}`);
    }

    showSuccessAlert("Listing successfully deleted!");
    return true;
  } catch (error) {
    console.error("Error deleting listing:", error);
    showErrorAlert(`Error deleting listing: ${error.message}`);
    throw error;
  }
}

export async function bidOnListing(listingId, amount) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${listingId}/bids`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error bidding on listing: ${errorMessage}`);
    }

    const { data } = await response.json();

    // Log bid details for debugging
    console.log(`Bid placed successfully:`, {
      listingId,
      amount,
      data,
    });

    showSuccessAlert(
      `Bid of $${amount} placed successfully on listing ID: ${listingId}!`,
    );

    return data;
  } catch (error) {
    handleError(error, "bidding on listing"); // Added the second argument 'bidding on listing'
  }
}
