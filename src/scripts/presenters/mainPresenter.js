export default class MainPagePresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  async render() {
    this.view.updateAuthNav();

    const stories = await this.model.fetchStories();
    if (!stories) {
      localStorage.clear();
      window.location.hash = "#/login";
      return "<p>Failed to load stories.</p>";
    }

    return this.view.render(stories);
  }

  async afterRender() {
    this.view.setupAccessibility();

    const stories = await this.model.fetchStories();
    if (stories) {
      this.view.renderMap(stories);
    }
  }
}
