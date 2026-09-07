"use client";

import { useRouter } from "next/navigation";
import { saveComparisonAction } from "@/lib/actions";
import type { Comparison, Experience } from "@/lib/types";

export default function ComparisonForm({
  comparison,
  allExperiences,
}: {
  comparison?: Comparison;
  allExperiences: Experience[];
}) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    await saveComparisonAction(formData);
    router.push("/admin/comparisons");
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {comparison && <input type="hidden" name="originalSlug" value={comparison.slug} />}

      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 space-y-4">
        <Field label="Title">
          <input name="title" defaultValue={comparison?.title} required className={inputClass} placeholder="Best Wadi Shab Tours From Muscat" />
        </Field>
        <Field label="URL slug (leave blank to auto-generate)">
          <input name="slug" defaultValue={comparison?.slug} className={inputClass} placeholder="best-wadi-shab-tours" />
        </Field>
        <Field label="Meta description">
          <textarea name="metaDescription" defaultValue={comparison?.metaDescription} rows={2} className={inputClass} />
        </Field>
        <Field label="Intro paragraph">
          <textarea name="intro" defaultValue={comparison?.intro} rows={3} className={inputClass} />
        </Field>
      </div>

      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
        <h2 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)] mb-1">
          Experiences included
        </h2>
        <p className="text-xs text-[var(--color-ink-soft)] mb-3">
          Check every experience that should appear in this comparison table.
          "Best For" labels (Best Overall, Best Budget, etc.) are set on the
          experience itself under Experiences.
        </p>
        <ExperienceChecklist
          allExperiences={allExperiences}
          selected={comparison?.experienceSlugs || []}
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white"
      >
        Save comparison page
      </button>
    </form>
  );
}

function ExperienceChecklist({
  allExperiences,
  selected,
}: {
  allExperiences: Experience[];
  selected: string[];
}) {
  // Rendered as a hidden text input, kept in sync client-side is overkill for
  // a demo admin — instead we submit a comma-joined string built from the
  // checked boxes via a native form trick: each checkbox shares the name
  // "experienceSlugs[]" isn't natively joined by FormData into one field,
  // so we use a simple controlled hidden field instead.
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-2">
        {allExperiences.map((exp) => (
          <label key={exp.slug} className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
            <input
              type="checkbox"
              name="experienceSlugsCheckbox"
              value={exp.slug}
              defaultChecked={selected.includes(exp.slug)}
              onChange={(e) => {
                const form = e.currentTarget.form;
                if (!form) return;
                const checked = Array.from(
                  form.querySelectorAll<HTMLInputElement>('input[name="experienceSlugsCheckbox"]:checked')
                ).map((el) => el.value);
                const hidden = form.querySelector<HTMLInputElement>('input[name="experienceSlugs"]');
                if (hidden) hidden.value = checked.join(",");
              }}
            />
            {exp.name}
          </label>
        ))}
      </div>
      <input type="hidden" name="experienceSlugs" defaultValue={selected.join(",")} />
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-clay)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm text-[var(--color-ink)]">
      {label}
      {children}
    </label>
  );
}
