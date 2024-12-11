export function createHeaderSkeleton() {
  const skeleton = document.createElement("div");
  skeleton.classList.add(
    "bg-white",
    "rounded-sm",
    "shadow-md",
    "p-4",
    "animate-pulse",
  );

  // Header placeholder
  const header = document.createElement("div");
  header.classList.add("absolute", "top", "h-4", "bg-gray-300", "mb-2");
  skeleton.appendChild(header);

  return skeleton;
}
