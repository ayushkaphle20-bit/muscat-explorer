import Link from "next/link";
import { MapPinned, Scale, Newspaper, Star } from "lucide-react";
import {
  getExperiences,
  getComparisons,
  getBlogPosts,
} from "@/lib/data";

export default function AdminDashboardPage() {
  const experiences = getExperiences();
  const comparisons = getComparisons();
  const posts = getBlogPosts();
  const featured = experiences.filter((e) => e.featured).length;

  const stats = [
    { label: "Experiences", value: experiences.length, href: "/admin/experiences", icon: MapPinned },
    { label: "Comparison pages", value: comparisons.length, href: "/admin/comparisons", icon: Scale },
    { label: "Blog posts", value: posts.length, href: "/admin/blog", icon: Newspaper },
    { label: "Featured on homepage", value: featured, href: "/admin/experiences", icon: Star },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)]">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        Manage experiences, comparison pages, blog content and site settings.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-5 hover:border-[var(--color-clay)] transition-colors"
          >
            <s.icon size={18} className="text-[var(--color-clay)] mb-3" />
            <p className="text-2xl font-[family-name:var(--font-fraunces)] text-[var(--color-ink)]">
              {s.value}
            </p>
            <p className="text-sm text-[var(--color-ink-soft)]">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)] mb-3">
          Quick start
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--color-ink-soft)]">
          <li>
            Replace placeholder affiliate URLs in{" "}
            <Link href="/admin/experiences" className="text-[var(--color-clay)]">
              Experiences
            </Link>{" "}
            with your real GetYourGuide / Viator affiliate links.
          </li>
          <li>
            Review the "Best For" labels on each{" "}
            <Link href="/admin/comparisons" className="text-[var(--color-clay)]">
              Comparison page
            </Link>
            .
          </li>
          <li>
            Add your Google Analytics, Search Console and AdSense IDs in{" "}
            <Link href="/admin/settings" className="text-[var(--color-clay)]">
              Settings
            </Link>
            .
          </li>
          <li>
            Toggle ad placements on or off in{" "}
            <Link href="/admin/advertising" className="text-[var(--color-clay)]">
              Advertising
            </Link>
            .
          </li>
        </ol>
      </div>
    </div>
  );
}
