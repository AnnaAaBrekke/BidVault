import { calculateCurrentBid } from "./calculateBid.js";

export function bidTimeDetails(listing) {
  console.log("Listing data:", listing);

  const hasExpired = new Date(listing.endsAt) < new Date();

  const bids = listing.bids || []; // Safeguard against undefined
  const lastBid =
    hasExpired && bids.length > 0
      ? bids[bids.length - 1].amount
      : calculateCurrentBid(bids);

  return { hasExpired, lastBid };
}
