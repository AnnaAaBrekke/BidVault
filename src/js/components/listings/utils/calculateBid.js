export function calculateCurrentBid(bids) {
  return bids && bids.length > 0
    ? Math.max(...bids.map((bid) => bid.amount))
    : 0;
}
