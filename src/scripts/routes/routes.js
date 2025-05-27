import CreatePage from "../pages/create/create-page";
import HomePage from "../pages/home/home-page";
import LoginPage from "../pages/login/login-page";
import MainPage from "../pages/main/main-page";
import RegisterPage from "../pages/register/register-page";

const routes = {
  "/": new HomePage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/main": new MainPage(),
  "/create": new CreatePage(),
};

export default routes;
