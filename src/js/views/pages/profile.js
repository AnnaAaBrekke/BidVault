import { profileService } from "../../api/services/profileService.js";
import { displayUserListings } from "../../components/listings/displayUserListings.js";
import { avatarUpdate } from "../../components/profile/avatar.js";
import { displayProfile } from "../../components/profile/displayProfile.js";
import { requireAuth } from "../../global/authGuard.js";

requireAuth();

async function initProfile() {
  try {
    const profile = await profileService.fetchProfile();

    displayProfile(profile);

    avatarUpdate();

    await displayUserListings(profile.name);
  } catch (error) {
    await handleError(error, "loading profile");
  }
}

initProfile();
