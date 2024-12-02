function notFound() {
  const notFoundContainer = document.createElement("div");
  notFoundContainer.style.textAlign = "center";
  notFoundContainer.style.marginTop = "50px";

  const heading = document.createElement("h1");
  heading.textContent = "404 - Page Not Found";
  notFoundContainer.appendChild(heading);

  const description = document.createElement("p");
  description.textContent =
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
  notFoundContainer.appendChild(description);

  const homeLink = document.createElement("a");
  homeLink.href = "/";

  notFoundContainer.appendChild(homeLink);
  document.body.appendChild(notFoundContainer);

  setTimeout(() => {
    window.location.href = "/";
  }, 5000);
}

notFound();
