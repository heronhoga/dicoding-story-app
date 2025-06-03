import RegisterModel from "../../models/registerModel";
import RegisterView from "../../views/registerFormView";
import RegisterPresenter from "../../presenters/registerPresenter";

export default class RegisterPage {
  constructor() {
    this.model = new RegisterModel();
    this.view = new RegisterView();
    this.presenter = new RegisterPresenter(this.model, this.view);
  }

  render() {
    return this.view.getTemplate();
  }

  async afterRender() {
    await this.presenter.init();
  }
}
