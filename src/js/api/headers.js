export function getHeaders() {
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log("API Key:", apiKey);

  // Check if access token exists
  if (!accessToken) {
    console.error("Access token is missing. Redirecting to login...");
    window.location.href = "../welcome.html";
    throw new Error("Access token is missing. User may not be logged in.");
  }

  // Check if API key exists
  if (!apiKey) {
    console.error(
      "API key is missing. Ensure VITE_API_KEY is set in your .env file.",
    );
    throw new Error(
      "API key is missing. Check your environment configuration.",
    );
  }

  return {
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey,
    "Content-Type": "application/json",
  };
}
