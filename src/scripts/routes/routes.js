import HomePage from '../pages/home/home-page';
import LoginPage from '../pages/login/login-page';

const routes = {
  '/': new HomePage(),
  '/login': new LoginPage(),
};

export default routes;
