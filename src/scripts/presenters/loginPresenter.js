import { updateAuthNav } from "../utils";

export default class LoginPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    this.view.bindLoginHandler(this.handleLogin.bind(this));
  }

  async handleLogin({ email, password, errorMessage, submitButton }) {
    try {
      submitButton.disabled = true;
      submitButton.innerText = "Sedang masuk..";

      const response = await this.model.loginUser({ email, password });

      if (response && !response.error && response.loginResult) {
        this.model.saveSession(response.loginResult);
        updateAuthNav();
        window.location.hash = "#/main";
      } else {
        errorMessage.style.display = "block";
      }
    } catch (err) {
      console.error("Login error:", err);
      errorMessage.style.display = "block";
    } finally {
      submitButton.disabled = false;
      submitButton.innerText = "Login";
    }
  }
}
