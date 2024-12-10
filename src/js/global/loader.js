export function showSkeletonLoader(containerId, count = 6) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  // Clear previous content to avoid overlapping loaders
  container.innerHTML = "";

  // Create a skeleton loader container
  const skeletonContainer = document.createElement("div");
  skeletonContainer.className = "skeleton-container";
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
    skeleton.className =
      "space-y-4 animate-pulse p-4 bg-white rounded-lg shadow-lg";

    skeleton.innerHTML = `
      <!-- Image placeholder -->
      <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
      </div>
      <!-- Content placeholders -->
      <div class="w-full space-y-2">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px]"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px]"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div>
      <span class="sr-only">Loading...</span>
    `;

    skeletonContainer.appendChild(skeleton);
  }

  // Append the skeleton container to the target container
  container.appendChild(skeletonContainer);
}

export function hideSkeletonLoader(containerId) {
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
