export default async function router(pathname = window.location.pathname) {
  const normalizedPath = pathname.replace(/\/index\.html$/, "");
  console.log(`Routing to normalized path: ${normalizedPath}`);

  try {
    switch (normalizedPath) {
      case "":
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
        console.log("Loading listing.js");
        await import("./pages/listing.js");
        break;
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
