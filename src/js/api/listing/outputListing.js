import { updateCountdown } from "../../components/countDown.js";

function displayItemImg(media, altText, defaultUrl) {
  const mediaUrl = media && media.length > 0 ? media[0].url : defaultUrl;
  return `<img src="${mediaUrl}" alt="${altText}" class="listing-image" />`;
}

function calculateCurrentBid(bids) {
  return bids && bids.length > 0
    ? Math.max(...bids.map((bid) => bid.amount))
    : 0;
}

export function outputListings(listing) {
  const mediaHtml = displayItemImg(
    listing.media,
    listing.title,
    "../../src/images/logo.jpg",
  );
  const currentBid = calculateCurrentBid(listing.bids);

  // Initialize the countdown for this specific listing
  updateCountdown(listing.endsAt, listing.id);

  // Set a unique interval for each listing's countdown to update every second
  setInterval(() => updateCountdown(listing.endsAt, listing.id), 1000);

  return `
    <div class="listing-content">
      ${mediaHtml}
      <div id="seller-container">
        <img src="${
          listing.seller?.avatar?.url || "../../src/images/avatar.jpg"
        }"
             alt="${listing.seller?.name || "Seller"}'s avatar" class="seller-avatar" />
        <p><strong>${listing.seller?.name || "Unknown Seller"}</strong></p>
      </div>
    
      <h2>${listing.title}</h2>
      <p><strong>Current Bid:</strong> ${currentBid} credits</p>
      <p><strong>Bids:</strong> ${listing._count?.bids || 0}</p>
      <p id="countdown-${listing.id}"></p>
    </div>
  `;
}
