export interface LinkItem {
  type: "category" | "link" | "youtube";
  title: string;
  url?: string;
  youtubeId?: string;
}
