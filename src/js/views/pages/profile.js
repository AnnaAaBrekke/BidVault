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

    if (profile.name) {
      await displayUserListings(profile.name);
      console.log(profile);
    }
  } catch (error) {
    console.error(error, "fetching profile details");
  }
}

initProfile();
