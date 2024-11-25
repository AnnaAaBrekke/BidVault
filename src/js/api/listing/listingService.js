import { showErrorAlert } from "../../global/alert.js";
import {
  API_AUCTION_LISTINGS,
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
      headers: getHeaders(),
      body: JSON.stringify(listingData), // Include the listing data in the body
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error creating listing: ${errorMessage}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating listing:", error);
    showErrorAlert(`Error creating listing: ${error.message}`);
    throw error;
  }
}
