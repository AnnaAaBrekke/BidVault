import { login } from "../../api/auth/login.js";
import { register } from "../../api/auth/register.js";
import { createListing } from "../../api/listing/listingService.js";
import { updateProfile } from "../../api/profile/update.js";
import { showErrorAlert, showSuccessAlert } from "../../global/alert.js";

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

  //DRY THIS LATER GETFORMDATA

  /**
   * Extract and structure form data.
   * @param {HTMLFormElement} form
   * @returns {Object} - Form data as an object.
   */
  static getFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Collect media gallery inputs into an array of objects
    const mediaInputs = form.querySelectorAll(".media-input");
    data.media = Array.from(mediaInputs)
      .filter((input) => input.value) // Exclude empty fields
      .map((input) => ({
        url: input.value, // URL from input field
        alt: `Media for ${data.title}`, // Optional alt text
      }));

    /**
     * Helper function to construct nested objects (e.g., avatar, banner).
     * @param {string} urlKey - The key for the URL field.
     * @param {string} altKey - The key for the alt text field.
     * @returns {Object} - Nested object with `url` and `alt`.
     */
    const buildNestedObject = (urlKey, altKey) => {
      return {
        url: data[urlKey] || "",
        alt: data[altKey] || "",
      };
    };

    // Build avatar and banner objects
    data.avatar = buildNestedObject("avatarUrl", "avatarAlt");
    data.banner = buildNestedObject("bannerUrl", "bannerAlt");

    // Clean up unused fields
    delete data.avatarUrl;
    delete data.avatarAlt;
    delete data.bannerUrl;
    delete data.bannerAlt;

    delete data.mediaInputs;

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

    return null;
  }

  /**
   * Handle form submission.
   *
   * @param {HTMLFormElement} form
   * @param {string} action
   */
  async handleSubmit(form, action) {
    const data = FormHandler.getFormData(form);
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
    };

    if (!actions[action]) {
      showErrorAlert(`Unknown action: "${action}"`);
      console.error(`Unknown action: "${action}"`);
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
          window.location.href = "../../index.html";
        }, 1500);
      } else if (action === "register") {
        setTimeout(() => {
          window.location.href = "../../welcome.html";
        }, 1500);
      } else if (action === "updateProfile") {
        setTimeout(() => {
          window.location.href = "../../profile/index.html";
        }, 1000);
      } else if (action === "createListing") {
        setTimeout(() => {
          window.location.href = `../../index.html`;
        }, 1000);
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
