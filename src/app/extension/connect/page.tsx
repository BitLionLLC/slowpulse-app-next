import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Logo, Wordmark } from "@/components/logo";
import {
  browserLabel,
  mintExtensionToken,
  safeRedirectTarget,
  withToken,
} from "@/lib/extension";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connect your browser",
  robots: { index: false, follow: false },
};

/** The consent screen the Chrome extension opens to learn who you are.
 *
 * Nothing is minted on page load. A token is a credential, so it takes a
 * deliberate press — the same reason the app's own interventions make you
 * answer rather than assume. */
export default async function ConnectPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const target = safeRedirectTarget(params.redirect_uri);

  if (!target) {
    return (
      <Shell title="This link isn't from SlowPulse">
        <p>
          A connection link has to come from the SlowPulse extension itself and
          name a browser we recognise. Open the extension&apos;s Settings and
          press <strong>Connect your account</strong> there instead.
        </p>
      </Shell>
    );
  }

  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    // Back to this same URL once they're signed in, redirect_uri and all.
    const returnBackUrl = new URL(
      `/extension/connect?redirect_uri=${encodeURIComponent(target.toString())}`,
      site.url,
    );
    return redirectToSignIn({ returnBackUrl: returnBackUrl.toString() });
  }

  async function connect() {
    "use server";

    const { userId: signedInUserId, getToken } = await auth();
    if (!signedInUserId) throw new Error("Not signed in");

    // Re-validated on the POST as well as the GET: the hidden field below is
    // as much under the caller's control as the query string was.
    const confirmed = safeRedirectTarget(params.redirect_uri);
    if (!confirmed) throw new Error("Unrecognised redirect target");

    // The "convex" JWT template — the same one the Flutter client uses. See
    // convex/auth.config.ts.
    const token = await getToken({ template: "convex" });
    if (!token) throw new Error("Could not mint a Convex token");

    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");

    const convex = new ConvexHttpClient(convexUrl);
    convex.setAuth(token);
    const label = browserLabel((await headers()).get("user-agent"));
    const { token: extensionToken } = await convex.action(mintExtensionToken, {
      label,
    });

    redirect(withToken(confirmed, extensionToken));
  }

  const label = browserLabel((await headers()).get("user-agent"));

  return (
    <Shell title="Connect this browser">
      <p>
        SlowPulse for Chrome will be able to check whether your{" "}
        {site.proName} subscription is active. That&apos;s all it can do with
        this connection — it can&apos;t read your history, your events, or
        anything else on your account.
      </p>
      <p className="mt-3 text-[13px] text-muted">
        Connecting as <strong className="text-ink">{label}</strong>. You can
        disconnect it from the extension at any time.
      </p>
      <form action={connect} className="mt-7">
        <button
          type="submit"
          className="w-full rounded-full bg-[var(--pulse)] px-5 py-3.5 text-[15px] font-semibold text-[var(--on-pulse)] transition-colors hover:bg-[var(--pulse-bright)]"
        >
          Connect
        </button>
      </form>
    </Shell>
  );
}

function Shell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-outline/70 bg-surface p-8 shadow-xl">
        <div className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <Wordmark />
        </div>
        <h1 className="mt-7 text-2xl font-extrabold tracking-tight text-ink">
          {title}
        </h1>
        <div className="mt-3 text-[14.5px] leading-relaxed text-muted">
          {children}
        </div>
      </div>
    </main>
  );
}
