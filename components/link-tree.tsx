"use client";
import React, { useEffect, useState } from "react";
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Youtube,
  Cloud,
} from "lucide-react";
import Image from "next/image";
import {
  description,
  imageBaseUrl,
  items,
  name,
  socialLinks,
} from "@/constants/links";

interface GeoInfo {
  country: string;
  city: string;
  region: string;
  ip: string;
}

export function LinkTree() {
  const [geoInfo, setGeoInfo] = useState<GeoInfo | null>(null);
  const [visitId, setVisitId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeoInfo = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setGeoInfo({
          country: data.country_name,
          city: data.city,
          region: data.region,
          ip: data.ip,
        });
      } catch (error) {
        console.error("Error fetching geo info:", error);
      }
    };

    fetchGeoInfo();
  }, [visitId]);

  useEffect(() => {
    const trackVisit = async () => {
      const referrer = document.referrer;
      let source = "direct";

      if (referrer) {
        try {
          const url = new URL(referrer);
          source = url.hostname;
        } catch (error) {
          console.error("Invalid referrer URL:", error);
          source = referrer;
        }
      }

      if (geoInfo) {
        try {
          const response = await fetch("/api/analytics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event_type: "visit",
              source,
              ...geoInfo,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to track visit");
          }

          const data = await response.json();
          setVisitId(data.id); // Store the visit ID
        } catch (error) {
          console.error("Error tracking visit:", error);
        }
      }
    };

    if (geoInfo) {
      trackVisit();
    }
  }, [geoInfo]);

  const handleLinkClick = async (linkId: string) => {
    try {
      const payload = {
        event_type: "click",
        link_id: linkId,
        ...(geoInfo || {}),
      };

      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to track click");
      }
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

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
              width="100%"
              height="100%"
              patternUnits="userSpaceOnUse"
            />
          </defs>
          <rect width="100%" height="100%" fill="url(#cloud-pattern)" />
        </svg>
        <div className="absolute inset-0 z-0 opacity-20">
          {[
            { top: "10%", left: "20%", rotate: "45deg" },
            { top: "30%", left: "50%", rotate: "90deg" },
            { top: "50%", left: "70%", rotate: "135deg" },
            { top: "70%", left: "30%", rotate: "180deg" },
            { top: "90%", left: "80%", rotate: "225deg" },
            { top: "20%", left: "40%", rotate: "270deg" },
            { top: "40%", left: "60%", rotate: "315deg" },
            { top: "60%", left: "20%", rotate: "360deg" },
            { top: "80%", left: "50%", rotate: "405deg" },
            { top: "10%", left: "70%", rotate: "450deg" },
          ].map((style, index) => (
            <Cloud
              key={index}
              className="absolute"
              style={{
                top: style.top,
                left: style.left,
                transform: `rotate(${style.rotate})`,
              }}
              stroke="#DC391B"
              strokeWidth={0.5}
              size={250}
            />
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        <div className="text-center">
          <Image
            src={imageBaseUrl + "/pfp.png"}
            width={200}
            height={200}
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
                  className="block bg-white rounded-full shadow hover:shadow-md transition-shadow p-4 border border-red-400 hover:border-red-500 text-center hover:bg-red-50"
                  style={{
                    boxShadow: "0 0 5px rgba(255, 0, 0, 0.2)",
                  }}
                  onClick={() => handleLinkClick(item.url ?? "undefined link")}
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
                      src={`https://www.youtube.com/embed/${item.url}`}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onClick={() => handleLinkClick(item.title)}
                    />
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
    case "tiktok":
      return (
        <svg
          fill="#DC391B"
          width="24px"
          height="24px"
          viewBox="0 0 512 512"
          id="tiktok"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
        </svg>
      );
    case "discord":
      return (
        <svg
          fill="#DC391B"
          width="24px"
          height="24px"
          viewBox="0 -28.5 256 256"
          id="discord"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <path
              d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
              fill="#DC391B"
            />
          </g>
        </svg>
      );
    default:
      return null;
  }
}
