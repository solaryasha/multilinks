import { action } from "./_generated/server";
import axios from "axios";

export const getStories = action({
  handler: async () => {
    const limit = 12;
    const topStoriesUrl =
      "https://hacker-news.firebaseio.com/v0/topstories.json";
    const { data: storyIds } = await axios.get<string[]>(topStoriesUrl);
    const stories = await Promise.all(
      storyIds.map(async (id) => {
        const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const { data: story } = await axios.get(storyUrl);
        return story && story.type === "story" ? story : null;
      }),
    );

    return stories.filter(Boolean).slice(0, limit);
  },
});
