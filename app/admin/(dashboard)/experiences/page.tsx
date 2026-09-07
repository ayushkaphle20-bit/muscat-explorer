import Link from "next/link";
import { Plus, Star, ExternalLink } from "lucide-react";
import { getExperiences } from "@/lib/data";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteExperienceAction } from "@/lib/actions";

export default function AdminExperiencesPage() {
  const experiences = getExperiences();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)]">
            Experiences
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            {experiences.length} experiences. Demo data is clearly labeled until affiliate feeds are connected.
          </p>
        </div>
        <Link
          href="/admin/experiences/new"
          className="flex items-center gap-2 rounded-full bg-[var(--color-clay)] px-4 py-2.5 text-sm font-medium text-white"
        >
          <Plus size={16} /> Add experience
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-left text-[var(--color-ink-soft)]">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Categories</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Rating</th>
              <th className="p-4 font-medium">Flags</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} className="border-b border-[var(--color-line)] last:border-none">
                <td className="p-4">
                  <p className="font-medium text-[var(--color-ink)]">{exp.name}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">/{exp.slug}</p>
                </td>
                <td className="p-4 text-[var(--color-ink-soft)]">{exp.categories.join(", ")}</td>
                <td className="p-4 whitespace-nowrap">{exp.currency} {exp.price}</td>
                <td className="p-4 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <Star size={13} className="text-[var(--color-brass)]" fill="currentColor" />
                    {exp.rating}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {exp.featured && <Badge>Featured</Badge>}
                    {exp.bestOverall && <Badge>Best Overall</Badge>}
                    {exp.bestBudget && <Badge>Budget</Badge>}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <Link
                      href={`/experience/${exp.slug}`}
                      target="_blank"
                      className="text-[var(--color-ink-soft)] hover:text-[var(--color-clay)]"
                      title="View live page"
                    >
                      <ExternalLink size={15} />
                    </Link>
                    <Link
                      href={`/admin/experiences/${exp.id}`}
                      className="text-[var(--color-clay)] font-medium"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteExperienceAction}
                      fieldName="id"
                      fieldValue={exp.id}
                      confirmMessage={`Delete "${exp.name}"? This can't be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--color-sea-pale)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-sea)]">
      {children}
    </span>
  );
}
