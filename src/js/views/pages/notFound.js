// function notFound() {
//   const notFoundContainer = document.getElementById("not-found-container");

//   if (!notFoundContainer) {
//     console.error("Element with ID 'not-found-container' not found.");
//     return;
//   }

//   const heading = document.createElement("h1");
//   heading.textContent = "404 - Page Not Found";
//   notFoundContainer.appendChild(heading);

//   const description = document.createElement("p");
//   description.textContent =
//     "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
//   notFoundContainer.appendChild(description);

//   const homeLink = document.createElement("a");
//   homeLink.href = "/";
//   homeLink.textContent = "Return to Homepage";
//   homeLink.setAttribute("aria-label", "Return to Homepage");
//   notFoundContainer.appendChild(homeLink);

//   setTimeout(() => {
//     window.location.href = "/";
//   }, 5000);
// }

// notFound();
