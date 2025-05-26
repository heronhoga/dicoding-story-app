import { login } from "../../data/api";
import { updateAuthNav } from "../../utils";

export default class LoginPage {
  async render() {
    return `
      <section style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f4f8;">
        <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1); max-width: 400px; width: 100%; text-align: center;">
          <h1 style="margin-bottom: 20px; color: #333;">Login Page</h1>
          <form id="login-form">
            <div style="margin-bottom: 15px; text-align: left;">
              <label for="email" style="display: block; margin-bottom: 5px; color: #555;">Email</label>
              <input type="email" id="email" name="email" required aria-required="true" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div style="margin-bottom: 10px; text-align: left;">
              <label for="password" style="display: block; margin-bottom: 5px; color: #555;">Password</label>
              <input type="password" id="password" name="password" required aria-required="true" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <p id="error-message" style="color: red; display: none; margin-bottom: 10px;">Email atau password salah.</p>
            <button id="submit-button" type="submit" style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
              Login
            </button>
          </form>
          <p style="margin-top: 15px; color: #555;">
            Belum punya akun? <a href="#/register" style="color: #007bff; text-decoration: none;">Daftar di sini</a>
          </p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
    const submitButton = document.getElementById("submit-button");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = form.email.value.trim();
      const password = form.password.value;

      try {
        submitButton.disabled = true;
        submitButton.innerText = "Sedang masuk..";
        const response = await login({ email, password });

        if (response && !response.error && response.loginResult) {
          localStorage.setItem("token", response.loginResult.token);
          localStorage.setItem("userId", response.loginResult.userId);
          localStorage.setItem("name", response.loginResult.name);

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
    });
  }
}
