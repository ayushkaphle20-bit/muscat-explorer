"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Compass } from "lucide-react";

const primaryLinks = [
  { href: "/tours", label: "Tours" },
  { href: "/day-trips", label: "Day Trips" },
  { href: "/water-activities", label: "Beaches & Islands" },
  { href: "/desert-tours", label: "Desert" },
  { href: "/blog", label: "Guides" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-sand)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-sand)]/80">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-sea)] text-[var(--color-sand)]">
            <Compass size={18} strokeWidth={2} />
          </span>
          <span className="font-[family-name:var(--font-fraunces)] text-lg font-medium text-[var(--color-ink)]">
            Muscat Explorer
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] text-[var(--color-ink-soft)] hover:text-[var(--color-clay)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-clay)] transition-colors"
          >
            <Search size={15} />
            Search experiences
          </Link>
          <Link
            href="/tours"
            className="rounded-full bg-[var(--color-clay)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--color-clay-dark)] transition-colors"
          >
            Explore Muscat
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-[var(--color-ink)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--color-line)] bg-[var(--color-sand)]">
          <div className="container-page py-4 flex flex-col gap-1">
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-white border border-[var(--color-line)] px-4 py-3 mb-2 text-sm text-[var(--color-ink-soft)]"
            >
              <Search size={16} /> Search experiences
            </Link>
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-[15px] border-b border-[var(--color-line)] last:border-none text-[var(--color-ink)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
