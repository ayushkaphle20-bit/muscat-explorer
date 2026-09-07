import Link from "next/link";
import { Clock } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import RatingStars from "./RatingStars";
import type { Experience } from "@/lib/types";

const badgeLabel: Record<string, string> = {
  bestOverall: "Best Overall",
  bestBudget: "Best Budget",
  bestFamily: "Best for Families",
  bestPrivate: "Best Private Tour",
  bestLuxury: "Best Luxury",
};

export default function ExperienceCard({
  experience,
  badgeKey,
}: {
  experience: Experience;
  badgeKey?: keyof typeof badgeLabel;
}) {
  return (
    <Link
      href={`/experience/${experience.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-shadow hover:shadow-[0_8px_28px_-12px_rgba(23,34,31,0.25)]"
    >
      <div className="relative">
        <PlaceholderImage
          seed={experience.slug}
          label={experience.name}
          className="rounded-t-2xl"
        />
        {badgeKey && (
          <span className="absolute top-3 left-3 rounded-full bg-[var(--color-clay)] px-3 py-1 text-xs font-medium text-white">
            {badgeLabel[badgeKey]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="font-[family-name:var(--font-fraunces)] text-lg leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-clay)] transition-colors">
          {experience.name}
        </h3>
        <p className="text-sm text-[var(--color-ink-soft)] line-clamp-2">
          {experience.shortDescription}
        </p>
        <RatingStars rating={experience.rating} reviewCount={experience.reviewCount} />
        <div className="flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)]">
          <Clock size={14} />
          {experience.duration}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-[var(--color-line)]">
          <div>
            <span className="text-xs text-[var(--color-ink-soft)]">From</span>
            <p className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)]">
              {experience.currency} {experience.price}
            </p>
          </div>
          <span className="rounded-full border border-[var(--color-sea)] px-4 py-2 text-sm font-medium text-[var(--color-sea)] group-hover:bg-[var(--color-sea)] group-hover:text-white transition-colors">
            View Experience
          </span>
        </div>
      </div>
    </Link>
  );
}
