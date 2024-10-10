import { createServersideClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServersideClient();

  const { data, error } = await supabase.rpc("get_recent_actions", {
    limit_count: 10,
  });

  if (error) {
    console.error("Error fetching recent actions:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent actions" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
