"use client";

import { useRouter } from "next/navigation";
import { saveExperienceAction } from "@/lib/actions";
import type { Experience } from "@/lib/types";

const categoryOptions = [
  "tours", "day-trips", "water-activities", "desert-tours", "adventure",
  "culture", "food", "family", "cruises", "wildlife",
];

export default function ExperienceForm({ experience }: { experience?: Experience }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    await saveExperienceAction(formData);
    router.push("/admin/experiences");
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {experience && <input type="hidden" name="id" value={experience.id} />}

      <Section title="Basics">
        <Field label="Name">
          <input name="name" defaultValue={experience?.name} required className={inputClass} />
        </Field>
        <Field label="URL slug (leave blank to auto-generate)">
          <input name="slug" defaultValue={experience?.slug} className={inputClass} placeholder="wadi-shab-bimmah-sinkhole" />
        </Field>
        <Field label="Short description (shown on cards)">
          <textarea name="shortDescription" defaultValue={experience?.shortDescription} rows={2} className={inputClass} />
        </Field>
        <Field label="Full description">
          <textarea name="fullDescription" defaultValue={experience?.fullDescription} rows={5} className={inputClass} />
        </Field>
      </Section>

      <Section title="Categorization">
        <Field label="Categories (comma-separated)">
          <input
            name="categories"
            defaultValue={experience?.categories?.join(", ")}
            className={inputClass}
            placeholder={categoryOptions.slice(0, 3).join(", ")}
          />
          <p className="text-xs text-[var(--color-ink-soft)] mt-1">
            Valid options: {categoryOptions.join(", ")}
          </p>
        </Field>
        <Field label="Destination">
          <input name="destination" defaultValue={experience?.destination || "muscat"} className={inputClass} />
        </Field>
      </Section>

      <Section title="Pricing & booking">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Price">
            <input type="number" step="0.01" name="price" defaultValue={experience?.price} className={inputClass} />
          </Field>
          <Field label="Currency">
            <input name="currency" defaultValue={experience?.currency || "OMR"} className={inputClass} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Provider">
            <select name="provider" defaultValue={experience?.provider || "GetYourGuide"} className={inputClass}>
              <option value="GetYourGuide">GetYourGuide</option>
              <option value="Viator">Viator</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field label="Duration">
            <input name="duration" defaultValue={experience?.duration} placeholder="9 hours" className={inputClass} />
          </Field>
        </div>
        <Field label="Affiliate URL">
          <input
            name="affiliateUrl"
            defaultValue={experience?.affiliateUrl}
            placeholder="https://www.getyourguide.com/..."
            className={inputClass}
          />
          <p className="text-xs text-[var(--color-ink-soft)] mt-1">
            Paste your real GetYourGuide/Viator affiliate link here. Never
            fabricate availability — this URL is where users check live
            pricing.
          </p>
        </Field>
      </Section>

      <Section title="Ratings (from provider — never fabricate)">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Rating (0-5)">
            <input type="number" step="0.1" min="0" max="5" name="rating" defaultValue={experience?.rating ?? 4.5} className={inputClass} />
          </Field>
          <Field label="Review count">
            <input type="number" name="reviewCount" defaultValue={experience?.reviewCount ?? 0} className={inputClass} />
          </Field>
        </div>
      </Section>

      <Section title="Logistics">
        <Field label="Highlights (one per line)">
          <textarea name="highlights" defaultValue={experience?.highlights?.join("\n")} rows={4} className={inputClass} />
        </Field>
        <Field label="What's included (one per line)">
          <textarea name="included" defaultValue={experience?.included?.join("\n")} rows={3} className={inputClass} />
        </Field>
        <Field label="What's excluded (one per line)">
          <textarea name="excluded" defaultValue={experience?.excluded?.join("\n")} rows={3} className={inputClass} />
        </Field>
        <Field label="Meeting point">
          <input name="meetingPoint" defaultValue={experience?.meetingPoint} className={inputClass} />
        </Field>
        <Field label="Cancellation policy">
          <input name="cancellationPolicy" defaultValue={experience?.cancellationPolicy} className={inputClass} />
        </Field>
      </Section>

      <Section title="Homepage & comparison flags">
        <div className="grid grid-cols-2 gap-3">
          <Checkbox name="featured" label="Featured on homepage" defaultChecked={experience?.featured} />
          <Checkbox name="bestOverall" label="Best Overall" defaultChecked={experience?.bestOverall} />
          <Checkbox name="bestBudget" label="Best Budget" defaultChecked={experience?.bestBudget} />
          <Checkbox name="bestFamily" label="Best for Families" defaultChecked={experience?.bestFamily} />
          <Checkbox name="bestPrivate" label="Best Private Tour" defaultChecked={experience?.bestPrivate} />
          <Checkbox name="bestLuxury" label="Best Luxury" defaultChecked={experience?.bestLuxury} />
        </div>
      </Section>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white"
        >
          Save experience
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-clay)]";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
      <h2 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)] mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm text-[var(--color-ink)]">
      {label}
      {children}
    </label>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4" />
      {label}
    </label>
  );
}
