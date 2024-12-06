import { updateCountdown } from "./utils/countDown.js";
import { bidTimeDetails } from "./utils/timeBid.js";

export function outputListings(listing) {
  const { hasExpired, lastBid } = bidTimeDetails(listing);

  // Create main container
  const listingContent = document.createElement("div");
  listingContent.classList.add("listing-content");
  if (hasExpired) listingContent.classList.add("expired");

  // Listing image
  const mediaImg = document.createElement("img");
  mediaImg.src =
    listing.media && listing.media.length > 0
      ? listing.media[0].url
      : "../src/images/logo.jpg";
  mediaImg.alt = listing.title;
  mediaImg.classList.add("listing-image");
  listingContent.appendChild(mediaImg);

  // Seller container
  const sellerContainer = document.createElement("div");
  sellerContainer.id = "seller-container";

  const sellerAvatar = document.createElement("img");
  sellerAvatar.src = listing.seller?.avatar?.url || "../src/images/avatar.jpg";
  sellerAvatar.alt = `${listing.seller?.name || "Seller"}'s avatar`;
  sellerAvatar.classList.add("seller-avatar");
  sellerContainer.appendChild(sellerAvatar);

  const sellerName = document.createElement("p");
  const strongName = document.createElement("strong");
  strongName.textContent = listing.seller?.name || "Unknown Seller";
  sellerName.appendChild(strongName);
  sellerContainer.appendChild(sellerName);

  listingContent.appendChild(sellerContainer);

  // Title
  const title = document.createElement("h2");
  title.textContent = listing.title;
  listingContent.appendChild(title);

  // Bid info
  const currentBid = document.createElement("p");
  currentBid.textContent = `${hasExpired ? "Winning Bid" : "Current Bid"}: ${lastBid} credits`;
  listingContent.appendChild(currentBid);

  const totalBids = document.createElement("p");
  totalBids.textContent = `Bids: ${listing._count?.bids || 0}`;
  listingContent.appendChild(totalBids);

  // Countdown
  const countdown = document.createElement("p");
  countdown.id = `countdown-${listing.id}`;
  listingContent.appendChild(countdown);

  // If expired, add closed message
  if (hasExpired) {
    const closedMessage = document.createElement("p");
    closedMessage.classList.add("closed-message");
    closedMessage.textContent = "This auction has ended.";
    listingContent.appendChild(closedMessage);
  } else {
    // Update countdown if not expired
    updateCountdown(listing.endsAt, listing.id);
    setInterval(() => updateCountdown(listing.endsAt, listing.id), 1000);
  }

  return listingContent;
}
