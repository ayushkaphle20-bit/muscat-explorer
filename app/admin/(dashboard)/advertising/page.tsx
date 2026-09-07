import { getAdSlots, getSiteConfig } from "@/lib/data";
import { updateAdSlotsAction } from "@/lib/actions";

export default function AdminAdvertisingPage() {
  const slots = getAdSlots();
  const site = getSiteConfig();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)]">
        Advertising
      </h1>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)] max-w-xl">
        Toggle ad placements on or off, and set the AdSense ad slot ID for
        each once your account is approved. Your AdSense client ID (the
        "publisher ID," e.g. ca-pub-XXXX) is set once under Settings.
      </p>

      {!site.integrations.adSenseClientId && (
        <div className="mt-4 rounded-xl border border-dashed border-[var(--color-line)] bg-[var(--color-sand-deep)]/40 p-4 text-sm text-[var(--color-ink-soft)]">
          No AdSense client ID set yet — slots will show as labeled
          placeholders on the site until you add one in Settings.
        </div>
      )}

      <form action={updateAdSlotsAction} className="mt-6 space-y-4 max-w-2xl">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-[var(--color-ink)]">{slot.location}</p>
                <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">Slot ID: {slot.id}</p>
              </div>
              <label className="flex items-center gap-2 text-sm shrink-0">
                <input
                  type="checkbox"
                  name={`enabled-${slot.id}`}
                  defaultChecked={slot.enabled}
                  className="h-4 w-4"
                />
                Enabled
              </label>
            </div>
            <label className="mt-3 grid gap-1.5 text-sm text-[var(--color-ink)]">
              AdSense ad slot ID
              <input
                name={`adSenseSlotId-${slot.id}`}
                defaultValue={slot.adSenseSlotId}
                placeholder="1234567890"
                className="rounded-lg border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-clay)]"
              />
            </label>
          </div>
        ))}

        <button
          type="submit"
          className="rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white"
        >
          Save advertising settings
        </button>
      </form>
    </div>
  );
}
