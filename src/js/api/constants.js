export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUCTION = `${API_BASE}/auction`;

export const API_AUCTION_LISTINGS = `${API_AUCTION}/listings`;

export const API_AUCTION_PROFILES = `${API_AUCTION}/profiles`;

export const API_AUCTION_SEARCH = `${API_AUCTION_LISTINGS}/search?q=`;

export const INCLUDE_BIDS_AND_SELLER = "?_bids=true&_seller=true";
