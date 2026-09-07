import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How Muscat Explorer earns money through affiliate commissions.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  const site = getSiteConfig();
  return (
    <LegalPageLayout title="Affiliate Disclosure" updated="January 2026">
      <p>
        {site.brandName} participates in affiliate marketing programs,
        including with GetYourGuide and Viator, and may in future add
        programs for hotels, car rental and travel insurance.
      </p>
      <p>
        This means that when you click a "Check Price & Availability" button
        or another outbound link on our site and go on to book a tour or
        experience, we may earn a commission from the booking provider.{" "}
        <strong>This comes at no additional cost to you</strong> — the price
        you pay is the same whether or not you came from our site.
      </p>
      <h2>How this affects what we publish</h2>
      <p>
        Affiliate relationships do not determine which experiences we choose
        to feature or how we describe them. Ratings and review counts shown
        on our site are sourced from our booking partners and are not written
        or altered by us. "Best Overall," "Best Budget," "Best for Families,"
        "Best Private Tour" and "Best Luxury" labels on comparison pages are
        set manually by our editorial team based on publicly available
        information, and are our opinion rather than a guarantee.
      </p>
      <h2>Booking happens off our site</h2>
      <p>
        We do not process bookings, payments or cancellations directly.
        Clicking a booking link takes you to the relevant provider's website,
        where their terms, pricing and cancellation policy apply.
      </p>
      <p>
        Questions about this disclosure? Contact us at{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>
    </LegalPageLayout>
  );
}
