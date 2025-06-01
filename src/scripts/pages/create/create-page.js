import CreateStoryView from "../../views/createStoryView.js";
import CreateStoryPresenter from "../../presenters/createStoryPresenter.js";
import StoryModel from "../../models/storyModel.js";
import { updateAuthNav } from "../../utils/index.js";

export default class CreatePage {
  async render() {
    updateAuthNav();
    this.model = new StoryModel();
    this.view = new CreateStoryView();
    return this.view.render();
  }

  async afterRender() {
    this.presenter = new CreateStoryPresenter(this.view);
    await this.presenter.init();
  }

  destroy() {
    if (this.view) {
      this.view.clear();
    }
  }
}
