import { API_AUTH } from "../constants.js";
import { getHeaders } from "../headers.js";
import { MainService } from "./mainService.js";

class AuthService extends MainService {
  constructor() {
    super(API_AUTH);
  }

  async login(userData) {
    try {
      const response = await this.fetchRequest(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await getHeaders(false)),
        },
        body: JSON.stringify(userData),
      });

      console.log("Login response:", response);

      if (!response || !response.name || !response.accessToken) {
        throw new Error("Invalid login response. Missing required fields.");
      }

      localStorage.clear();

      const { accessToken, name, ...user } = response;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", name); // Store only the username
      localStorage.setItem("user", JSON.stringify(user)); // Optionally store the full user object

      console.log("Login successful. Stored name:", name);
      return user;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  }

  async register(userData) {
    return this.fetchRequest(`/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await getHeaders(false)),
      },
      body: JSON.stringify(userData),
    });
  }
}
export const authService = new AuthService();
