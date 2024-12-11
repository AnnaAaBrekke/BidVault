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

    displayProfile(profile);

    avatarUpdate();

    await displayUserListings(profile.name);
  } catch (error) {
    console.error("Failed to load profile:", error);
    showErrorAlert("Unable to load profile. Please log in again.");
  }
}

initProfile();
