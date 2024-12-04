import FormHandler from "../../components/form/formHandler.js";
import { requireAuth } from "../../global/authGuard.js";

requireAuth();

FormHandler.initialize("#create-listing-form", "createListing");
