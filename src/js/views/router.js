export default async function router(pathname = window.location.pathname) {
  // Normalize path: remove "index.html" if present, and remove trailing slash
  const normalizedPath =
    pathname
      .replace(/\/index\.html$/, "") // Remove /index.html if present
      .replace(/\/$/, "") || // Remove trailing slash
    "/"; // Default to "/" for the root path

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  console.log(`Routing to normalized path: ${normalizedPath}`);

  try {
    switch (normalizedPath) {
      case "/":
        console.log("Loading home.js");
        await import("./pages/home.js");
        break;
      case "/welcome":
        console.log("Loading welcome.js");
        await import("./pages/welcome.js");
        break;
      case "/auth/register":
        console.log("Loading register.js");
        await import("./pages/register.js");
        break;
      case "/profile":
        console.log("Loading profile.js");
        await import("./pages/profile.js");
        break;
      case "/profile/update":
        console.log("Loading updateProfile.js");
        await import("./pages/updateProfile.js");
        break;
      case "/listing":
        if (id) {
          console.log("Loading listing.js");
          await import("./pages/listing.js");
          break;
        }
      case "/listing/create":
        console.log("Loading create.js");
        await import("./pages/create.js");
        break;
      default:
        console.log("Loading notFound.js");
        await import("./pages/notFound.js");
    }
  } catch (error) {
    console.error("Error in router:", error);
  }
}
