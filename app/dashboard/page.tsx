/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import LiveFeed from "@/components/live-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  MousePointerClick,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getCountryFlag } from "@/utils/countryUtils";
import { DateRangeSelector } from "@/components/date-range-selector";
import { subDays } from "date-fns";

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
  last_week_stats: {
    last_week_visits: number;
    last_week_clicks: number;
  };
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );

  const [showVisits, setShowVisits] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchAnalyticsData(dateRange.start, dateRange.end);
      } else {
        router.push("/login");
      }
    };
    checkUser();
  }, [router, supabase.auth, dateRange]);

  const fetchAnalyticsData = async (start: Date, end: Date) => {
    try {
      const response = await fetch(
        `/api/analytics?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
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

  const handleDateChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  if (!user || !analyticsData) {
    return <div>Loading...</div>;
  }

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const visitsChange = calculatePercentageChange(
    analyticsData.total_visits,
    analyticsData.last_week_stats.last_week_visits
  );

  const clicksChange = calculatePercentageChange(
    analyticsData.total_clicks,
    analyticsData.last_week_stats.last_week_clicks
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Linktree Analytics</h1>
      <div className="mb-6">
        <DateRangeSelector
          startDate={dateRange.start}
          endDate={dateRange.end}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Visits
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.total_visits}
            </div>
            <p
              className={`text-xs ${
                visitsChange >= 0 ? "text-green-500" : "text-red-500"
              } flex items-center mt-1`}
            >
              {visitsChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {Math.abs(visitsChange).toFixed(2)}% from last week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Clicks
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.total_clicks}
            </div>
            <p
              className={`text-xs ${
                clicksChange >= 0 ? "text-green-500" : "text-red-500"
              } flex items-center mt-1`}
            >
              {clicksChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {Math.abs(clicksChange).toFixed(2)}% from last week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Click-through Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                (analyticsData.total_clicks / analyticsData.total_visits) *
                100
              ).toFixed(2)}
              %
            </div>
            <Progress
              value={
                (analyticsData.total_clicks / analyticsData.total_visits) * 100
              }
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="col-span-full bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Views & Clicks Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.views_over_time}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total_visits"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="total_clicks"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Clicks by Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {analyticsData.clicks_by_link.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm flex justify-between items-center"
                  >
                    <span className="font-medium">{item.link_id}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.total_clicks}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Views by Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {analyticsData.views_by_country.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm flex justify-between items-center"
                  >
                    <span className="font-medium flex items-center">
                      <span className="mr-2">
                        {getCountryFlag(item.country)}
                      </span>
                      {item.country}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {item.total_views}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Views by Referrer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {analyticsData.views_by_referrer.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm flex justify-between items-center"
                  >
                    <span className="font-medium">{item.source}</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {item.total_views}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="mt-6 bg-white shadow-lg col-span-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center">
              <CardTitle className="text-lg font-semibold text-gray-700 mr-2">
                Live Feed
              </CardTitle>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-visits"
                checked={showVisits}
                onCheckedChange={setShowVisits}
              />
              <Label htmlFor="show-visits">Show Visits</Label>
            </div>
          </CardHeader>
          <CardContent>
            <LiveFeed showVisits={showVisits} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
