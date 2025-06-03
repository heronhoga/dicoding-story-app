export default class RegisterView {
  constructor() {}

  getTemplate() {
    return `
    <section style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f4f8;">
      <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1); max-width: 400px; width: 100%; text-align: center;">
        <h1 style="margin-bottom: 20px; color: #333;">Register Page</h1>
        <form id="register-form" novalidate>
          <div style="margin-bottom: 15px; text-align: left;">
            <label for="name" style="display: block; margin-bottom: 5px; color: #555;">Nama</label>
            <input type="text" id="name" name="name" required aria-required="true" 
              style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
          </div>
          <div style="margin-bottom: 15px; text-align: left;">
            <label for="email" style="display: block; margin-bottom: 5px; color: #555;">Email</label>
            <input type="email" id="email" name="email" required aria-required="true" 
              style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
          </div>
          <div style="margin-bottom: 10px; text-align: left;">
            <label for="password" style="display: block; margin-bottom: 5px; color: #555;">Password</label>
            <input type="password" id="password" name="password" required aria-required="true" minlength="8"
              style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            <small id="password-error" style="display: none; color: red;">Password minimal 8 karakter</small>
          </div>
          <button id="submit-btn" type="submit" 
            style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
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

  bindRegisterHandler(handler) {
    const form = document.getElementById("register-form");
    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = passwordInput.value;

      if (password.length < 8) {
        passwordError.style.display = "block";
        passwordInput.focus();
        return;
      }

      passwordError.style.display = "none";
      handler({ name, email, password });
    });
  }

  showLoading() {
    const btn = document.getElementById("submit-btn");
    btn.disabled = true;
    btn.textContent = "Mendaftarkan...";
  }

  hideLoading() {
    const btn = document.getElementById("submit-btn");
    btn.disabled = false;
    btn.textContent = "Daftar";
  }

  showError(message = "Gagal mendaftar") {
    alert(`❌ ${message}`);
  }

  showSuccess(message) {
    alert(message);
  }

  redirectToLogin() {
    window.location.hash = "#/login";
  }
}
