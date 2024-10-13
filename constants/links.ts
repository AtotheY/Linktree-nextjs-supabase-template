import { type LinkItem } from "@/types/link";

export const githubRepoName = "https://neonardo1702.github.io/Neonardo1702";

export const imageBaseUrl =
  process.env.NODE_ENV === "production" ? "" : `${githubRepoName}`;
export const name = "@realneowm";
export const description = "Space Engineer & Mission Operator";

export const socialLinks = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/watcharawutmas/" },
  { platform: "Twitter", url: "https://x.com/realneowm" },
  { platform: "Mail", url: "mailto:watcharawut.mas@gmail.com" },
  // { platform: "Tiktok", url: "https://tiktok.com/@anthonysistilli" },
  {
    platform: "Youtube",
    url: "https://www.youtube.com/channel/UCjyRnycn1bxWdq-Gu8eJrEA",
  },
  // { platform: "Discord", url: "https://discord.gg/JNc6uPUqUU" },
  { platform: "Instagram", url: "https://www.instagram.com/neo.wm/" },
  {
    platform: "GitHub",
    url: "https://github.com/neonardo1702",
  },
];

export const items: LinkItem[] = [
  {
    type: "youtube",
    title: "Latest Youtube Video",
    youtubeId: "g76tf8VqvQY",
  },
  {
    type: "category",
    title: "Find coffee shops",
  },
  {
    type: "link",
    title: "Coffee shop list in Japan",
    url: "https://maps.app.goo.gl/S6MBuNh9KApeXWUV8",
  },
  {
    type: "link",
    title: "Coffee shop list in Thailand",
    url: "https://maps.app.goo.gl/geu3Qj3GU2fvkeBv8",
  },
  { type: "category", title: "Resources" },
  {
    type: "link",
    title: "Buy me a coffee :)",
    url: "http://buymeacoffee.com/neonardo",
  },
  // {
  //   type: "link",
  //   title: "Startup notes & coding resources (mind map)",
  //   url: "https://map.sistilli.dev/",
  // },
  // {
  //   type: "link",
  //   title: "Linktree clone (NextJS & Supabase)",
  //   url: "https://github.com/AtotheY/Linktree-nextjs-supabase-template",
  // },
  // {
  //   type: "link",
  //   title: "My saas landing page boilerplate on Github",
  //   url: "https://github.com/AtotheY/saas-landingpage",
  // },
];
