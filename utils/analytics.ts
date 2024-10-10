import { createClient } from "./supabase/client";

interface AnalyticsEvent {
  event_type: "visit" | "click";
  link_id?: string;
}

export async function trackEvent(event: AnalyticsEvent) {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const { ip } = await response.json();

    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();

    const supabase = createClient();
    const { error } = await supabase.from("link_analytics").insert({
      event_type: event.event_type,
      link_id: event.link_id,
      country: geoData.country_name,
      city: geoData.city,
      region: geoData.region,
      ip_address: ip,
      user_agent: navigator.userAgent,
    });

    if (error) {
      console.error("Error tracking event:", error);
    }
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}
