"use client";

import { ExternalLink } from "lucide-react";
import { trackAffiliateClick } from "@/lib/track";

export default function CheckPriceButton({
  experienceSlug,
  provider,
  affiliateUrl,
  location,
  className = "",
  full = false,
}: {
  experienceSlug: string;
  provider: string;
  affiliateUrl: string;
  location: string;
  className?: string;
  full?: boolean;
}) {
  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={() =>
        trackAffiliateClick({ experienceSlug, provider, location })
      }
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-clay-dark)] transition-colors ${
        full ? "w-full" : ""
      } ${className}`}
    >
      Check Price & Availability
      <ExternalLink size={15} />
    </a>
  );
}
