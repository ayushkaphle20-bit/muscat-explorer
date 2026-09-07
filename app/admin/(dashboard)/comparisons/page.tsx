import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { getComparisons } from "@/lib/data";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteComparisonAction } from "@/lib/actions";

export default function AdminComparisonsPage() {
  const comparisons = getComparisons();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)]">
            Comparison pages
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            These power pages like /best-wadi-shab-tours.
          </p>
        </div>
        <Link
          href="/admin/comparisons/new"
          className="flex items-center gap-2 rounded-full bg-[var(--color-clay)] px-4 py-2.5 text-sm font-medium text-white"
        >
          <Plus size={16} /> Add comparison
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {comparisons.map((c) => (
          <div
            key={c.slug}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-5"
          >
            <div>
              <p className="font-medium text-[var(--color-ink)]">{c.title}</p>
              <p className="text-xs text-[var(--color-ink-soft)]">
                /{c.slug} · {c.experienceSlugs.length} experiences
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/${c.slug}`}
                target="_blank"
                className="text-[var(--color-ink-soft)] hover:text-[var(--color-clay)]"
                title="View live page"
              >
                <ExternalLink size={15} />
              </Link>
              <Link href={`/admin/comparisons/${c.slug}`} className="text-sm font-medium text-[var(--color-clay)]">
                Edit
              </Link>
              <DeleteButton
                action={deleteComparisonAction}
                fieldName="slug"
                fieldValue={c.slug}
                confirmMessage={`Delete "${c.title}"? This can't be undone.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
