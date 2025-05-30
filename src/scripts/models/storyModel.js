import { createStory } from "../data/api";

export const StoryModel = {
  async create(formData) {
    return await createStory(formData);
  }
};
