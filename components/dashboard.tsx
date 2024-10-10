'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, MousePointerClick, Users } from "lucide-react"

// Dummy data based on the provided structure
const analyticsData = {
  date_range: { start_date: "2024-09-13", end_date: "2024-10-10" },
  total_visits: 6,
  total_clicks: 1,
  clicks_by_link: [
    { link_id: "http://buymeacoffee.com/anthonysistilli", total_clicks: 1 },
    { link_id: "https://twitter.com/anthonysistilli", total_clicks: 3 },
    { link_id: "https://github.com/anthonysistilli", total_clicks: 2 },
  ],
  views_by_country: [
    { country: "Canada", total_views: 5 },
    { country: "Romania", total_views: 1 },
    { country: "United States", total_views: 3 },
  ],
  views_by_referrer: [
    { source: "direct", total_views: 4 },
    { source: "l.instagram.com", total_views: 2 },
    { source: "t.co", total_views: 1 },
  ],
  views_over_time: [
    { date: "2024-10-06", total_visits: 1, total_clicks: 0 },
    { date: "2024-10-07", total_visits: 2, total_clicks: 1 },
    { date: "2024-10-08", total_visits: 3, total_clicks: 2 },
    { date: "2024-10-09", total_visits: 1, total_clicks: 0 },
    { date: "2024-10-10", total_visits: 5, total_clicks: 1 },
  ]
}

// Dummy live feed data generator
const generateLiveFeedItem = (): Action => {
  const eventTypes = ["visit", "click"];
  const countries = ["US", "CA", "RO", "GB", "DE"];
  const links = ["http://buymeacoffee.com/anthonysistilli", "https://twitter.com/anthonysistilli", "https://github.com/anthonysistilli"];
  
  return {
    event_type: eventTypes[Math.floor(Math.random() * eventTypes.length)] as "visit" | "click",
    link_id: eventTypes[Math.floor(Math.random() * eventTypes.length)] === "click" ? links[Math.floor(Math.random() * links.length)] : null,
    country: countries[Math.floor(Math.random() * countries.length)],
    created_at: new Date().toISOString(),
  };
};

export function DashboardComponent() {
  const [liveFeed, setLiveFeed] = useState<Action[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFeed(prev => [generateLiveFeedItem(), ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Linktree Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Live Feed */}
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center">
              <CardTitle className="text-sm font-medium mr-2">Live Feed</CardTitle>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[120px]">
              <ul className="space-y-2">
                {liveFeed.map((action, index) => (
                  <li key={index} className="text-sm flex items-center animate-fade-in">
                    {action.event_type === "visit" && action.country && (
                      <img 
                        src={`https://flagcdn.com/w20/${action.country.toLowerCase()}.png`} 
                        width="20" 
                        alt={`${action.country} flag`}
                        className="mr-2"
                      />
                    )}
                    <span className="font-medium">{action.event_type}</span>
                    {action.event_type === "visit" && ` from ${action.country}`}
                    {action.event_type === "click" && action.link_id && (
                      <span className="ml-2">
                        on <a href={action.link_id} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                          {new URL(action.link_id).hostname}
                        </a>
                      </span>
                    )}
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(action.created_at).toLocaleTimeString()}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Total Visits Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.total_visits}</div>
          </CardContent>
        </Card>

        {/* Total Clicks Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.total_clicks}</div>
          </CardContent>
        </Card>

        {/* Views Over Time Chart */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.views_over_time}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total_visits" stroke="#8884d8" />
                  <Line type="monotone" dataKey="total_clicks" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Clicks by Link */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Clicks by Link</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[100px]">
              <ul className="space-y-1">
                {analyticsData.clicks_by_link.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.link_id.split('/').pop()}: {item.total_clicks}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Views by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Views by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[100px]">
              <ul className="space-y-1">
                {analyticsData.views_by_country.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.country}: {item.total_views}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Views by Referrer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Views by Referrer</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[100px]">
              <ul className="space-y-1">
                {analyticsData.views_by_referrer.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.source}: {item.total_views}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}