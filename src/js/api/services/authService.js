import { API_AUTH } from "../constants.js";
import { getHeaders } from "../headers.js";
import { MainService } from "./mainService.js";

class AuthService extends MainService {
  constructor() {
    super(API_AUTH);
  }

  async login(userData) {
    const response = await this.fetchRequest(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await getHeaders(false)),
      },
      body: JSON.stringify(userData),
    });

    const { accessToken, ...user } = response;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
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
