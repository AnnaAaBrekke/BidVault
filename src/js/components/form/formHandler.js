import { login } from "../../api/auth/login.js";
import { register } from "../../api/auth/register.js";
import {
  bidOnListing,
  createListing,
} from "../../api/listing/listingService.js";
import { updateProfile } from "../../api/profile/update.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";
import { isLoggedIn } from "../../global/authGuard.js";

export default class FormHandler {
  constructor() {}

  /**
   * Initialize the FormHandler for a specific form.
   *
   * @param {string} formId - The ID of the form to initialize.
   * @param {string} action - The action to perform (login, register, update, create).
   */
  static initialize(formId, action) {
    const form = document.querySelector(formId);

    if (!form) {
      throw new Error(`Form with ID "${formId}" not found.`);
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const handler = new FormHandler();
      await handler.handleSubmit(form, action);
    });
  }

  /**
   * Extract and structure form data.
   * @param {HTMLFormElement} form
   * @returns {Object} - Form data as an object.
   */
  static getFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }

  /**
   * Validate form data based on the action.
   *
   * @param {Object} data - Form data.
   * @param {string} action - Action type.
   * @returns {string|null} - Validation error message or null if valid.
   */
  static validateFormData(data, action) {
    const errors = {
      empty: "Form data is empty or invalid.",
      invalidEmail:
        "Email must be a valid @noroff.no or @stud.noroff.no address.",
      shortPassword: "Password must be at least 8 characters long.",
      invalidName: "Name must contain only letters, numbers, and underscores.",
      requiredFields: "All required fields must be filled.",
      invalidBid: "Bid amount must be a positive number.",
    };

    if (!data || Object.keys(data).length === 0) return errors.empty;

    if (["login", "register"].includes(action)) {
      if (!/^[\w\-.]+@stud\.noroff\.no$/.test(data.email)) {
        return errors.invalidEmail;
      }

      if (action === "register" && (!data.name || !/^[\w]+$/.test(data.name))) {
        return errors.invalidName;
      }
      if (!data.password || data.password.length < 8) {
        return errors.shortPassword;
      }
    }
    if (action === "createListing") {
      if (
        !data.title ||
        !data.mainImgUrl ||
        !data.description ||
        !data.endsAt
      ) {
        return errors.requiredFields;
      }

      if (
        !data.media ||
        !Array.isArray(data.media) ||
        data.media.length === 0
      ) {
        return "At least one media item is required.";
      }
    }

    if (action === "bidOnListing") {
      const amount = parseFloat(data.amount);
      if (!amount || amount <= 0) {
        return errors.invalidBid;
      }
    }

    return null;
  }

  /**
   * Handle form submission.
   *
   * @param {HTMLFormElement} form
   * @param {string} action - The action to perform (login, register, update, create, bidOnListing).
   */
  async handleSubmit(form, action) {
    const data = FormHandler.getFormData(form);
    console.log("Form Input Data Submitted:", data);

    const validationError = FormHandler.validateFormData(data, action);

    if (validationError) {
      showErrorAlert(validationError);
      return;
    }

    const actions = {
      register,
      login,
      updateProfile,
      createListing,
      bidOnListing,
    };

    if (!actions[action]) {
      showErrorAlert(`Unknown action: "${action}"`);
      console.error(`Unknown action: "${action}"`);
      return;
    }

    // Ensure user is logged in for actions requiring authentication
    const authRequiredActions = [
      "bidOnListing",
      "updateProfile",
      "createListing",
    ];
    if (authRequiredActions.includes(action) && !isLoggedIn()) {
      showErrorAlert("You must be logged in to perform this action.");
      return;
    }

    try {
      form
        .querySelectorAll("input, textarea, button")
        .forEach((el) => (el.disabled = true));

      const result = await actions[action](data);

      showSuccessAlert(`${action} successful!`);
      if (action === "login" && result?.accessToken) {
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else if (action === "register") {
        setTimeout(() => {
          window.location.href = "/welcome";
        }, 1500);
      } else if (action === "updateProfile") {
        setTimeout(() => {
          window.location.href = "/profile/update";
        }, 1000);
      } else if (action === "createListing") {
        setTimeout(() => {
          window.location.href = `/listing/create?id=${result.id}`;
        }, 1000);
      } else if (action === "bidOnListing") {
        showSuccessAlert(`Bid of ${data.amount} credits placed successfully!`);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      showErrorAlert(`An error occurred: ${error.message}`);
      console.error(`Error during "${action}" submission:`, error);
    } finally {
      form
        .querySelectorAll("input, textarea, button")
        .forEach((el) => (el.disabled = false));
    }
  }
}
