export function createFormSkeleton() {
  const skeleton = document.createElement("div");
  skeleton.classList.add("animate-pulse", "space-y-4", "p-4", "form-skeleton");

  // Avatar placeholder
  const avatarPlaceholder = document.createElement("div");
  avatarPlaceholder.classList.add(
    "rounded-full",
    "h-16",
    "w-16",
    "bg-gray-300",
    "mx-auto",
  );
  skeleton.appendChild(avatarPlaceholder);

  // Input field placeholders
  for (let i = 0; i < 5; i++) {
    const inputPlaceholder = document.createElement("div");
    inputPlaceholder.classList.add("h-5", "bg-gray-300", "rounded", "w-full");
    skeleton.appendChild(inputPlaceholder);
  }

  // Submit button placeholder
  const buttonPlaceholder = document.createElement("div");
  buttonPlaceholder.classList.add("h-10", "bg-gray-400", "rounded", "w-full");
  skeleton.appendChild(buttonPlaceholder);

  return skeleton;
}

export function showFormLoader(form) {
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  // Ensure the form doesn't already have a loader
  if (form.querySelector(".form-loader-wrapper")) {
    console.warn("Loader already exists in the form.");
    return;
  }

  // Create loader wrapper
  const loaderWrapper = document.createElement("div");
  loaderWrapper.classList.add(
    "absolute",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "flex",
    "items-center",
    "justify-center",
    "bg-white",
    "z-50",
    "opacity-75",
    "form-loader-wrapper",
  );

  const skeleton = createFormSkeleton();
  loaderWrapper.appendChild(skeleton);

  // Ensure relative positioning for the form
  if (!["relative", "absolute"].includes(form.style.position)) {
    form.style.position = "relative";
  }

  form.appendChild(loaderWrapper);
}

export function hideFormLoader(form) {
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  // Find and remove the loader wrapper
  const loaderWrapper = form.querySelector(".form-loader-wrapper");
  if (loaderWrapper) {
    loaderWrapper.remove();
  } else {
    console.warn("No loader wrapper found to remove.");
  }
}
