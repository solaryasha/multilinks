"use server";
import ogs from "open-graph-scraper";
import { Story } from "@/types/story";

export default async function getStories() {
  const limit = 12;
  const topStories = await fetchTopStories();
  const storiesByKeyword = filterStoriesByScore(topStories, 100);

  const limitedStories = storiesByKeyword.slice(0, limit);

  return await fetchStoriesWithThumbnails(limitedStories);
}

async function fetchTopStories(): Promise<Array<Story | null>> {
  const topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
  const response = await fetch(topStoriesUrl);
  const storyIds: string[] = await response.json();
  return await Promise.all(
    storyIds.map(async (id) => {
      const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
      const response = await fetch(storyUrl);
      const story: Story = await response.json();
      return story && story.type === "story" ? story : null;
    }),
  );
}

function filterStoriesByScore(
  stories: Array<Story | null>,
  minScore: number,
): Story[] {
  return stories.filter((story): story is Story => {
    return !!story && story.score >= minScore;
  });
}

async function fetchStoriesWithThumbnails(stories: Story[]): Promise<Story[]> {
  return await Promise.all(
    stories.map(async (story) => {
      try {
        const { result } = await ogs({ url: story.url });

        story.thumbnailUrl = result.ogImage?.[0].url || null;
        return story;
      } catch {
        story.thumbnailUrl = null;
        return story;
      }
    }),
  );
}
