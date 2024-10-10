import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Capture Cloudflare headers
  const cfHeaders = {
    country: request.headers.get("CF-IPCountry"),
    city: request.headers.get("CF-IPCity"),
    region: request.headers.get("CF-IPRegion"),
    ip: request.headers.get("CF-Connecting-IP"),
  };

  // Add the headers to the response
  response.headers.set("X-CF-Data", JSON.stringify(cfHeaders));

  return response;
}

export const config = {
  matcher: "/:path*",
};
