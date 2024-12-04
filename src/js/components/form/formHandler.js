import { login } from "../../api/auth/login.js";
import { register } from "../../api/auth/register.js";
import {
  bidOnListing,
  createListing,
} from "../../api/listing/listingService.js";
import { updateProfile } from "../../api/profile/update.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";
import { isLoggedIn } from "../../global/authGuard.js";
import { handleError } from "../../global/errorMessage.js";
import { validateImageUrl } from "../../global/validImg.js";

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

    console.log(`Initializing form with ID: ${formId}`);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      console.log("Submit event prevented");

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
    const data = Object.fromEntries(formData.entries());
    const mediaInputs = Array.from(form.querySelectorAll(".media-input"));
    const mediaUrls = [];

    // Validate and collect media URLs
    mediaInputs.forEach((input) => {
      const url = input.value.trim();
      if (url) {
        if (!validateImageUrl(input)) {
          // Skip invalid media URLs
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
      if (!data.title || !data.description || !data.endsAt) {
        return errors.requiredFields;
      }
    }

    if (action === "bidOnListing") {
      const amount = parseFloat(data.amount);
      console.log("Validating bid amount:", data.amount, "Parsed:", amount);
      if (isNaN(amount) || amount <= 0) {
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
      handleError(
        new Error(`Unknown action: "${action}"`),
        "FormHandler.initialize",
      );
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

      let result;
      if (action === "bidOnListing") {
        // Pass `listingId` and `amount` as separate arguments for the bid on listing
        result = await actions[action](data.listingId, parseFloat(data.amount));
      } else {
        // Pass the entire `data` object for other actions
        result = await actions[action](data);
      }

      console.log("Action result:", result);

      showSuccessAlert(`${action} successful!`);

      // Redirect based on the action performed
      if (action === "login" && result?.accessToken) {
        setTimeout(() => {
          // Redirect to home after successful login
          window.location.href = "/";
        }, 1500);
      } else if (action === "register") {
        setTimeout(() => {
          // Redirect to the welcome page after successful registration
          window.location.href = "/welcome";
        }, 1500);
      } else if (action === "updateProfile") {
        // Check if result contains the name property
        setTimeout(() => {
          // Redirect to profile page after successful update
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
