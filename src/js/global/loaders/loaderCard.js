export function createCardSkeleton() {
  const skeleton = document.createElement("div");
  skeleton.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "p-4",
    "animate-pulse",
  );

  // Header placeholder
  const header = document.createElement("div");
  header.classList.add("w-2/3", "h-4", "bg-gray-300", "rounded", "mb-2");
  skeleton.appendChild(header);

  // Body placeholders
  for (let i = 0; i < 2; i++) {
    const bodyLine = document.createElement("div");
    bodyLine.classList.add("w-full", "h-8", "bg-gray-300", "rounded", "mb-2");
    skeleton.appendChild(bodyLine);
  }

  const footer = document.createElement("div");
  footer.classList.add("w-1/2", "h-8", "bg-gray-300", "rounded");
  skeleton.appendChild(footer);

  return skeleton;
}

export function showCardLoaders(containerId, count = 6) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  // Clear previous content to avoid overlapping loaders
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    container.appendChild(createCardSkeleton());
  }
}

export function hideCardLoaders(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const skeletonLoader = container.querySelector("#skeletonLoader");
  if (skeletonLoader) skeletonLoader.classList.add("hidden");
}
