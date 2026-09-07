"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";
import type { Experience } from "@/lib/types";

export default function SearchResults({ experiences }: { experiences: Experience[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return experiences;
    return experiences.filter((e) =>
      [e.name, e.shortDescription, ...e.categories].join(" ").toLowerCase().includes(q)
    );
  }, [experiences, query]);

  return (
    <div>
      <div className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2.5 max-w-lg">
        <Search size={16} className="text-[var(--color-ink-soft)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tours, activities, places…"
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
      </div>
      <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
        {results.length} result{results.length !== 1 ? "s" : ""}
        {query ? ` for "${query}"` : ""}
      </p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
