import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchResults from "@/components/SearchResults";
import { getExperiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search Experiences",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const experiences = getExperiences();

  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search", href: "/search" }]} />
      <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl text-[var(--color-ink)]">
        Search experiences
      </h1>
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-[var(--color-ink-soft)]">Loading…</p>}>
          <SearchResults experiences={experiences} />
        </Suspense>
      </div>
    </div>
  );
}
