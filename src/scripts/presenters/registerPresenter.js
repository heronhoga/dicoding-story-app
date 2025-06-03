import { updateAuthNav } from "../utils";

export default class RegisterPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    this.view.bindRegisterHandler(this.handleRegister.bind(this));
  }

  async handleRegister({ name, email, password }) {
    this.view.showLoading();

    try {
      const response = await this.model.register({ name, email, password });

      if (response && !response.error) {
        this.view.showSuccess("🎉 Pendaftaran berhasil! Silakan login.");
        updateAuthNav();
        this.view.redirectToLogin();
      } else {
        this.view.showError(response.message || "Pendaftaran gagal.");
      }
    } catch (error) {
      console.error("Register error:", error);
      this.view.showError("Terjadi kesalahan jaringan.");
    } finally {
      this.view.hideLoading();
    }
  }
}
