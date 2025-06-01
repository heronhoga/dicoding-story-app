import { updateAuthNav } from "../utils";
import { renderStoryList } from "./storyListView";
import { renderStoryMap } from "./storyMapView";
import { setupSkipLink, setupLogout } from "./accessibility";

export default class MainPageView {
  updateAuthNav() {
    updateAuthNav();
  }

  setupAccessibility() {
    setupSkipLink();
    setupLogout();
  }

  render(stories) {
    return `
      <section id="main-story-content" tabindex="-1" style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Daftar Cerita</h2>
          <a href="#/create" style="padding: 10px 16px; background-color: #2196f3; color: white; border-radius: 5px; text-decoration: none;">➕ Tambah Cerita</a>
        </div>
        <div>${renderStoryList(stories)}</div>
        
        <h2 style="margin-top: 40px;">Peta Lokasi Cerita</h2>
        <div id="story-map" style="height: 500px; border-radius: 8px; margin-top: 20px;"></div>
      </section>
    `;
  }

  renderMap(stories) {
    renderStoryMap(stories);
  }
}
