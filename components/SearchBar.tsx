"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { trackEvent } from "@/lib/track";

export default function SearchBar({
  className = "",
  placeholder = "What are you looking for?",
}: {
  className?: string;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("search_query", { query: q });
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_12px_32px_-14px_rgba(23,34,31,0.35)] ${className}`}
    >
      <Search size={18} className="text-[var(--color-ink-soft)] shrink-0" />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-[var(--color-sea)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-sea-light)] transition-colors"
      >
        Search
      </button>
    </form>
  );
}
