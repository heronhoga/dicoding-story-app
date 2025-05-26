export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function updateAuthNav() {
  const token = localStorage.getItem('token');
  const loginNav = document.getElementById('login-nav');
  const logoutNav = document.getElementById('logout-nav');

  if (token) {
    loginNav.style.display = 'none';
    logoutNav.style.display = 'inline';
  } else {
    loginNav.style.display = 'inline';
    logoutNav.style.display = 'none';
  }
}
