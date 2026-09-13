import { clerkMiddleware } from "@clerk/nextjs/server";

/** Clerk's request handler, scoped to `/extension` and nothing else.
 *
 * The marketing pages have no accounts, no session and no reason to pay for
 * an auth round trip, so the matcher below keeps Clerk off them entirely.
 * Only the browser-extension handshake needs to know who you are.
 *
 * Named `proxy.ts` rather than `middleware.ts`: Next 16 deprecated the
 * middleware file convention and renamed it. Same function, same config. */
export default clerkMiddleware();

export const config = {
  matcher: ["/extension/:path*"],
};
