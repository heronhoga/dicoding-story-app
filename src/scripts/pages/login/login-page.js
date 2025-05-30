import LoginModel from "../../models/loginModel.js";
import LoginView from "../../views/loginView.js";
import LoginPresenter from "../../presenters/loginPresenter.js";

export default class LoginPage {
  constructor() {
    this.model = new LoginModel();
    this.view = new LoginView();
    this.presenter = new LoginPresenter(this.model, this.view);
  }

  async render() {
    return this.view.getTemplate();
  }

  async afterRender() {
    await this.presenter.init();
  }
}
