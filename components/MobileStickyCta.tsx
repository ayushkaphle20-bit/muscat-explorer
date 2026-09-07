"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileStickyCta() {
  const pathname = usePathname();

  // Hide on admin and on experience detail pages (they have their own sticky CTA)
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/experience/")) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-line)] bg-[var(--color-sand)]/95 backdrop-blur px-4 py-3">
      <Link
        href="/tours"
        className="block w-full text-center rounded-full bg-[var(--color-clay)] text-white py-3 text-sm font-medium"
      >
        Explore Muscat experiences
      </Link>
    </div>
  );
}
