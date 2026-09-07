import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExperienceFilterGrid from "@/components/ExperienceFilterGrid";
import ComparisonTable from "@/components/ComparisonTable";
import ExperienceCard from "@/components/ExperienceCard";
import AdSlot from "@/components/AdSlot";
import CategoryIcon from "@/components/CategoryIcon";
import {
  getCategories,
  getCategory,
  getComparison,
  getComparisons,
  getExperience,
  getExperiencesByCategory,
  getSiteConfig,
} from "@/lib/data";

export function generateStaticParams() {
  const categories = getCategories().map((c) => ({ slug: c.slug }));
  const comparisons = getComparisons().map((c) => ({ slug: c.slug }));
  return [...categories, ...comparisons];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  const comparison = getComparison(slug);

  if (category) {
    return {
      title: `${category.name} in Muscat — Compare & Book`,
      description: category.description,
      alternates: { canonical: `/${slug}` },
      openGraph: { title: `${category.name} in Muscat`, description: category.description },
    };
  }
  if (comparison) {
    return {
      title: comparison.title,
      description: comparison.metaDescription,
      alternates: { canonical: `/${slug}` },
      openGraph: { title: comparison.title, description: comparison.metaDescription },
    };
  }
  return {};
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = getSiteConfig();

  const category = getCategory(slug);
  if (category) {
    const experiences = getExperiencesByCategory(slug);
    return (
      <div className="container-page py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name, href: `/${slug}` }]} />
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-sea-pale)] text-[var(--color-sea)]">
            <CategoryIcon icon={category.icon} size={20} />
          </span>
          <h1 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl text-[var(--color-ink)]">
            {category.name} in Muscat
          </h1>
        </div>
        <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)] leading-relaxed">
          {category.description} Compare rating, duration and price below,
          then continue to a trusted booking provider to check live
          availability.
        </p>

        <div className="mt-8 lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div>
            <ExperienceFilterGrid
              experiences={experiences}
              adSlot={<AdSlot id="experience-grid-inline" />}
            />
          </div>
          <aside className="hidden lg:block mt-8 lg:mt-0">
            <div className="sticky top-24">
              <AdSlot id="sidebar-desktop" />
              <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white p-5">
                <h2 className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)] mb-2">
                  Not sure where to start?
                </h2>
                <p className="text-sm text-[var(--color-ink-soft)] mb-4">
                  Read our comparison guides for a curated shortlist of the
                  best-rated options.
                </p>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-[var(--color-clay)]"
                >
                  Browse our guides →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  const comparison = getComparison(slug);
  if (comparison) {
    const experiences = comparison.experienceSlugs
      .map((s) => getExperience(s))
      .filter((e): e is NonNullable<typeof e> => Boolean(e));

    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: comparison.title,
      itemListElement: experiences.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.domain}/experience/${e.slug}`,
        name: e.name,
      })),
    };

    return (
      <div className="container-page py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: comparison.title, href: `/${slug}` }]} />
        <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl text-[var(--color-ink)] max-w-3xl">
          {comparison.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)] leading-relaxed">
          {comparison.intro}
        </p>

        <div className="mt-8">
          <ComparisonTable experiences={experiences} comparisonSlug={slug} />
        </div>

        <div className="mt-10">
          <AdSlot id="sidebar-desktop" />
        </div>

        <div className="mt-10">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)] mb-5">
            Compare in more detail
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                badgeKey={
                  exp.bestOverall
                    ? "bestOverall"
                    : exp.bestBudget
                    ? "bestBudget"
                    : exp.bestFamily
                    ? "bestFamily"
                    : exp.bestPrivate
                    ? "bestPrivate"
                    : exp.bestLuxury
                    ? "bestLuxury"
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-[var(--color-ink-soft)] max-w-2xl">
          "Best For" labels are set manually by our editorial team based on
          publicly available information and are not a guarantee of quality.
          We may earn a commission when you book through a link on this page.
        </p>
      </div>
    );
  }

  notFound();
}
