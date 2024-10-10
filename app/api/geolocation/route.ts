import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();

  const geoInfo = {
    country: headersList.get("x-vercel-ip-country") || null,
    city: headersList.get("x-vercel-ip-city") || null,
    region: headersList.get("x-vercel-ip-country-region") || null,
  };

  return NextResponse.json(geoInfo);
}
