import { register } from "../../data/api";
export default class RegisterPage {
  async render() {
    return `
      <section style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #f7fafd;">
        <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1); max-width: 400px; width: 100%; text-align: center;">
          <h1 style="margin-bottom: 20px; color: #333;">Register</h1>
          <form id="register-form" novalidate>
            <div style="margin-bottom: 15px; text-align: left;">
              <label for="name" style="display: block; margin-bottom: 5px; color: #555;">Nama</label>
              <input type="text" id="name" name="name" required aria-required="true" aria-label="Nama lengkap"
                style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div style="margin-bottom: 15px; text-align: left;">
              <label for="email" style="display: block; margin-bottom: 5px; color: #555;">Email</label>
              <input type="email" id="email" name="email" required aria-required="true" aria-label="Alamat email"
                style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div style="margin-bottom: 10px; text-align: left;">
              <label for="password" style="display: block; margin-bottom: 5px; color: #555;">Password</label>
              <input type="password" id="password" name="password" required minlength="8" aria-required="true" aria-label="Kata sandi minimal 8 karakter"
                style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
              <small id="password-error" style="color: red; display: none;">Password minimal 8 karakter</small>
            </div>
            <button type="submit"
              style="background-color: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
              Daftar
            </button>
          </form>
          <p style="margin-top: 15px; color: #555;">
            Sudah punya akun? <a href="#/login" style="color: #007bff; text-decoration: none;">Login di sini</a>
          </p>
        </div>
      </section>
    `;
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
