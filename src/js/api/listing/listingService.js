import { showSuccessAlert } from "../../global/alert.js";
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
      throw new Error("Error fetching listings.");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    handleError(error, "fetching listings"); // Replaced the catch block with handleError
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
      throw new Error("Error fetching single listing.");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    handleError(error, "fetching single listing"); // Replaced the catch block with handleError
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
      throw new Error("Error fetching search results.");
    }

    const { data } = await response.json();
    console.log("Search Results:", data); // Inspect `bids` values - ISSUE? FIX LATER

    return data;
  } catch (error) {
    handleError(error, "searching listings"); // Replaced the catch block with handleError
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
      throw new Error("Error creating listing.");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    handleError(error, "creating listing"); // Replaced the catch block with handleError
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
      throw new Error("Error fetching listings for user.");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    handleError(error, "fetching listings by profile"); // Replaced the catch block with handleError
  }
}

export async function deleteListing(listingId) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${listingId}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Error deleting listing.");
    }

    showSuccessAlert("Listing successfully deleted!");
    return true;
  } catch (error) {
    handleError(error, "deleting listing"); // Replaced the catch block with handleError
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
      throw new Error("Failed to place bid.");
    }

    const { data } = await response.json();

    // Log bid details for debugging
    console.log(`Bid placed successfully:`, { listingId, amount, data });

    // Show success message to the user
    showSuccessAlert(
      `Bid of $${amount} placed successfully on listing ID: ${listingId}!`,
    );

    return data;
  } catch (error) {
    // Handle any errors using the handleError function
    handleError(error, "bidding on listing"); // Replaced the catch block with handleError
  }
}
