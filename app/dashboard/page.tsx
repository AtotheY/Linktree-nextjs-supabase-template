/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import LiveFeed from "@/components/LiveFeed";

interface AnalyticsData {
  date_range: { start_date: string; end_date: string };
  total_visits: number;
  total_clicks: number;
  clicks_by_link: { link_id: string; total_clicks: number }[];
  views_by_country: { country: string; total_views: number }[];
  views_by_referrer: { source: string; total_views: number }[];
  views_over_time: {
    date: string;
    total_visits: number;
    total_clicks: number;
  }[];
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [startDate, setStartDate] = useState<string>(getDefaultStartDate());
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate());
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
        router.push("/login");
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(
        `/api/analytics?startDate=${startDate}&endDate=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleDateChange = () => {
    fetchAnalyticsData();
  };

  if (!user || !analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <button
          onClick={handleDateChange}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Views</h2>
          <p className="text-3xl">{analyticsData.total_visits}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Clicks</h2>
          <p className="text-3xl">{analyticsData.total_clicks}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Top Clicked Links</h2>
          <ul>
            {analyticsData.clicks_by_link.slice(0, 5).map((link, index) => (
              <li key={index} className="mb-2">
                {link.link_id}: {link.total_clicks} clicks
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Top Countries</h2>
          <ul>
            {analyticsData.views_by_country
              .slice(0, 5)
              .map((country, index) => (
                <li key={index} className="mb-2">
                  {country.country}: {country.total_views} views
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="col-span-2">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
}

function getDefaultStartDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 27); // Default to 28 days ago (including today)
  return date.toISOString().split("T")[0];
}

function getDefaultEndDate(): string {
  return new Date().toISOString().split("T")[0];
}
