import { getAdSlot, getSiteConfig } from "@/lib/data";

/**
 * Renders a configured ad slot. If Google AdSense is connected (siteConfig
 * integrations.adSenseClientId + this slot's adSenseSlotId are set), it
 * renders the real <ins class="adsbygoogle"> unit. Until then it renders a
 * clearly labeled placeholder so the layout can be reviewed and the slot's
 * position is obvious to the admin. Slots can be toggled off entirely from
 * data/adSlots.json (or the admin dashboard) without touching page code.
 */
export default function AdSlot({ id }: { id: string }) {
  const slot = getAdSlot(id);
  const site = getSiteConfig();

  if (!slot || !slot.enabled) return null;

  const isLive = Boolean(site.integrations.adSenseClientId && slot.adSenseSlotId);

  return (
    <div className="w-full my-2" data-ad-slot-id={id}>
      {isLive ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={site.integrations.adSenseClientId}
          data-ad-slot={slot.adSenseSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-[var(--color-line)] bg-[var(--color-sand-deep)]/50 py-8 text-xs text-[var(--color-ink-soft)]">
          Ad space — {slot.location} (connect AdSense in Admin → Advertising)
        </div>
      )}
    </div>
  );
}
