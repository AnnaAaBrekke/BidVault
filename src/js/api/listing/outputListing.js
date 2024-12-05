import { updateCountdown } from "../../components/countdown.js";

function createImage(media, altText, defaultUrl) {
  const img = document.createElement("img");
  img.src = media && media.length > 0 ? media[0].url : defaultUrl;
  img.alt = altText;
  img.classList.add("listing-image");
  return img;
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
  const { hasExpired, lastBid } = getListingDetails(listing);

  // Create main container
  const listingContent = document.createElement("div");
  listingContent.classList.add("listing-content");
  if (hasExpired) listingContent.classList.add("expired");

  // Add listing image
  const mediaImg = createImage(
    listing.media,
    listing.title,
    "../../src/images/logo.jpg",
  );
  listingContent.appendChild(mediaImg);

  // Add seller container
  const sellerContainer = document.createElement("div");
  sellerContainer.id = "seller-container";

  const sellerAvatar = document.createElement("img");
  sellerAvatar.src =
    listing.seller?.avatar?.url || "../../src/images/avatar.jpg";
  sellerAvatar.alt = `${listing.seller?.name || "Seller"}'s avatar`;
  sellerAvatar.classList.add("seller-avatar");
  sellerContainer.appendChild(sellerAvatar);

  const sellerName = document.createElement("p");
  const strongName = document.createElement("strong");
  strongName.textContent = listing.seller?.name || "Unknown Seller";
  sellerName.appendChild(strongName);
  sellerContainer.appendChild(sellerName);

  listingContent.appendChild(sellerContainer);

  // Add title
  const title = document.createElement("h2");
  title.textContent = listing.title;
  listingContent.appendChild(title);

  // Add bid info
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
