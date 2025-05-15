import { type LinkItem } from "@/types/link";

export const githubRepoName = "AtotheY.github.io";

export const imageBaseUrl =
  process.env.NODE_ENV === "production" ? "" : `/${githubRepoName}`;
export const name = "@anthonysistilli";
export const description = "Founder @ Hyrd.dev & Sr SWE";

export const socialLinks = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/asistilli/" },
  { platform: "Twitter", url: "https://x.com/SistilliAnthony" },
  { platform: "Mail", url: "mailto:sistilli.business@gmail.com" },
  { platform: "Tiktok", url: "https://tiktok.com/@anthonysistilli" },
  {
    platform: "Youtube",
    url: "https://www.youtube.com/channel/UCoYzQqZNCRqqAomJwJ6yEdg",
  },
  { platform: "Discord", url: "https://discord.gg/JNc6uPUqUU" },
  { platform: "Instagram", url: "https://instagram.com/asistilli" },
  {
    platform: "GitHub",
    url: "https://github.com/AtotheY",
  },
];

export const items: LinkItem[] = [
  {
    type: "youtube",
    title: "Latest Youtube Video",
    youtubeId: "gOAcuS68HqA",
  },
  { type: "category", title: "My startup" },
  {
    type: "link",
    title: "Fallom - Real world interviews for devs",
    url: "https://fallom.dev/",
  },
  { type: "category", title: "My Stuff" },
  {
    type: "link",
    title: "Essays, startup notes, & coding resources",
    url: "https://map.sistilli.dev/",
  },
  {
    type: "link",
    title: "Buy me a coffee :)",
    url: "http://buymeacoffee.com/anthonysistilli",
  },
  {
    type: "link",
    title: "Linktree clone (NextJS & Supabase)",
    url: "https://github.com/AtotheY/Linktree-nextjs-supabase-template",
  },
  { type: "category", title: "Resources" },
  {
    type: "link",
    title: "Software Engineer's Resume Checklist",
    url: "https://map.sistilli.dev/public/coding/Software+Engineer's+Resume+Checklist",
  },
  {
    type: "link",
    title:
      "Try Scrimba - learning to code from the future (an extra 20% off using my link)",
    url: "https://v2.scrimba.com?via=AnthonySistilli",
  },
];
