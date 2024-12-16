"use server";
// import ogs from "open-graph-scraper";
import { Story } from "@/types/story";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import OpenAI from "openai";

export interface ScrapeOptions {
  url: string;
  maxContentSize?: number;
}

interface SummarizeArticleOptions {
  text: string;
  link: string;
  keywords: string[];
}

export default async function getStories(keywords: string[] = []) {
  const topStoriesUrl = "http://hn.algolia.com/api/v1/search?tags=story";
  const response = await fetch(topStoriesUrl);
  const stories: { hits: Story[] } = await response.json();

  const articles: Story[] = [];
  for await (const story of stories.hits.slice(0, 5)) {
    const articleText = await scrapeText({ url: story.url });

    if (!articleText) continue;

    // const summary = await summarizeArticle({
    //   text: articleText,
    //   link: story.url,
    //   keywords,
    // });

    // if (summary) articles.push(summary)
  }
  console.log(keywords);

  return articles;
}

export const scrapeText = async ({
  url,
  maxContentSize = 12000,
}: ScrapeOptions) => {
  const response = await fetch(url);

  const $ = cheerio.load(await response.text());
  const dom = new JSDOM($.html());
  const article = new Readability(dom.window.document).parse();

  return article?.textContent.slice(0, maxContentSize);
};

export const summarizeArticle = async ({
  text,
  link,
  keywords = [],
}: SummarizeArticleOptions): Promise<Summary | undefined> => {
  const interestsTip = keywords.length
    ? `The more the article talks about  ${keywords.join(
        " / ",
      )}, the more it is relevant.`
    : "";
  const prompt = `
You will be provided with a technical article, and your task is to summarize the article as follows:

- summarize the main takeaways. The summary should start with the most important information, not with an introduction like "The article discusses...".
- rate it by relevancy from 0 (not relevant) to 100 (very relevant). ${interestsTip}
- Shape your answer in JSON format, not in markdown or HTML. Do not include a JSON header. Include the following fields:
  - title: the article title
  - author: the article's author
  - summary: the summary of the article. The summary should be short: at most 3 sentences and 80 words.
  - relevancy_score: the relevancy score

`;
  const messages: OpenAI.Chat.ChatCompletionCreateParams.ChatCompletionCreateParamsNonStreaming["messages"] =
    [
      { role: "system", content: prompt },
      { role: "user", content: text },
    ];
  const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  // const completion = await getCompletion({
  //   messages: [
  //     { role: 'system', content: prompt },
  //     { role: 'user', content: text },
  //   ],
  // });
  const completion = await openAI.chat.completions.create({
    messages,
    model: "gpt-4",
    temperature: 0.7,
    top_p: 1,
  });

  if (!completion.choices[0].message.content) return;
  try {
    return { ...JSON.parse(completion.choices[0].message.content), link };
  } catch (e) {
    console.error(e);
    return;
  }
};

// async function fetchStoriesWithThumbnails(stories: Story[]): Promise<Story[]> {
//   return await Promise.all(
//     stories.map(async (story) => {
//       try {
//         const { result } = await ogs({ url: story.url });

//         story.thumbnailUrl = result.ogImage?.[0].url || null;
//         return story;
//       } catch {
//         story.thumbnailUrl = null;
//         return story;
//       }
//     }),
//   );
// }
