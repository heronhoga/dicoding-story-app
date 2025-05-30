import { login } from "../data/api"

export default class LoginModel {
  async loginUser(credentials) {
    return await login(credentials);
  }

  saveSession({ token, userId, name }) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
  }
}
