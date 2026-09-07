import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { getSiteConfig } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Muscat Explorer team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const site = getSiteConfig();
  return (
    <LegalPageLayout title="Contact">
      <p>
        We'd love to hear from you — whether it's a question about a tour, a
        correction to something on the site, or a partnership enquiry.
      </p>
      <p>
        Email us directly at{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>, or
        use the form below.
      </p>
      <div className="not-prose mt-6">
        <ContactForm />
      </div>
    </LegalPageLayout>
  );
}
