"use client";

import { Fragment, useMemo, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import type { Experience } from "@/lib/types";

type SortKey = "rating" | "price-low" | "price-high" | "popularity";

const durationBuckets = [
  { id: "any", label: "Any duration" },
  { id: "short", label: "Up to 4 hours" },
  { id: "half", label: "4–8 hours" },
  { id: "full", label: "8+ hours / overnight" },
];

function durationHours(duration: string): number {
  const overnight = /overnight/i.test(duration);
  const match = duration.match(/(\d+(\.\d+)?)/);
  const num = match ? parseFloat(match[1]) : 0;
  if (overnight) return 24;
  return num;
}

function bucketOf(duration: string): string {
  const h = durationHours(duration);
  if (h <= 4) return "short";
  if (h <= 8) return "half";
  return "full";
}

export default function ExperienceFilterGrid({
  experiences,
  adSlot,
}: {
  experiences: Experience[];
  /** Server-rendered ad slot node (e.g. <AdSlot id="experience-grid-inline" />),
   * passed down from a Server Component parent so this Client Component
   * doesn't need to import server-only data access itself. */
  adSlot?: React.ReactNode;
}) {
  const [sort, setSort] = useState<SortKey>("popularity");
  const [duration, setDuration] = useState("any");

  const filtered = useMemo(() => {
    let list = [...experiences];
    if (duration !== "any") {
      list = list.filter((e) => bucketOf(e.duration) === duration);
    }
    switch (sort) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    return list;
  }, [experiences, sort, duration]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-[var(--color-ink-soft)]">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)]"
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-[var(--color-ink-soft)]">Duration</span>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="rounded-full border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)]"
          >
            {durationBuckets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-[var(--color-ink-soft)] ml-auto">
          {filtered.length} experience{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-line)] p-10 text-center text-sm text-[var(--color-ink-soft)]">
          No experiences match these filters yet. Try a different duration, or
          check back soon as we add more.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((exp, i) => (
            <Fragment key={exp.id}>
              <ExperienceCard experience={exp} />
              {adSlot && (i + 1) % 6 === 0 && (
                <div className="sm:col-span-2 lg:col-span-3">{adSlot}</div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
