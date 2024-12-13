import { updateCountdown } from "./utils/countDown.js";
import { renderMedia } from "./utils/media.js";
import { bidTimeDetails } from "./utils/timeBid.js";

export function outputListings(listing) {
  const { hasExpired, lastBid } = bidTimeDetails(listing);

  // Create main container
  const listingContent = document.createElement("div");
  listingContent.classList.add("listing-content");
  if (hasExpired) listingContent.classList.add("expired");

  // Media Section
  const mediaElement = renderMedia(listing.media);
  listingContent.appendChild(mediaElement);

  // Seller Info
  const sellerContainer = document.createElement("div");
  sellerContainer.classList.add("seller-container");

  const sellerAvatar = document.createElement("img");
  sellerAvatar.src = listing.seller?.avatar?.url || "../src/images/avatar.jpg";
  sellerAvatar.alt = `${listing.seller?.name || "Seller"}'s avatar`;
  sellerAvatar.classList.add("seller-avatar");
  sellerContainer.appendChild(sellerAvatar);

  const sellerDetails = document.createElement("div");
  sellerDetails.classList.add("creator-details");

  const creatorLabel = document.createElement("p");
  creatorLabel.textContent = "Creator";
  creatorLabel.classList.add("creator-label");
  sellerDetails.appendChild(creatorLabel);

  const creatorName = document.createElement("p");
  creatorName.textContent = listing.seller?.name || "Anonymous";
  creatorName.classList.add("creator-name");
  sellerDetails.appendChild(creatorName);

  sellerContainer.appendChild(sellerDetails);
  listingContent.appendChild(sellerContainer);

  // Details Container
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");

  // Title
  const title = document.createElement("h2");
  title.textContent = listing.title;
  title.classList.add("auction-title");
  detailsContainer.appendChild(title);

  // Current Bid
  const currentBid = document.createElement("p");
  currentBid.classList.add("last-bid");

  const bidText = document.createTextNode(
    `${hasExpired ? "Winning Bid" : "Current Bid"}: `,
  );
  currentBid.appendChild(bidText);

  const bidAmount = document.createElement("span");
  bidAmount.textContent = `${lastBid} credits`;
  bidAmount.classList.add("text-accent");
  currentBid.appendChild(bidAmount);

  detailsContainer.appendChild(currentBid);

  // Total Bids
  const totalBids = document.createElement("p");
  totalBids.textContent = `Bids: ${listing._count?.bids || 0}`;
  totalBids.classList.add("bid-amount");
  detailsContainer.appendChild(totalBids);

  // Countdown Section
  const countdown = document.createElement("p");
  countdown.id = `countdown-${listing.id}`;
  countdown.classList.add("countdown-timer"); // Add a class for styling

  // If auction has ended, replace countdown with closed message
  if (hasExpired) {
    const closedMessage = document.createElement("p");
    closedMessage.classList.add("closed-message");
    closedMessage.textContent = "This auction has ended.";
    detailsContainer.appendChild(closedMessage);
  } else {
    detailsContainer.appendChild(countdown);
    // Update countdown for active auctions
    updateCountdown(listing.endsAt, listing.id);
    setInterval(() => updateCountdown(listing.endsAt, listing.id), 1000);
  }
  listingContent.appendChild(detailsContainer);

  return listingContent;
}
