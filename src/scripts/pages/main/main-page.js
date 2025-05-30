import MainPagePresenter from "../../presenters/mainPresenter.js";

const presenter = new MainPagePresenter();

export default class MainPage {
  async render() {
    return await presenter.render();
  }

  async afterRender() {
    await presenter.afterRender();
  }
}
