import { listingService } from "../../api/services/listingService.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";
import { isLoggedIn } from "../../global/authGuard.js";
import { handleError } from "../../global/errorMessage.js";
import { validateImageUrl } from "./utils/validImg.js";
import { authService } from "../../api/services/authService.js";
import { profileService } from "../../api/services/profileService.js";

/**
 * Handles form initialization, validation, and submission for various actions.
 */
export default class FormHandler {
  constructor() {}

  /**
   * Initialize the FormHandler for a specific form.
   *
   * @param {string} formId - The ID of the form to initialize.
   * @param {string} action - The action to perform (e.g., login, register, update).
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
   * Extracts and structures form data for submission.
   *
   * @param {HTMLFormElement} form - The form element to process.
   * @returns {Object} - An object containing the form data.
   */
  static getFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const mediaInputs = Array.from(form.querySelectorAll(".media-input"));
    const mediaUrls = [];

    mediaInputs.forEach((input) => {
      const url = input.value.trim();
      if (url) {
        if (!validateImageUrl(input)) {
          return;
        }
        mediaUrls.push({ url, alt: "" });
      }
    });

    if (mediaUrls.length > 0) {
      data.media = mediaUrls;
    }

    const listingId = form.dataset.listingId;
    if (listingId) {
      data.listingId = listingId;
    }

    return data;
  }

  /**
   * Validates form data based on the specified action.
   *
   * @param {Object} data - The form data to validate.
   * @param {string} action - The action to perform (e.g., login, register).
   * @returns {string|null} - An error message if validation fails, or null if valid.
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
      if (!data.title || !data.description || !data.endsAt) {
        return errors.requiredFields;
      }
    }

    if (action === "bidOnListing") {
      const amount = parseFloat(data.amount);
      if (isNaN(amount) || amount <= 0) {
        return errors.invalidBid;
      }
    }

    return null;
  }

  /**
   * Handles the form submission process, including validation and action execution.
   *
   * @param {HTMLFormElement} form - The form being submitted.
   * @param {string} action - The action to perform (e.g., login, register, bidOnListing).
   */
  async handleSubmit(form, action) {
    const data = FormHandler.getFormData(form);

    const validationError = FormHandler.validateFormData(data, action);

    if (validationError) {
      showErrorAlert(validationError);
      return;
    }

    const actions = {
      register: (data) => authService.register(data),
      login: (data) => authService.login(data),
      updateProfile: (data) => profileService.updateProfile(data),
      createListing: (data) => listingService.createListing(data),
      bidOnListing: (listingId, amount) =>
        listingService.bidOnListing(listingId, amount),
    };

    if (!actions[action]) {
      handleError(
        new Error(`Unknown action: "${action}"`),
        "FormHandler.initialize",
      );
      console.error(`Unknown action: "${action}"`);
      return;
    }

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

      let result;
      if (action === "bidOnListing") {
        result = await actions[action](data.listingId, parseFloat(data.amount));
      } else {
        result = await actions[action](data);
      }

      console.log("Action result:", result);

      showSuccessAlert(`${action} successful!`);

      if (action === "login") {
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else if (action === "register") {
        setTimeout(() => {
          window.location.href = "/welcome";
        }, 1500);
      } else if (action === "updateProfile") {
        setTimeout(() => {
          window.location.href = "/profile/";
        }, 1500);
      } else if (action === "createListing") {
        if (result?.id) {
          setTimeout(() => {
            window.location.href = `/listing/?id=${result.id}`;
          }, 1000);
        } else {
          showErrorAlert("Failed to retrieve listing ID. Please try again.");
        }
      } else if (action === "bidOnListing") {
        setTimeout(() => window.location.reload(), 1500);
        showSuccessAlert(`Bid of ${data.amount} credits placed successfully!`);
      }
    } catch (error) {
      handleError(error, action);
    } finally {
      form
        .querySelectorAll("input, textarea, button")
        .forEach((el) => (el.disabled = false));
    }
  }
}
