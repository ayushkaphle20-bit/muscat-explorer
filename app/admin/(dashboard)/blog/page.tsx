import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { getBlogPosts } from "@/lib/data";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBlogPostAction } from "@/lib/actions";

export default function AdminBlogPage() {
  const posts = getBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)]">
            Blog posts
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{posts.length} articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-full bg-[var(--color-clay)] px-4 py-2.5 text-sm font-medium text-white"
        >
          <Plus size={16} /> New post
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((p) => (
          <div
            key={p.slug}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-5"
          >
            <div>
              <p className="font-medium text-[var(--color-ink)]">{p.title}</p>
              <p className="text-xs text-[var(--color-ink-soft)]">
                /blog/{p.slug} · {new Date(p.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/blog/${p.slug}`}
                target="_blank"
                className="text-[var(--color-ink-soft)] hover:text-[var(--color-clay)]"
                title="View live page"
              >
                <ExternalLink size={15} />
              </Link>
              <Link href={`/admin/blog/${p.slug}`} className="text-sm font-medium text-[var(--color-clay)]">
                Edit
              </Link>
              <DeleteButton
                action={deleteBlogPostAction}
                fieldName="slug"
                fieldValue={p.slug}
                confirmMessage={`Delete "${p.title}"? This can't be undone.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
