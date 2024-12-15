import dotenv from 'dotenv'
import axios from 'axios';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fetch top stories from Hacker News
async function fetchTopStories(limit = 500) {
  const topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
  const { data: storyIds } = await axios.get(topStoriesUrl);
  const stories = await Promise.all(
    storyIds.map(async (id) => {
      const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
      const { data: story } = await axios.get(storyUrl);
      return story && story.type === "story" ? story : null;
    })
  );
  return stories.filter(story => story);
}

// Filter stories based on criteria
function filterStories(stories, minScore = 100, keywords = []) {
  return stories.filter(story => {
    const matchesScore = story.score >= minScore;
    const matchesKeyword = keywords.length
      ? keywords.some(keyword => story.title.toLowerCase().includes(keyword.toLowerCase()))
      : true;
    return matchesScore && matchesKeyword;
  });
}

// Summarize stories with ChatGPT
async function summarizeWithChatGPT(stories) {
  const storyList = stories.map(
    (story, index) => `${index + 1}. ${story.title} (Score: ${story.score}, URL: https://news.ycombinator.com/item?id=${story.id})`
  ).join("\n");

  const prompt = `
  Here are some Hacker News stories:
  ${storyList}
  
  Please provide a ranked list of these stories based on their relevance, considering their titles and scores. For each story, include:
  1. The title.
  2. The score.
  3. The URL.
  4. A short summary (based on the title).
  
  Rank them from highest to lowest relevance.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ],
  });

  return response.choices[0].message.content;
}

// Main function
(async () => {
  try {
    const topStories = await fetchTopStories();
    const filteredStories = filterStories(topStories, 100, ["AI"]);
    console.log('filteredStories amount ', filteredStories.length);
    const summary = await summarizeWithChatGPT(filteredStories);
    console.log(summary);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
