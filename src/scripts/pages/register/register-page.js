import RegisterPagePresenter from "../../presenters/registerPresenter";
import RegisterView from "../../views/registerFormView";
import RegisterModel from "../../models/registerModel";

export default class RegisterPage {
  constructor() {
    this.model = new RegisterModel();
    this.view = new RegisterView();
    this.presenter = new RegisterPagePresenter(this.view, this.model);
  }

  render() {
    return this.presenter.render();
  }

  async afterRender() {
    await this.presenter.afterRender();
  }
}
