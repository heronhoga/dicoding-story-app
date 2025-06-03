export function renderStoryList(stories) {
  return stories
    .map(
      (story) => `
      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 16px; margin-bottom: 12px; display: flex; gap: 16px;">
        <img src="${story.photoUrl}" alt="Foto cerita dari ${story.name}: ${story.description}" 
             style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;" />
        <div>
          <p>${story.name}</p>
          <p>${story.description}</p>
          <small>Created: ${new Date(story.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
    `
    )
    .join("");
}
