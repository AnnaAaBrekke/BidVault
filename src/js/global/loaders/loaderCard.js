export function createCardSkeleton() {
  const skeleton = document.createElement("div");
  skeleton.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "p-4",
    "animate-pulse",
  );

  const header = document.createElement("div");
  header.classList.add("w-2/3", "h-4", "bg-gray-300", "rounded", "mb-2");
  skeleton.appendChild(header);

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

  // Clear the container before adding loaders
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const loader = createCardSkeleton();
    loader.classList.add("card-loader"); // Add a shared class for all loaders
    container.appendChild(loader);
  }
}
export function hideCardLoaders(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  // Select all elements with the "card-loader" class and remove them
  const loaders = container.querySelectorAll(".card-loader");
  loaders.forEach((loader) => loader.remove());
}
