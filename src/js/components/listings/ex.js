// Main container for layout
const layoutContainer = document.createElement("div");
layoutContainer.classList.add("layout-container");

// Left section: Main Image
const mediaSection = document.createElement("div");
mediaSection.classList.add("media-section");
const mainImage = renderMedia(listing.media, true); // Main image rendering
mediaSection.appendChild(mainImage);

// Right section: Auction Details
const auctionDetailsSection = document.createElement("div");
auctionDetailsSection.classList.add("auction-details-section");

// Auction Item Title
const title = document.createElement("h2");
title.classList.add("auction-title");
title.textContent = "Auction Item";
auctionDetailsSection.appendChild(title);

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
auctionDetailsSection.appendChild(sellerContainer);

// Current Bid
const currentBid = document.createElement("p");
currentBid.classList.add("current-bid");
currentBid.innerHTML = `<strong>Current Bid:</strong> ${listing.currentBid || "0"} credits`;
auctionDetailsSection.appendChild(currentBid);

// Deadline
const deadline = document.createElement("p");
deadline.classList.add("deadline");
deadline.innerHTML = `<strong>Deadline date:</strong> ${new Date(listing.endsAt).toLocaleString()}`;
auctionDetailsSection.appendChild(deadline);

// Bid Form
const bidFormContainer = document.createElement("div");
bidFormContainer.classList.add("bid-form-container");

const { hasExpired } = bidTimeDetails(listing);
const loggedInUser = JSON.parse(localStorage.getItem("user"));
const isOwner =
  loggedInUser?.email?.toLowerCase() === listing?.seller?.email?.toLowerCase();

if (hasExpired) {
  const bidClosedMessage = document.createElement("p");
  bidClosedMessage.textContent = "Bidding has closed.";
  bidClosedMessage.classList.add("bid-closed");
  bidFormContainer.appendChild(bidClosedMessage);
} else if (!isLoggedIn()) {
  const loginMessage = document.createElement("p");
  loginMessage.textContent = "You need to log in to place a bid.";
  bidFormContainer.appendChild(loginMessage);
} else if (isOwner) {
  const ownerMessage = document.createElement("p");
  ownerMessage.textContent = "You cannot bid on your own listing.";
  bidFormContainer.appendChild(ownerMessage);
} else {
  const bidForm = document.createElement("form");
  bidForm.id = "bid-form";
  bidForm.classList.add("bid-form");

  const label = document.createElement("label");
  label.htmlFor = "amount";
  label.textContent = "Type credit amount:";
  bidForm.appendChild(label);

  const input = document.createElement("input");
  input.type = "number";
  input.id = "amount";
  input.name = "amount";
  input.min = "1";
  input.required = true;
  bidForm.appendChild(input);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Place Bid";
  submitButton.classList.add("place-bid-btn");
  bidForm.appendChild(submitButton);

  bidFormContainer.appendChild(bidForm);
}

auctionDetailsSection.appendChild(bidFormContainer);
