import { calculateCurrentBid } from "./calculateBid.js";

export function bidTimeDetails(listing) {
  const hasExpired = new Date(listing.endsAt) < new Date();

  // Get the last bid if the auction has ended, or the current bid if still active
  const lastBid =
    hasExpired && listing.bids && listing.bids.length > 0
      ? listing.bids[listing.bids.length - 1].amount
      : calculateCurrentBid(listing.bids);

  return { hasExpired, lastBid };
}
