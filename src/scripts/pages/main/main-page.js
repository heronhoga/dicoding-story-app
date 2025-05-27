import { updateAuthNav } from "../../utils";
import { getStory } from "../../data/api";

export default class MainPage {
  async render() {
    updateAuthNav();
    const responseStories = await getStory();
    const stories = responseStories?.listStory;

    if (
      !responseStories.ok ||
      responseStories.error ||
      !Array.isArray(stories)
    ) {
      localStorage.clear();
      window.location.hash = "#/login";
      return "<p>Failed to load stories.</p>";
    }

    const storyListHTML = stories
      .map(
        (story) => `
      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 16px; margin-bottom: 12px; display: flex; gap: 16px;">
        <img src="${story.photoUrl}" alt="Image of ${
          story.name
        }" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;" />
        <div>
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <small>Created: ${new Date(
            story.createdAt
          ).toLocaleDateString()}</small>
        </div>
      </div>
    `
      )
      .join("");

    return `
      <section style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Daftar Cerita</h2>
          <a href="#/create" style="padding: 10px 16px; background-color: #2196f3; color: white; border-radius: 5px; text-decoration: none;">➕ Tambah Cerita</a>
        </div>
        <div>${storyListHTML}</div>
        
        <h2 style="margin-top: 40px;">Peta Lokasi Cerita</h2>
        <div id="story-map" style="height: 500px; border-radius: 8px; margin-top: 20px;"></div>
      </section>
    `;
  }

  async afterRender() {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.clear();
        updateAuthNav();
        window.location.hash = "#/login";
      });
    }

    const responseStories = await getStory();
    const stories = responseStories?.listStory;

    if (!Array.isArray(stories)) return;

    const map = L.map("story-map").setView([-2.5, 118], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(map);
        marker.bindPopup(`
          <strong>${story.name}</strong><br>
          ${story.description}<br>
          <small>${new Date(story.createdAt).toLocaleDateString()}</small>
        `);
      }
    });
  }
}
