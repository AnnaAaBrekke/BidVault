import { showErrorAlert } from "../../global/alert.js";
import { API_AUCTION_LISTINGS, API_AUCTION_SEARCH } from "../constants.js";

import { getHeaders } from "../headers.js";

export async function fetchListings() {
  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}/?_seller=true&_bids=true`,
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
      `${API_AUCTION_LISTINGS}/${listingId}?_bids=true&_seller=true`,
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
      `${API_AUCTION_SEARCH}${encodeURIComponent(query)}`,
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error fetching search results: ${errorMessage}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error when searching", error);
    throw error;
  }
}
