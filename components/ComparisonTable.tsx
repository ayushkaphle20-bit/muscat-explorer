import Link from "next/link";
import RatingStars from "./RatingStars";
import CheckPriceButton from "./CheckPriceButton";
import type { Experience } from "@/lib/types";

const bestLabels: { key: keyof Experience; label: string }[] = [
  { key: "bestOverall", label: "Best Overall" },
  { key: "bestBudget", label: "Best Budget" },
  { key: "bestFamily", label: "Best for Families" },
  { key: "bestPrivate", label: "Best Private Tour" },
  { key: "bestLuxury", label: "Best Luxury" },
];

function bestForLabel(exp: Experience): string | null {
  const match = bestLabels.find((b) => exp[b.key] === true);
  return match ? match.label : null;
}

export default function ComparisonTable({
  experiences,
  comparisonSlug,
}: {
  experiences: Experience[];
  comparisonSlug: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-[var(--color-line)] text-left text-[var(--color-ink-soft)]">
            <th className="p-4 font-medium">Experience</th>
            <th className="p-4 font-medium">Rating</th>
            <th className="p-4 font-medium">Duration</th>
            <th className="p-4 font-medium">Price</th>
            <th className="p-4 font-medium">Best For</th>
            <th className="p-4 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id} className="border-b border-[var(--color-line)] last:border-none align-top">
              <td className="p-4 max-w-[220px]">
                <Link
                  href={`/experience/${exp.slug}`}
                  className="font-medium text-[var(--color-ink)] hover:text-[var(--color-clay)]"
                >
                  {exp.name}
                </Link>
                <p className="text-xs text-[var(--color-ink-soft)] mt-1 line-clamp-2">
                  {exp.shortDescription}
                </p>
              </td>
              <td className="p-4 whitespace-nowrap">
                <RatingStars rating={exp.rating} reviewCount={exp.reviewCount} />
              </td>
              <td className="p-4 whitespace-nowrap text-[var(--color-ink-soft)]">
                {exp.duration}
              </td>
              <td className="p-4 whitespace-nowrap font-medium text-[var(--color-ink)]">
                {exp.currency} {exp.price}
              </td>
              <td className="p-4 whitespace-nowrap">
                {bestForLabel(exp) ? (
                  <span className="rounded-full bg-[var(--color-sea-pale)] px-3 py-1 text-xs font-medium text-[var(--color-sea)]">
                    {bestForLabel(exp)}
                  </span>
                ) : (
                  <span className="text-[var(--color-ink-soft)] text-xs">—</span>
                )}
              </td>
              <td className="p-4 whitespace-nowrap">
                <CheckPriceButton
                  experienceSlug={exp.slug}
                  provider={exp.provider}
                  affiliateUrl={exp.affiliateUrl}
                  location={`comparison_table:${comparisonSlug}`}
                  className="px-4 py-2 text-xs"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
