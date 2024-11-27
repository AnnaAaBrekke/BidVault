import { updateCountdown } from "../../components/countdown.js";

function displayItemImg(media, altText, defaultUrl) {
  const mediaUrl = media && media.length > 0 ? media[0].url : defaultUrl;
  return `<img src="${mediaUrl}" alt="${altText}" class="listing-image" />`;
}

function calculateCurrentBid(bids) {
  return bids && bids.length > 0
    ? Math.max(...bids.map((bid) => bid.amount))
    : 0;
}

export function getListingDetails(listing) {
  const hasExpired = new Date(listing.endsAt) < new Date();

  // Get the last bid if the auction has ended, or the current bid if still active
  const lastBid =
    hasExpired && listing.bids && listing.bids.length > 0
      ? listing.bids[listing.bids.length - 1].amount
      : calculateCurrentBid(listing.bids);

  return { hasExpired, lastBid };
}

export function outputListings(listing) {
  const mediaHtml = displayItemImg(
    listing.media,
    listing.title,
    "../../src/images/logo.jpg",
  );

  const { hasExpired, lastBid } = getListingDetails(listing);

  // Call updateCountdown and set interval only if the listing is not expired
  if (!hasExpired) {
    updateCountdown(listing.endsAt, listing.id);
    setInterval(() => updateCountdown(listing.endsAt, listing.id), 1000);
  }
  let listingHTML = `
  <div class="listing-content ${hasExpired ? "expired" : ""}">
    ${mediaHtml}
    <div id="seller-container">
      <img src="${listing.seller?.avatar?.url || "../../src/images/avatar.jpg"}"
           alt="${listing.seller?.name || "Seller"}'s avatar" class="seller-avatar" />
      <p><strong>${listing.seller?.name || "Unknown Seller"}</strong></p>
    </div>
  
    <h2>${listing.title}</h2>
    <p><strong>${hasExpired ? "Winning Bid" : "Current Bid"}:</strong> ${lastBid} credits</p>
    <p><strong>Bids:</strong> ${listing._count?.bids || 0}</p>
    <p id="countdown-${listing.id}"></p>
`;

  // If the listing is expired, add a "Closed" message and change the style
  if (hasExpired) {
    listingHTML += `
    <p class="closed-message">This auction has ended.</p>
    <button class="btn btn-secondary" disabled>Bid Closed</button>
  `;
  } else {
    listingHTML += `
    <button class="btn btn-primary" id="place-bid-${listing.id}">Place a Bid</button>
  `;
  }

  listingHTML += `</div>`;

  return listingHTML;
}
