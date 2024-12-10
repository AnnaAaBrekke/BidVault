export function showCardLoader(containerId, count = 6) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  // Clear previous content to avoid overlapping loaders
  container.innerHTML = "";

  // Create a skeleton loader container
  const skeletonContainer = document.createElement("div");
  skeletonContainer.id = "skeletonLoader";
  skeletonContainer.classList.add(
    "grid",
    "grid-cols-1",
    "sm:grid-cols-2",
    "lg:grid-cols-3",
    "gap-4",
  );

  // Add individual skeleton elements
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add(
      "max-w-sm",
      "p-4",
      "border",
      "border-gray-200",
      "rounded",
      "shadow",
      "animate-pulse",
      "md:p-6",
      "dark:border-gray-700",
    );

    // Create the top image placeholder
    const imagePlaceholder = document.createElement("div");
    imagePlaceholder.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "h-48",
      "mb-4",
      "bg-gray-300",
      "rounded",
      "dark:bg-gray-700",
    );

    const svgImage = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    svgImage.classList.add(
      "w-10",
      "h-10",
      "text-gray-200",
      "dark:text-gray-600",
    );
    svgImage.setAttribute("aria-hidden", "true");
    svgImage.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgImage.setAttribute("fill", "currentColor");
    svgImage.setAttribute("viewBox", "0 0 16 20");

    const pathImage = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    pathImage.setAttribute(
      "d",
      "M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z",
    );
    svgImage.appendChild(pathImage);
    imagePlaceholder.appendChild(svgImage);

    // Create text placeholders
    const textPlaceholder1 = document.createElement("div");
    textPlaceholder1.classList.add(
      "h-2.5",
      "bg-gray-200",
      "rounded-full",
      "dark:bg-gray-700",
      "w-48",
      "mb-4",
    );

    const textPlaceholder2 = document.createElement("div");
    textPlaceholder2.classList.add(
      "h-2",
      "bg-gray-200",
      "rounded-full",
      "dark:bg-gray-700",
      "mb-2.5",
    );

    const textPlaceholder3 = textPlaceholder2.cloneNode();
    const textPlaceholder4 = document.createElement("div");
    textPlaceholder4.classList.add(
      "h-2",
      "bg-gray-200",
      "rounded-full",
      "dark:bg-gray-700",
    );

    // Create bottom row with icon and text
    const bottomRow = document.createElement("div");
    bottomRow.classList.add("flex", "items-center", "mt-4");

    const svgBottomIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    svgBottomIcon.classList.add(
      "w-10",
      "h-10",
      "me-3",
      "text-gray-200",
      "dark:text-gray-700",
    );
    svgBottomIcon.setAttribute("aria-hidden", "true");
    svgBottomIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgBottomIcon.setAttribute("fill", "currentColor");
    svgBottomIcon.setAttribute("viewBox", "0 0 20 20");

    const pathBottomIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    pathBottomIcon.setAttribute(
      "d",
      "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z",
    );
    svgBottomIcon.appendChild(pathBottomIcon);

    const textGroup = document.createElement("div");
    const bottomText1 = document.createElement("div");
    bottomText1.classList.add(
      "h-2.5",
      "bg-gray-200",
      "rounded-full",
      "dark:bg-gray-700",
      "w-32",
      "mb-2",
    );

    const bottomText2 = document.createElement("div");
    bottomText2.classList.add(
      "w-48",
      "h-2",
      "bg-gray-200",
      "rounded-full",
      "dark:bg-gray-700",
    );

    textGroup.appendChild(bottomText1);
    textGroup.appendChild(bottomText2);
    bottomRow.appendChild(svgBottomIcon);
    bottomRow.appendChild(textGroup);

    // Append all elements to the skeleton
    skeleton.appendChild(imagePlaceholder);
    skeleton.appendChild(textPlaceholder1);
    skeleton.appendChild(textPlaceholder2);
    skeleton.appendChild(textPlaceholder3);
    skeleton.appendChild(textPlaceholder4);
    skeleton.appendChild(bottomRow);

    // Append skeleton to the skeleton container
    skeletonContainer.appendChild(skeleton);
  }

  // Append the skeleton container to the target container
  container.appendChild(skeletonContainer);
}

export function hideCardLoader(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  const skeletonLoader = document.getElementById("skeletonLoader");

  if (skeletonLoader) {
    skeletonLoader.remove(); // Remove the skeleton loader
  } else {
    console.warn("No skeleton loader found to hide.");
  }
}
