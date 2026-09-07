import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getSiteConfig } from "@/lib/data";

export interface Crumb {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const site = getSiteConfig();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${site.domain}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-[var(--color-ink-soft)]">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={13} />}
            {i === items.length - 1 ? (
              <span className="text-[var(--color-ink)]">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-[var(--color-clay)]">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
