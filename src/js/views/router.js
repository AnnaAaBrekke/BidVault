/**
 * Dynamically imports and routes the user to the appropriate page module based on the provided pathname.
 *
 * - Normalizes the path to ensure consistency by removing "index.html" and trailing slashes.
 * - Dynamically imports the required module for the given route.
 * - Defaults to a "not found" page if the route is unrecognized.
 *
 * @async
 * @param {string} [pathname=window.location.pathname] - The current path to route, defaults to the browser's current pathname.
 * @returns {Promise<void>} - Resolves when the appropriate page module is successfully loaded.
 */
export default async function router(pathname = window.location.pathname) {
  const normalizedPath =
    pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";

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
