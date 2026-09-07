import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Muscat Explorer, an independent guide to comparing tours and experiences in Muscat, Oman.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const site = getSiteConfig();
  return (
    <LegalPageLayout title="About Us">
      <p>
        {site.brandName} is an independent travel comparison website focused
        on Muscat, Oman. Our goal is simple: help travelers understand what's
        actually available in Muscat, compare it clearly, and book with a
        provider they trust.
      </p>
      <p>
        We are not a tour operator, and we don't take bookings directly.
        Instead, we research and organize tours and experiences from
        established booking platforms — like GetYourGuide and Viator — so you
        can compare rating, price and duration in one place before you
        continue to book on their site.
      </p>
      <h2>What we do</h2>
      <p>
        Our editorial team writes original guides and comparison pages
        covering Muscat's most popular tours, day trips and attractions,
        along with practical, first-hand-style advice on what to expect. We
        never fabricate prices, availability or reviews — all live pricing
        and availability information comes directly from our booking
        partners.
      </p>
      <h2>How we make money</h2>
      <p>
        We earn a commission when you book a tour through a link on our site,
        at no extra cost to you. This is explained in full in our{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>. We also plan
        to display Google-served advertising once the site meets Google's
        eligibility requirements.
      </p>
      <h2>Where we're headed</h2>
      <p>
        We're starting with Muscat because it's an incredible, still
        under-covered destination — but the same comparison approach is
        designed to expand to other cities over time.
      </p>
      <p>
        Questions or feedback? Reach us at{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> or via
        our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPageLayout>
  );
}
