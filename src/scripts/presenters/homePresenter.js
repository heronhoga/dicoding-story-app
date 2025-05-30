export default class HomePresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  renderPage() {
    const text = this.model.getIntroText();
    return this.view.createLayout(text);
  }
}
