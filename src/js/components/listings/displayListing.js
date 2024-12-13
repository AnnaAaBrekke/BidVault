import { isLoggedIn } from "../../global/authGuard.js";
import { outputListings } from "./outputListing.js";
import FormHandler from "../form/formHandler.js";
import { recentBidsToggle } from "../buttons.js";
import { bidTimeDetails } from "./utils/timeBid.js";
import { renderMedia } from "./utils/media.js";
import {
  hideCardLoaders,
  showCardLoaders,
} from "../../global/loaders/loaderCard.js";

showCardLoaders("single-listing", 1); 

export function displaySingleListing(listing) {
  const mainContainer = document.getElementById("single-listing");

  hideCardLoaders("single-listing");
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }

  // Main Layout Container
  const layoutContainer = document.createElement("div");
  layoutContainer.classList.add("single-listing-layout");

  // Shared Layout Section
  const sharedLayoutSection = document.createElement("div");
  sharedLayoutSection.classList.add("shared-layout");
  const sharedLayout = outputListings(listing, true);
  sharedLayoutSection.appendChild(sharedLayout);

  // Sidebar Section
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  // Recent Bids Section
  const bidListContainer = document.createElement("div");
  bidListContainer.classList.add("bid-section-container");

  const bidListButton = document.createElement("button");
  bidListButton.id = "bid-list-button";
  bidListButton.classList.add("recent-bids-btn");
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
      bidAmount.classList.add("bid-amount", "text-accent");
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
  sidebar.appendChild(bidListContainer);

  // Bid Form Section
  const { hasExpired } = bidTimeDetails(listing);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const isOwner =
    loggedInUser?.email?.toLowerCase() ===
    listing?.seller?.email?.toLowerCase();

  const bidFormContainer = document.createElement("div");
  bidFormContainer.id = "bid-form-container";

  if (hasExpired) {
    const bidClosedButton = document.createElement("button");
    bidClosedButton.classList.add("btn", "btn-secondary");
    bidClosedButton.disabled = true;
    bidClosedButton.textContent = "Bid Closed";
    bidFormContainer.appendChild(bidClosedButton);
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
    label.textContent = "Type your credit amount:";
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
    submitButton.classList.add("button", "place-bid-btn");
    submitButton.textContent = "Place Bid";
    bidForm.appendChild(submitButton);

    bidFormContainer.appendChild(bidForm);
  }

  sidebar.appendChild(bidFormContainer);

  // Append sections to layout container
  layoutContainer.appendChild(sharedLayoutSection);
  layoutContainer.appendChild(sidebar);

  // Add layout container to main container
  mainContainer.appendChild(layoutContainer);

  // Description Section
  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container");

  const descriptionTitle = document.createElement("h2");
  descriptionTitle.textContent = "Description";
  descriptionTitle.classList.add("description-title");

  const description = document.createElement("p");
  description.textContent = listing.description || "No description available";
  description.classList.add("description-content");

  descriptionContainer.appendChild(descriptionTitle);
  descriptionContainer.appendChild(description);

  mainContainer.appendChild(descriptionContainer);

  // Gallery
  const galleryTitle = document.createElement("h2");
  galleryTitle.textContent = "Gallery";
  galleryTitle.classList.add("gallery-title");

  if (listing.media && listing.media.length > 1) {
    mainContainer.appendChild(galleryTitle);

    const mediaElements = renderMedia(listing.media, true);
    mainContainer.appendChild(mediaElements);
  } else {
    // Display a "No gallery/media" message
    const noMediaMessage = document.createElement("p");
    noMediaMessage.textContent = "Gallery is empty.";
    noMediaMessage.classList.add("no-media-message"); 
    mainContainer.appendChild(noMediaMessage);
  }

  console.log(listing);
  console.log(listing.media);

  // Recent Bids Toggle
  recentBidsToggle("bid-list-button", "bids-container");

  // Initialize Bid Form if Active Auction
  if (!hasExpired && isLoggedIn() && !isOwner) {
    FormHandler.initialize("#bid-form", "bidOnListing");
  }
}
