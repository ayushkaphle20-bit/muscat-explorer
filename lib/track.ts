"use client";

/**
 * Pushes an event to the dataLayer (GA4/GTM) if analytics is configured.
 * Safe to call even when no analytics script is loaded — it just no-ops.
 *
 * Tracked event names used across the site:
 *  - affiliate_click        (outbound booking link clicked)
 *  - experience_click       (experience card clicked)
 *  - search_query           (site search submitted)
 *  - cta_click               (generic call-to-action clicked)
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

export function trackAffiliateClick(params: {
  experienceSlug: string;
  provider: string;
  destination?: string;
  location: string; // where on the site the click happened, e.g. "experience_detail", "comparison_table"
}) {
  trackEvent("affiliate_click", params);
}
