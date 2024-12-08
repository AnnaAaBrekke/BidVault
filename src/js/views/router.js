export default async function router(pathname = window.location.pathname) {
  // Normalize path: remove "index.html" if present, and remove trailing slash
  const normalizedPath =
    pathname
      .replace(/\/index\.html$/, "") // Remove /index.html if present
      .replace(/\/$/, "") || // Remove trailing slash
    "/"; // Default to "/" for the root path

  try {
    switch (normalizedPath) {
      case "/":
        await import("./pages/home.js");
        break;
      case "/welcome":
        await import("./pages/welcome.js");
        break;
      case "/auth/register":
        await import("./pages/register.js");
        break;
      case "/profile":
        await import("./pages/profile.js");
        break;
      case "/profile/update":
        await import("./pages/updateProfile.js");
        break;
      case "/listing":
        await import("./pages/listing.js");
        break;
      case "/listing/create":
        await import("./pages/create.js");
        break;
      default:
        await import("./pages/notFound.js");
    }
  } catch (error) {
    console.error("Error in router:", error);
  }
}
