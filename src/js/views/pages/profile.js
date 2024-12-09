import { profileService } from "../../api/services/profileService.js";
import { displayUserListings } from "../../components/listings/displayUserListings.js";
import { avatarUpdate } from "../../components/profile/avatar.js";
import { displayProfile } from "../../components/profile/displayProfile.js";
import { showErrorAlert } from "../../global/alert.js";
import { requireAuth } from "../../global/authGuard.js";

requireAuth();

async function initProfile() {
  try {
    const profile = await profileService.fetchProfile();
    console.log("Fetched Profile:", profile);

    if (!profile?.name) {
      throw new Error("Profile data is invalid or missing.");
    }

    displayProfile(profile);
    console.log("Fetched Profile Data:", profile);

    avatarUpdate();
    console.log("Avatar URL:", profile.avatar?.url);

    await displayUserListings(profile.name);
    console.log("Profile Name:", profile.name);
  } catch (error) {
    console.error("Failed to load profile:", error);
    showErrorAlert("Unable to load profile. Please log in again.");
  }
}

initProfile();
