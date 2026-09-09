import type { Metadata } from "next";
import "./globals.css";
import { getSiteConfig } from "@/lib/data";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import Script from "next/script";

const site = getSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.brandName} — ${site.tagline}`,
    template: `%s | ${site.brandName}`,
  },
  description:
    "Compare tours, day trips and experiences in Muscat, Oman, and book through trusted providers.",
  openGraph: {
    siteName: site.brandName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: site.integrations.googleSearchConsoleVerification
    ? { google: site.integrations.googleSearchConsoleVerification }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    url: site.domain,
    description:
      "Muscat Explorer helps travelers discover, compare and book tours, activities and experiences in Muscat, Oman.",
    sameAs: Object.values(site.socials),
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {site.integrations.adSenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.integrations.adSenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <AnalyticsScripts config={site.integrations} />
        {children}
      </body>
    </html>
  );
}
