export function renderStoryMap(stories) {
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
