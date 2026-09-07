import { getSiteConfig } from "@/lib/data";
import { updateSiteConfigAction } from "@/lib/actions";

export default function AdminSettingsPage() {
  const site = getSiteConfig();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)]">
        Settings
      </h1>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)] max-w-xl">
        Brand basics and integration IDs. See the README for step-by-step
        instructions on obtaining each ID.
      </p>

      <form action={updateSiteConfigAction} className="mt-6 space-y-6 max-w-xl">
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 space-y-4">
          <h2 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)]">
            Brand
          </h2>
          <Field label="Brand name">
            <input name="brandName" defaultValue={site.brandName} className={inputClass} />
          </Field>
          <Field label="Tagline">
            <input name="tagline" defaultValue={site.tagline} className={inputClass} />
          </Field>
          <Field label="Live domain (used in sitemap & canonical URLs)">
            <input name="domain" defaultValue={site.domain} className={inputClass} />
          </Field>
          <Field label="Support email">
            <input name="supportEmail" defaultValue={site.supportEmail} className={inputClass} />
          </Field>
        </div>

        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 space-y-4">
          <h2 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)]">
            Analytics & advertising
          </h2>
          <Field label="Google Analytics measurement ID (GA4)">
            <input
              name="googleAnalyticsId"
              defaultValue={site.integrations.googleAnalyticsId}
              placeholder="G-XXXXXXXXXX"
              className={inputClass}
            />
          </Field>
          <Field label="Google Tag Manager container ID (optional)">
            <input
              name="googleTagManagerId"
              defaultValue={site.integrations.googleTagManagerId}
              placeholder="GTM-XXXXXXX"
              className={inputClass}
            />
          </Field>
          <Field label="Google Search Console verification code">
            <input
              name="googleSearchConsoleVerification"
              defaultValue={site.integrations.googleSearchConsoleVerification}
              placeholder="abc123..."
              className={inputClass}
            />
          </Field>
          <Field label="Google AdSense client ID (publisher ID)">
            <input
              name="adSenseClientId"
              defaultValue={site.integrations.adSenseClientId}
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              className={inputClass}
            />
          </Field>
        </div>

        <button
          type="submit"
          className="rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white"
        >
          Save settings
        </button>
      </form>
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
