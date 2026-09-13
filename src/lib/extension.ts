import { makeFunctionReference } from "convex/server";

/** The browser-extension handshake.
 *
 * The Chrome extension can't sign in the way the phone app does — there's no
 * Clerk session in a service worker, and a Clerk template token lives about a
 * minute. So it opens `/extension/connect` here, the page mints a long-lived
 * opaque token against the signed-in account, and hands it back through the
 * extension's own redirect URL. From then on the extension talks to Convex
 * with that token and never touches Clerk again.
 *
 * See convex/extensionTokens.ts in slowpulse-flutter for the other half. */

/** Referenced by name rather than through the generated `api` object: those
 *  types live in the slowpulse-flutter repo alongside the Convex functions,
 *  and copying them here would be one more thing to keep in step. */
export const mintExtensionToken = makeFunctionReference<
  "action",
  { label: string },
  { token: string }
>("extensionTokens:mint");

/** Origins allowed to receive a token, comma-separated, from
 *  EXTENSION_REDIRECT_ORIGINS.
 *
 *  Chrome hands an extension the redirect origin
 *  `https://<extension-id>.chromiumapp.org`, and the id differs between an
 *  unpacked development install and the published one — so this is normally
 *  two entries, not one. */
function allowedOrigins(): string[] {
  return (process.env.EXTENSION_REDIRECT_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

/** Validates a `redirect_uri` and returns the exact URL a token may be sent
 *  to, or null.
 *
 *  This is the one security-critical function on the web side. The page hands
 *  a credential to whatever comes back from here, so an unchecked
 *  `redirect_uri` would turn the handshake into an open redirect that mails
 *  the user's account token to any site that asked. Hence: https only, origin
 *  must be on the allowlist, and the query and fragment the caller sent are
 *  dropped rather than preserved — the fragment is where the token goes, and
 *  nothing else belongs in it. */
export function safeRedirectTarget(rawRedirectUri: unknown): URL | null {
  if (typeof rawRedirectUri !== "string" || !rawRedirectUri) return null;

  let url: URL;
  try {
    url = new URL(rawRedirectUri);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (!allowedOrigins().includes(url.origin)) return null;

  const target = new URL(url.origin);
  target.pathname = url.pathname;
  return target;
}

/** Where the token actually rides back.
 *
 *  In the fragment, not the query: a fragment is never sent to a server, so it
 *  stays out of access logs and out of any `Referer` header, and Chrome still
 *  hands the extension the whole URL. */
export function withToken(target: URL, token: string): string {
  const url = new URL(target.toString());
  url.hash = `token=${encodeURIComponent(token)}`;
  return url.toString();
}

/** A name for this connection in the account's list of connected browsers.
 *  Derived from the User-Agent, which is the only thing the handshake knows
 *  about the browser on the other side. */
export function browserLabel(userAgent: string | null): string {
  if (!userAgent) return "A browser";
  const browser = /Edg\//.test(userAgent)
    ? "Edge"
    : /OPR\//.test(userAgent)
      ? "Opera"
      : /Firefox\//.test(userAgent)
        ? "Firefox"
        : /Chrome\//.test(userAgent)
          ? "Chrome"
          : "A browser";
  const platform = /Macintosh/.test(userAgent)
    ? "macOS"
    : /Windows/.test(userAgent)
      ? "Windows"
      : /Linux/.test(userAgent)
        ? "Linux"
        : null;
  return platform ? `${browser} on ${platform}` : browser;
}
