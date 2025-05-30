import HomeModel from "../../models/homeModel.js";
import HomeView from "../../views/homeView.js";
import HomePresenter from "../../presenters/homePresenter.js";

export default class HomePage {
  constructor() {
    this.model = new HomeModel();
    this.view = new HomeView();
    this.presenter = new HomePresenter(this.model, this.view);
  }

  async render() {
    return this.presenter.renderPage();
  }

  async afterRender() {}
}
