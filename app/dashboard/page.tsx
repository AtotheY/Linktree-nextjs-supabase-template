/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface AnalyticsData {
  total_visits: number;
  total_clicks: number;
  top_links: { link_id: string; clicks: number }[];
  recent_events: { event_type: string; link_id: string; created_at: string }[];
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchAnalyticsData();
      } else {
        // router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  const fetchAnalyticsData = async () => {
    const { data: totalVisits } = await supabase
      .from("link_analytics")
      .select("id", { count: "exact" })
      .eq("event_type", "visit");

    const { data: totalClicks } = await supabase
      .from("link_analytics")
      .select("id", { count: "exact" })
      .eq("event_type", "click");

    const { data: topLinks } = await supabase
      .from("link_analytics")
      .select("link_id, count(*)")
      .eq("event_type", "click")
      .order("count", { ascending: false })
      .limit(5);

    const { data: recentEvents } = await supabase
      .from("link_analytics")
      .select("event_type, link_id, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    setAnalyticsData({
      total_visits: totalVisits?.length ?? 0,
      total_clicks: totalClicks?.length ?? 0,
      top_links:
        topLinks?.map((link) => ({
          link_id: link.link_id,
          clicks: link.count as unknown as number,
        })) ?? [],
      recent_events: recentEvents ?? [],
    });
  };

  if (!user || !analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Visits</h2>
          <p className="text-3xl">{analyticsData.total_visits}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Clicks</h2>
          <p className="text-3xl">{analyticsData.total_clicks}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Top Links</h2>
          <ul>
            {analyticsData.top_links.map((link, index) => (
              <li key={index} className="mb-2">
                {link.link_id}: {link.clicks} clicks
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Recent Events</h2>
          <ul>
            {analyticsData.recent_events.map((event, index) => (
              <li key={index} className="mb-2">
                {event.event_type} - {event.link_id} (
                {new Date(event.created_at).toLocaleString()})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
