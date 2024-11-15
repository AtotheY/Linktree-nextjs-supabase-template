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
  // Add the new GitHub link
  {
    platform: "GitHub",
    url: "https://github.com/AtotheY/Linktree-nextjs-supabase-template",
  },
];

export const items: LinkItem[] = [
  {
    type: "youtube",
    title: "Latest Youtube Video",
    youtubeId: "ib-Nlg9qWBw",
  },
  { type: "category", title: "Try Rider & WebStorm by JetBrains" },
  {
    type: "link",
    title: "Try WebStorm - Javascript & Typescript IDE",
    url: "https://jb.gg/get_webstorm_now",
  },
  {
    type: "link",
    title: "Try Rider - For game development & more",
    url: "https://jb.gg/get_rider_now",
  },
  {
    type: "category",
    title: "Join Hyrd's beta - Bypass ATS & land coding interviews",
  },
  {
    type: "link",
    title: "Hyrd's beta - Bypass ATS and land a coding interviews",
    url: "https://hyrd.dev ",
  },
  { type: "category", title: "Resources" },
  {
    type: "link",
    title:
      "Try Scrimba - learning to code from the future (an extra 20% off using my link)",
    url: "https://v2.scrimba.com?via=AnthonySistilli",
  },
  { type: "category", title: "My Stuff" },

  {
    type: "link",
    title: "Buy me a coffee :)",
    url: "http://buymeacoffee.com/anthonysistilli",
  },
  {
    type: "link",
    title: "Startup notes & coding resources (mind map)",
    url: "https://map.sistilli.dev/",
  },
  {
    type: "link",
    title: "Linktree clone (NextJS & Supabase)",
    url: "https://github.com/AtotheY/Linktree-nextjs-supabase-template",
  },
  {
    type: "link",
    title: "My saas landing page boilerplate on Github",
    url: "https://github.com/AtotheY/saas-landingpage",
  },
];
