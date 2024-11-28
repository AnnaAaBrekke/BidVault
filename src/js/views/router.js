export default async function router(pathname = window.location.pathname) {
  console.log(`Routing to: ${pathname}`); // Debugging purpose

  switch (pathname) {
    case "/":
      await import("./pages/home.js");
      break;
    case "/welcome/":
      await import("./pages/welcome.js");
      break;
    case "/auth/register/":
      await import("./pages/register.js");
      break;
    case "/profile/":
      await import("./pages/profile.js");
      break;
    case "/profile/update/":
      await import("./pages/updateProfile.js");
      break;
    case "/listing/create":
      await import("./pages/create.js");
      break;
    case "/listing/":
      await import("./pages/listing.js");
      break;
    default:
      await import("./pages/notFound.js");
  }
}
