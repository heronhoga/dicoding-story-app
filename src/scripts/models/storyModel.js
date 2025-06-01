import { createStory } from "../data/api";
import { getToken } from "../utils";

export default class StoryModel {
  async createStory(formData) {
    const token = getToken();
    return await createStory(formData, token);
  }
}
