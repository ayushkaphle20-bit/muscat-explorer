import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PlaceholderImage from "@/components/PlaceholderImage";
import FaqAccordion from "@/components/FaqAccordion";
import AdSlot from "@/components/AdSlot";
import { getBlogPost, getBlogPosts, getCategory, getComparison, getSiteConfig } from "@/lib/data";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: post.metaTitle, description: post.metaDescription, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const site = getSiteConfig();
  const related = post.relatedSlugs
    .map((s) => getBlogPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const comparison = post.comparisonSlug ? getComparison(post.comparisonSlug) : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.date,
    publisher: { "@type": "Organization", name: site.brandName },
  };

  return (
    <article className="container-page py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <div className="mt-6 max-w-3xl">
        <h1 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl text-[var(--color-ink)]">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-[var(--color-ink-soft)]">
          <span>{post.author}</span>
          <span aria-hidden>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </div>

      <div className="mt-6 max-w-3xl">
        <PlaceholderImage seed={post.slug} label={post.title} src={post.image} aspect="aspect-[16/9]" className="rounded-2xl" />
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
        <div className="max-w-3xl prose-article">
          {post.sections.map((section, i) => (
            <Fragment key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.content}</p>
              {i === 1 && (
                <div className="not-prose my-6">
                  <AdSlot id="article-mid" />
                </div>
              )}
            </Fragment>
          ))}

          {comparison && (
            <div className="not-prose my-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-sea-pale)]/40 p-6">
              <h2 className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-ink)] mb-2">
                Compare tours for this guide
              </h2>
              <p className="text-sm text-[var(--color-ink-soft)] mb-4">
                See our side-by-side comparison of the top-rated options.
              </p>
              <Link
                href={`/${comparison.slug}`}
                className="inline-flex items-center rounded-full bg-[var(--color-sea)] px-5 py-2.5 text-sm font-medium text-white"
              >
                View {comparison.title} →
              </Link>
            </div>
          )}

          {post.internalCategoryLinks?.length > 0 && (
            <div className="not-prose mt-8 flex flex-wrap gap-2">
              {post.internalCategoryLinks.map((catSlug) => {
                const cat = getCategory(catSlug);
                if (!cat) return null;
                return (
                  <Link
                    key={catSlug}
                    href={`/${catSlug}`}
                    className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-xs font-medium text-[var(--color-ink)] hover:border-[var(--color-clay)]"
                  >
                    Browse {cat.name}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="not-prose mt-10">
            <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)] mb-4">
              Frequently asked questions
            </h2>
            <FaqAccordion items={post.faq} />
          </div>

          <div className="not-prose mt-8">
            <AdSlot id="article-bottom" />
          </div>

          {related.length > 0 && (
            <div className="not-prose mt-10">
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)] mb-4">
                Related articles
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="rounded-xl border border-[var(--color-line)] bg-white p-4 hover:border-[var(--color-clay)] transition-colors"
                  >
                    <h3 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)]">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--color-ink-soft)] line-clamp-2">
                      {r.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <AdSlot id="sidebar-desktop" />
          </div>
        </aside>
      </div>
    </article>
  );
}
