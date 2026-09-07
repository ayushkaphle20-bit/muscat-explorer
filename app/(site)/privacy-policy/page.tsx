import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Muscat Explorer collects, uses and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const site = getSiteConfig();
  return (
    <LegalPageLayout title="Privacy Policy" updated="January 2026">
      <p>
        This Privacy Policy explains how {site.brandName} ("we", "us")
        collects, uses and protects information when you visit{" "}
        {site.domain}.
      </p>
      <h2>Information we collect</h2>
      <p>
        We collect information you provide directly, such as your name and
        email address when you use our contact form. We also collect
        standard analytics data automatically — pages visited, approximate
        location, device and browser type, and referring site — through
        Google Analytics and similar tools once connected.
      </p>
      <h2>How we use information</h2>
      <p>
        We use this information to respond to enquiries, understand how the
        site is used so we can improve it, and measure which content and
        affiliate links perform well. We do not sell personal information.
      </p>
      <h2>Cookies</h2>
      <p>
        We use cookies for analytics and, where enabled, advertising. See our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> for details on the
        categories of cookies we use and how to control them.
      </p>
      <h2>Third parties</h2>
      <p>
        When you click a booking link, you leave our site and become subject
        to the privacy policy of that provider (for example GetYourGuide or
        Viator). We are not responsible for their handling of your
        information. We may use Google Analytics, Google Tag Manager and,
        once approved, Google AdSense, each of which has its own data
        practices described in Google's privacy policy.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct
        or delete personal information we hold about you. Contact us at{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> to
        make a request.
      </p>
      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        reflected by an updated "last updated" date at the top of this page.
      </p>
    </LegalPageLayout>
  );
}
