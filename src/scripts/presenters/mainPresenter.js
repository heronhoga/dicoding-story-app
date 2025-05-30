import { updateAuthNav } from "../utils";
import { fetchStories } from "../models/mainModel";
import { renderStoryList } from "../views/storyListView";
import { renderStoryMap } from "../views/storyMapView";
import { setupSkipLink, setupLogout } from "../views/accessibility";

export default class MainPagePresenter {
  async render() {
    updateAuthNav();

    const stories = await fetchStories();
    if (!stories) {
      localStorage.clear();
      window.location.hash = "#/login";
      return "<p>Failed to load stories.</p>";
    }

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

  async afterRender() {
    setupSkipLink();
    setupLogout();

    const stories = await fetchStories();
    if (stories) {
      renderStoryMap(stories);
    }
  }
}
