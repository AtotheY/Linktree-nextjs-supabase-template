import React from "react";
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Music,
  Gamepad,
  Youtube,
} from "lucide-react";
import Image from "next/image";

interface LinkItem {
  type: "category" | "link" | "youtube";
  title: string;
  url?: string;
  youtubeId?: string;
}

const profileImage = "/placeholder.svg?height=200&width=200";
const name = "@anthonysistilli";
const description = "Tech founder & senior software engineer";

const socialLinks = [
  { platform: "LinkedIn", url: "https://linkedin.com/in/example" },
  { platform: "Twitter", url: "https://twitter.com/example" },
  { platform: "Mail", url: "mailto:example@example.com" },
  { platform: "Music", url: "https://music.example.com" },
  { platform: "Youtube", url: "https://youtube.com/@example" },
  { platform: "Gamepad", url: "https://game.example.com" },
  { platform: "Instagram", url: "https://instagram.com/example" },
];

const items: LinkItem[] = [
  { type: "youtube", title: "Latest Youtube Video", youtubeId: "dQw4w9WgXcQ" },
  {
    type: "link",
    title: "Join Hyrd's waitlist - My company",
    url: "https://hyrd.dev",
  },
  {
    type: "link",
    title: "Hyrd.dev - Find a tech job in minutes, not months",
    url: "https://hyrd.dev",
  },
  { type: "category", title: "Resources" },
  {
    type: "link",
    title: "Buy me a coffee :)",
    url: "https://buymeacoffee.com/example",
  },
  {
    type: "link",
    title: "Startup notes & coding resources (mind map)",
    url: "https://example.com/mindmap",
  },
  {
    type: "link",
    title: "My saas landing page boilerplate on Github",
    url: "https://github.com/example/repo",
  },
];

export default function Component() {
  return (
    <div className="min-h-screen bg-red-50 py-8 px-4 relative overflow-hidden">
      {/* Progressive wave background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#DC391B"
            fillOpacity="0.1"
          />
          <path
            d="M0,416L48,432C96,448,192,480,288,506.7C384,533,480,555,576,538.7C672,523,768,469,864,453.3C960,437,1056,459,1152,453.3C1248,448,1344,416,1392,400L1440,384L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#DC391B"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      {/* Cloud background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cloud-pattern"
              x="0"
              y="0"
              width="750"
              height="750"
              patternUnits="userSpaceOnUse"
            >
              <g transform="translate(0,0) scale(0.735)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.7058 199.23C40.9204 209.169 64.1443 204.487 86.6695 189.071C84.5809 216.286 92.1385 238.74 109.353 248.678C126.568 258.617 149.792 253.936 172.317 238.519C170.228 265.735 177.786 288.188 195 298.127C225.766 315.889 275.725 286.955 306.587 233.5C337.449 180.045 337.527 122.313 306.762 104.55C289.547 94.6113 266.323 99.2928 243.798 114.71C245.887 87.4938 238.329 65.0406 221.115 55.1017C203.9 45.1629 180.676 49.8444 158.151 65.2611C160.24 38.0454 152.682 15.5921 135.467 5.65331C104.702 -12.109 54.7432 16.8253 23.8811 70.28C-6.98103 123.735 -7.05949 181.468 23.7058 199.23Z"
                  fill="none"
                  stroke="#DC391B"
                  strokeWidth="3"
                />
              </g>
              <g transform="translate(500,500) scale(0.735) rotate(45)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.7058 199.23C40.9204 209.169 64.1443 204.487 86.6695 189.071C84.5809 216.286 92.1385 238.74 109.353 248.678C126.568 258.617 149.792 253.936 172.317 238.519C170.228 265.735 177.786 288.188 195 298.127C225.766 315.889 275.725 286.955 306.587 233.5C337.449 180.045 337.527 122.313 306.762 104.55C289.547 94.6113 266.323 99.2928 243.798 114.71C245.887 87.4938 238.329 65.0406 221.115 55.1017C203.9 45.1629 180.676 49.8444 158.151 65.2611C160.24 38.0454 152.682 15.5921 135.467 5.65331C104.702 -12.109 54.7432 16.8253 23.8811 70.28C-6.98103 123.735 -7.05949 181.468 23.7058 199.23Z"
                  fill="none"
                  stroke="#DC391B"
                  strokeWidth="3"
                />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cloud-pattern)" />
        </svg>
      </div>

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        <div className="text-center">
          <Image
            src={
              process.env.NODE_ENV === "production"
                ? `/AtotheY.github.io${profileImage}`
                : profileImage
            }
            alt={name}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-red-200 shadow-sm"
          />
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="flex justify-center space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <span className="sr-only">{link.platform}</span>
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              {item.type === "category" && (
                <h2 className="text-lg font-semibold text-red-500 mb-2">
                  {item.title}
                </h2>
              )}
              {item.type === "link" && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-full shadow hover:shadow-md transition-shadow p-4 border border-red-400 hover:border-red-500 text-center"
                  style={{
                    boxShadow: "0 0 5px rgba(255, 0, 0, 0.2)",
                  }}
                >
                  <span className="text-gray-800 font-medium">
                    {item.title}
                  </span>
                </a>
              )}
              {item.type === "youtube" && (
                <div>
                  <h2 className="text-lg font-semibold text-red-500 mb-2">
                    {item.title}
                  </h2>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${item.youtubeId}`}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "twitter":
      return <Twitter className="w-6 h-6" />;
    case "linkedin":
      return <Linkedin className="w-6 h-6" />;
    case "youtube":
      return <Youtube className="w-6 h-6" />;
    case "instagram":
      return <Instagram className="w-6 h-6" />;
    case "mail":
      return <Mail className="w-6 h-6" />;
    case "music":
      return <Music className="w-6 h-6" />;
    case "gamepad":
      return <Gamepad className="w-6 h-6" />;
    default:
      return null;
  }
}
