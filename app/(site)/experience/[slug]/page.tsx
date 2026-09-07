import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, MapPin, Check, X, Info } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PlaceholderImage from "@/components/PlaceholderImage";
import RatingStars from "@/components/RatingStars";
import FaqAccordion from "@/components/FaqAccordion";
import CheckPriceButton from "@/components/CheckPriceButton";
import ExperienceCard from "@/components/ExperienceCard";
import AdSlot from "@/components/AdSlot";
import {
  getExperience,
  getExperiences,
  getExperiencesByCategory,
  getSiteConfig,
} from "@/lib/data";

export function generateStaticParams() {
  return getExperiences().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return {};
  return {
    title: exp.name,
    description: exp.shortDescription,
    alternates: { canonical: `/experience/${slug}` },
    openGraph: { title: exp.name, description: exp.shortDescription },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();

  const site = getSiteConfig();
  const similar = getExperiencesByCategory(exp.categories[0])
    .filter((e) => e.id !== exp.id)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: exp.name,
    description: exp.fullDescription,
    touristType: "Tourist",
    offers: {
      "@type": "Offer",
      price: exp.price,
      priceCurrency: exp.currency,
      url: exp.affiliateUrl,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: exp.rating,
      reviewCount: exp.reviewCount,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="relative">
        <PlaceholderImage
          seed={exp.slug}
          label={exp.name}
          aspect="aspect-[16/9] md:aspect-[21/9]"
          className="w-full"
        />
      </div>

      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: exp.categories[0], href: `/${exp.categories[0]}` },
            { label: exp.name, href: `/experience/${exp.slug}` },
          ]}
        />

        <div className="mt-4 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10">
          <div>
            <h1 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl text-[var(--color-ink)] max-w-2xl">
              {exp.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <RatingStars rating={exp.rating} reviewCount={exp.reviewCount} size={16} />
              <span className="flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)]">
                <Clock size={15} /> {exp.duration}
              </span>
              <span className="rounded-full bg-[var(--color-sea-pale)] px-3 py-1 text-xs font-medium text-[var(--color-sea)]">
                Via {exp.provider}
              </span>
            </div>

            <p className="mt-6 text-[var(--color-ink-soft)] leading-relaxed">
              {exp.fullDescription}
            </p>

            <section className="mt-8">
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)] mb-3">
                Highlights
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-[var(--color-ink-soft)]">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-clay)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)] mb-3">
                  What's included
                </h2>
                <ul className="space-y-2">
                  {exp.included.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-ink-soft)]">
                      <Check size={16} className="mt-0.5 shrink-0 text-green-700" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)] mb-3">
                  What's excluded
                </h2>
                <ul className="space-y-2">
                  {exp.excluded.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-ink-soft)]">
                      <X size={16} className="mt-0.5 shrink-0 text-[var(--color-ink-soft)]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-8 grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
                <h2 className="flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)] mb-2">
                  <MapPin size={17} /> Meeting point
                </h2>
                <p className="text-sm text-[var(--color-ink-soft)]">{exp.meetingPoint}</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
                <h2 className="flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)] mb-2">
                  <Info size={17} /> Cancellation policy
                </h2>
                <p className="text-sm text-[var(--color-ink-soft)]">{exp.cancellationPolicy}</p>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)] mb-3">
                Frequently asked questions
              </h2>
              <FaqAccordion items={exp.faq} />
            </section>

            {similar.length > 0 && (
              <section className="mt-10">
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)] mb-4">
                  Similar experiences
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {similar.map((s) => (
                    <ExperienceCard key={s.id} experience={s} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-24 rounded-2xl border border-[var(--color-line)] bg-white p-6">
              <span className="text-xs text-[var(--color-ink-soft)]">From</span>
              <p className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--color-ink)]">
                {exp.currency} {exp.price}
                <span className="text-sm font-normal text-[var(--color-ink-soft)]"> / person</span>
              </p>
              <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                Demo price shown — live pricing appears once the {exp.provider}{" "}
                feed is connected.
              </p>
              <CheckPriceButton
                experienceSlug={exp.slug}
                provider={exp.provider}
                affiliateUrl={exp.affiliateUrl}
                location="experience_detail_sidebar"
                full
                className="mt-4"
              />
              <p className="mt-3 text-xs text-[var(--color-ink-soft)] leading-relaxed">
                You'll be redirected to {exp.provider} to check live
                availability and complete your booking. {site.brandName} may
                earn a commission at no extra cost to you.
              </p>
              <div className="mt-5 pt-5 border-t border-[var(--color-line)]">
                <AdSlot id="sidebar-desktop" />
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile sticky CTA specific to this experience */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-line)] bg-white/95 backdrop-blur px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[11px] text-[var(--color-ink-soft)]">From</span>
            <p className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)] leading-none">
              {exp.currency} {exp.price}
            </p>
          </div>
          <CheckPriceButton
            experienceSlug={exp.slug}
            provider={exp.provider}
            affiliateUrl={exp.affiliateUrl}
            location="experience_detail_mobile_sticky"
            className="px-5 py-2.5 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
