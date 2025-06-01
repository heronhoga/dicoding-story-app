import MainModel from "../../models/mainModel";
import MainPageView from "../../views/mainView";
import MainPagePresenter from "../../presenters/mainPresenter";

export default class MainPage {
  constructor() {
    this.model = new MainModel();
    this.view = new MainPageView();
    this.presenter = new MainPagePresenter(this.view, this.model);
  }

  async render() {
    return await this.presenter.render();
  }

  async afterRender() {
    await this.presenter.afterRender();
  }
}
