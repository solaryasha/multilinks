export interface Story {
  id: number;
  url: string;
  title: string;
  score: number;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
}
