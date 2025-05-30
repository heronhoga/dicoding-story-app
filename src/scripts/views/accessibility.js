import { updateAuthNav } from "../utils";

export function setupSkipLink() {
  const skipLink = document.getElementById("skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("main-story-content");
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

export function setupLogout() {
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.clear();
      updateAuthNav();
      window.location.hash = "#/login";
    });
  }
}
