import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Muscat Explorer uses cookies and similar technologies.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  const site = getSiteConfig();
  return (
    <LegalPageLayout title="Cookie Policy" updated="January 2026">
      <p>
        Cookies are small text files stored on your device that help
        websites function and understand how they're used. This page
        explains the categories of cookies {site.brandName} uses.
      </p>
      <h2>Essential cookies</h2>
      <p>
        Used for core site functionality, such as remembering your session
        while browsing. The site cannot function properly without these.
      </p>
      <h2>Analytics cookies</h2>
      <p>
        Once Google Analytics is connected, we use analytics cookies to
        understand which pages are visited, how people navigate the site,
        and which content and affiliate links perform best. This helps us
        improve the site over time.
      </p>
      <h2>Advertising cookies</h2>
      <p>
        Once Google AdSense is enabled, advertising cookies may be used by
        Google and its partners to serve and measure ads. You can learn more
        and manage ad personalization through Google's Ad Settings.
      </p>
      <h2>Managing cookies</h2>
      <p>
        Most browsers let you block or delete cookies through their settings.
        Blocking essential cookies may affect how the site functions.
      </p>
      <p>
        Questions? Contact us at{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>
    </LegalPageLayout>
  );
}
