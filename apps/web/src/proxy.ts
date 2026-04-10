// src/proxy.ts
// ❌ Change this: import { NextResponse } from "next/navigation";
// ✅ To this:
import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server";

/**
 * ZABBOT PROXY - CLEAN AUTH BYPASS
 * Using next/server ensures the 'next()' method is available 
 * to the edge runtime.
 */
export function proxy(request: NextRequest) {
  // Simply continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};