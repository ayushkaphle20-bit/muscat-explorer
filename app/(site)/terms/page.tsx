import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Muscat Explorer website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const site = getSiteConfig();
  return (
    <LegalPageLayout title="Terms & Conditions" updated="January 2026">
      <p>
        By using {site.domain} (the "Site"), you agree to the following
        terms. If you do not agree, please do not use the Site.
      </p>
      <h2>About this site</h2>
      <p>
        {site.brandName} is an independent comparison website. We are not
        GetYourGuide, Viator, the Oman Ministry of Heritage and Tourism, or
        any tour operator, and we do not claim to be. Any brand names
        referenced belong to their respective owners.
      </p>
      <h2>No bookings on this site</h2>
      <p>
        We do not sell tours, process payments or manage bookings directly.
        All bookings are completed on a third-party provider's website, and
        their terms and conditions apply to that booking, not ours.
      </p>
      <h2>Accuracy of information</h2>
      <p>
        We aim to keep information accurate and up to date, but tour
        availability, pricing, ratings and reviews can change on the
        provider's side. Always confirm current details on the booking
        provider's site before completing a purchase.
      </p>
      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse the Site, including attempting to scrape
        content at scale, interfere with its operation, or use it for any
        unlawful purpose.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.brandName} is not
        liable for any loss or damage arising from your use of the Site or
        reliance on information found on it, including issues with a booking
        made through a third-party provider.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the
        Site after changes are posted constitutes acceptance of the revised
        terms.
      </p>
      <p>
        Contact us at{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> with
        any questions.
      </p>
    </LegalPageLayout>
  );
}
