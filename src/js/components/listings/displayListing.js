import { isLoggedIn } from "../../global/authGuard.js";
import { outputListings } from "./outputListing.js";
import FormHandler from "../form/formHandler.js";
import { recentBidsToggle } from "../buttons.js";
import { bidTimeDetails } from "./utils/timeBid.js";

export function displaySingleListing(listing) {
  const mainContainer = document.getElementById("single-listing");

  // Clear the container
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }

  const sharedLayout = outputListings(listing);
  mainContainer.appendChild(sharedLayout);

  // Bids Section
  const bidListContainer = document.createElement("div");
  bidListContainer.id = "bid-list-container";

  const bidListButton = document.createElement("button");
  bidListButton.id = "bid-list-button";
  bidListButton.classList.add("btn", "btn-primary");
  bidListButton.textContent = "Recent Bids";
  bidListContainer.appendChild(bidListButton);

  const bidsContainer = document.createElement("div");
  bidsContainer.id = "bids-container";
  bidsContainer.classList.add("hidden");

  const bidsList = document.createElement("ul");
  bidsList.id = "bids-list";

  if (listing.bids && listing.bids.length) {
    listing.bids.forEach((bid) => {
      const bidItem = document.createElement("li");
      bidItem.classList.add("bid-item");

      const bidAmount = document.createElement("span");
      bidAmount.classList.add("bid-amount");
      bidAmount.textContent = `${bid.amount} credits`;
      bidItem.appendChild(bidAmount);

      const bidTime = document.createElement("span");
      bidTime.classList.add("bid-time");
      bidTime.textContent = ` (${new Date(bid.created).toLocaleString()})`;
      bidItem.appendChild(bidTime);

      const bidCreator = document.createElement("span");
      bidCreator.classList.add("bid-creator");
      bidCreator.textContent = bid.bidder?.name || "Anonymous";
      bidItem.appendChild(bidCreator);

      bidsList.appendChild(bidItem);
    });
  } else {
    const noBidsMessage = document.createElement("li");
    noBidsMessage.classList.add("bid-item");
    noBidsMessage.textContent = "No bids yet.";
    bidsList.appendChild(noBidsMessage);
  }

  bidsContainer.appendChild(bidsList);
  bidListContainer.appendChild(bidsContainer);
  mainContainer.appendChild(bidListContainer);

  // Bid Form
  const { hasExpired } = bidTimeDetails(listing);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // Adjust storage location if needed
  const isOwner = loggedInUser && loggedInUser.name === listing.seller.name;

  const bidFormContainer = document.createElement("div");
  bidFormContainer.id = "bid-form-container";

  if (hasExpired) {
    const bidClosedButton = document.createElement("button");
    bidClosedButton.classList.add("btn", "btn-secondary");
    bidClosedButton.disabled = true;
    bidClosedButton.textContent = "Bid Closed";
    bidFormContainer.appendChild(bidClosedButton);

    const goBackLink = document.createElement("p");
    const backLink = document.createElement("a");
    backLink.href = "/";
    backLink.classList.add("go-back-link");
    backLink.textContent = "Go back to listings";
    goBackLink.appendChild(backLink);
    bidFormContainer.appendChild(goBackLink);
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
    bidForm.setAttribute("data-listing-id", listing.id);

    const label = document.createElement("label");
    label.htmlFor = "amount";
    label.textContent = "Place your bid:";
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
    submitButton.classList.add("btn", "btn-primary");
    submitButton.textContent = "Place Bid";
    bidForm.appendChild(submitButton);

    bidFormContainer.appendChild(bidForm);
  }

  mainContainer.appendChild(bidFormContainer);

  // Description
  const description = document.createElement("p");
  description.textContent = listing.description || "No description available";
  mainContainer.appendChild(description);

  // Gallery 
  const galleryContainer = document.createElement("div");
  galleryContainer.id = "media-gallery";

  if (listing.media.length > 1) {
    listing.media.slice(1).forEach((media) => {
      const img = document.createElement("img");
      img.src = media.url;
      img.alt = media.alt || "Listing Media";
      img.classList.add("gallery-image");
      galleryContainer.appendChild(img);
    });
  } else {
    const noMediaMessage = document.createElement("p");
    noMediaMessage.textContent =
      "No additional media available for this listing.";
    galleryContainer.appendChild(noMediaMessage);
  }
  mainContainer.appendChild(galleryContainer);

  // Recent Bids (toggle)
  recentBidsToggle("bid-list-button", "bids-container");

  // Initialize Bid Form if it is an Active Auction
  if (!hasExpired && isLoggedIn() && !isOwner) {
    FormHandler.initialize("#bid-form", "bidOnListing");
  }
}
