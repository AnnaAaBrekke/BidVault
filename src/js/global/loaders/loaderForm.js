export function createFormSkeleton(form) {
  const skeleton = document.createElement("div");
  skeleton.classList.add(
    "animate-pulse",
    "space-y-4",
    "p-4",
    "form-skeleton",
    "max-w-sm",
    "h-auto",
  );

  const header = document.createElement("div");
  header.classList.add("w-40", "h-4", "bg-gray-300", "rounded", "mb-4");
  skeleton.appendChild(header);

  // Dynamically creates the skeleton fields based on the form structure
  const fields = form.querySelectorAll("input, textarea, button");
  fields.forEach((field) => {
    const formFieldSkeleton = document.createElement("div");

    if (field.tagName === "TEXTAREA") {
      formFieldSkeleton.classList.add(
        "h-16",
        "bg-gray-300",
        "rounded",
        "w-full",
      );
    } else if (field.tagName === "BUTTON") {
      formFieldSkeleton.classList.add(
        "h-8",
        "bg-gray-400",
        "rounded",
        "w-full",
      );
    } else {
      formFieldSkeleton.classList.add(
        "h-10",
        "bg-gray-300",
        "rounded",
        "w-full",
      );
    }

    skeleton.appendChild(formFieldSkeleton);
  });

  return skeleton;
}

export function showFormLoader(form) {
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  if (form.querySelector(".form-loader-wrapper")) {
    console.warn("Loader already exists in the form.");
    return;
  }

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

  const skeleton = createFormSkeleton(form);
  loaderWrapper.appendChild(skeleton);

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

  const loaderWrapper = form.querySelector(".form-loader-wrapper");
  if (loaderWrapper) {
    loaderWrapper.remove();
  } else {
    console.warn("No loader wrapper found to remove.");
  }
}
