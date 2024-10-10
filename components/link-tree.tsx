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
  const [visitTracked, setVisitTracked] = useState(false);

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
  }, []);

  useEffect(() => {
    const trackVisit = async () => {
      if (!geoInfo || visitTracked) return;

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
        setVisitId(data.id);
        setVisitTracked(true);
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    trackVisit();
  }, [geoInfo, visitTracked]);

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
