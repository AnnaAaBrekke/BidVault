import { profileService } from "../../api/services/profileService.js";
import { displayUserListings } from "../../components/listings/displayUserListings.js";
import { avatarUpdate } from "../../components/profile/avatar.js";
import { displayProfile } from "../../components/profile/displayProfile.js";
import { requireAuth } from "../../global/authGuard.js";

requireAuth();
async function initProfile() {
  try {
    console.log("localStorage content:", {
      name: localStorage.getItem("name"),
      accessToken: localStorage.getItem("accessToken"),
    });

    const profile = await profileService.fetchProfile();
    if (!profile || !profile.name) {
      throw new Error("Profile data is invalid or missing.");
    }

    console.log("Profile fetched successfully:", profile);

    displayProfile(profile);
    avatarUpdate();

    if (profile.name) {
      console.log("Fetching user listings for:", profile.name);
      await displayUserListings(profile.name);
    } else {
      console.warn("Profile name is missing.");
    }
  } catch (error) {
    console.error("Error fetching profile details:", error.message);
    alert("Unable to load profile. Please log in again.");
  }
}

initProfile();
