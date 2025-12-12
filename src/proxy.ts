import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/api(.*)"]);
const isUnprotectedApi = createRouteMatcher(["/api/catalogue/search"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) && !isUnprotectedApi(req)) {
    // return 404 when api route?
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
