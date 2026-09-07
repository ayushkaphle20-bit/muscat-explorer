import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PlaceholderImage from "@/components/PlaceholderImage";
import AdSlot from "@/components/AdSlot";
import { getBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Muscat Travel Guides",
  description:
    "In-depth, original guides to help you plan your trip to Muscat — from tour comparisons to itineraries and free things to do.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/blog" }]} />
      <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl text-[var(--color-ink)]">
        Muscat Travel Guides
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)] leading-relaxed">
        Original, practical guides to help you plan your trip — tour
        comparisons, itineraries and honest advice, written by our editorial
        team.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white hover:shadow-[0_8px_28px_-12px_rgba(23,34,31,0.25)] transition-shadow"
          >
            <PlaceholderImage seed={post.slug} label={post.title} aspect="aspect-[16/9]" />
            <div className="p-5">
              <p className="text-xs text-[var(--color-ink-soft)] mb-2">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)] group-hover:text-[var(--color-clay)] transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)] line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <AdSlot id="sidebar-desktop" />
      </div>
    </div>
  );
}
