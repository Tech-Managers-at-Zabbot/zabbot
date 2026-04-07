import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * ZABBOT PROXY - TEMPORARY BYPASS
 * We have disabled 'auth.protect()' to allow development on the Dashboard
 * without being blocked by Clerk redirects or 404 errors.
 */

export default clerkMiddleware(async (auth, request) => {
  // We are NOT calling auth.protect() here.
  // This allows every request to pass through to the page.
});

export const config = {
  matcher: [
    // Standard Next.js/Clerk Matcher
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};