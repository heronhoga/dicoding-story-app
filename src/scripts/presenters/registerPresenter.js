import { renderRegisterForm } from "../views/registerFormView"
import { register } from "../models/registerModel";

export default class RegisterPagePresenter {
  render() {
    return renderRegisterForm();
  }

  async afterRender() {
    const form = document.getElementById("register-form");
    const passwordInput = form.password;
    const passwordError = document.getElementById("password-error");
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = passwordInput.value;

      if (password.length < 8) {
        passwordError.style.display = "block";
        passwordInput.setAttribute("aria-invalid", "true");
        passwordInput.focus();
        return;
      } else {
        passwordError.style.display = "none";
        passwordInput.removeAttribute("aria-invalid");
      }

      submitButton.disabled = true;
      submitButton.textContent = "Mendaftarkan...";

      try {
        const result = await register({ name, email, password });

        if (result.ok && !result.error) {
          alert("🎉 Pendaftaran berhasil! Silakan login.");
          window.location.hash = "#/login";
        } else {
          alert(`❌ Gagal mendaftar: ${result.message}`);
        }
      } catch (err) {
        alert("❌ Terjadi kesalahan jaringan.");
        console.error(err);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }
}
