import { getStory } from "../data/api";

export default class MainModel {
  async fetchStories() {
    try {
      const response = await getStory();
      if (!response.ok || response.error || !Array.isArray(response.listStory)) {
        throw new Error("Failed to fetch stories");
      }
      return response.listStory;
    } catch (error) {
      return null;
    }
  }
}
