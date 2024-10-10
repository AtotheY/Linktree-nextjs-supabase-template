import { createServersideClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// GET request to retrieve analytics data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "Start date and end date are required" },
      { status: 400 }
    );
  }

  const supabase = createServersideClient();

  const { data, error } = await supabase.rpc("get_analytics", {
    start_date: startDate,
    end_date: endDate,
  });

  if (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// POST request to track events
export async function POST(request: Request) {
  const {
    event_type,
    link_id,
    source,
    country,
    city,
    region,
    ip: passedInIP,
  } = await request.json();
  const supabase = createServersideClient();

  // The x-forwarded-for header will contain the user's IP address, not the frontend server's IP
  // It's set by the proxy or load balancer in front of your Next.js app
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    passedInIP ||
    "127.0.0.1";

  console.log({ ip });
  const user_agent = request.headers.get("User-Agent") || null;

  const { error } = await supabase.from("link_analytics").insert({
    event_type,
    link_id,
    source,
    country,
    city,
    region,
    ip_address: ip,
    user_agent,
  });

  if (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
