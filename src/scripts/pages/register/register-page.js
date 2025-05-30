import RegisterPagePresenter from "../../presenters/registerPresenter";

const presenter = new RegisterPagePresenter();

export default class RegisterPage {
  async render() {
    return presenter.render();
  }

  async afterRender() {
    return presenter.afterRender();
  }
}
