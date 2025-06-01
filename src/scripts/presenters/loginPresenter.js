import { updateAuthNav } from "../utils";

export default class LoginPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    this.view.bindLoginHandler(this.handleLogin.bind(this));
  }

  async handleLogin({ email, password }) {
    this.view.showLoading();

    try {
      const response = await this.model.loginUser({ email, password });

      if (response && !response.error && response.loginResult) {
        this.model.saveSession(response.loginResult);
        updateAuthNav();
        this.view.redirectToMain();
      } else {
        this.view.showError();
      }
    } catch (err) {
      console.error("Login error:", err);
      this.view.showError("Terjadi kesalahan saat login.");
    } finally {
      this.view.hideLoading();
    }
  }
}
