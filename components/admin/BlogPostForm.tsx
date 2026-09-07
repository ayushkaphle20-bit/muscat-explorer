"use client";

import { useRouter } from "next/navigation";
import { saveBlogPostAction } from "@/lib/actions";
import type { BlogPost } from "@/lib/types";

function sectionsToBody(post?: BlogPost): string {
  if (!post?.sections?.length) return "";
  return post.sections.map((s) => `## ${s.heading}\n${s.content}`).join("\n\n");
}

export default function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    await saveBlogPostAction(formData);
    router.push("/admin/blog");
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {post && <input type="hidden" name="originalSlug" value={post.slug} />}

      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 space-y-4">
        <Field label="Title">
          <input name="title" defaultValue={post?.title} required className={inputClass} />
        </Field>
        <Field label="URL slug (leave blank to auto-generate)">
          <input name="slug" defaultValue={post?.slug} className={inputClass} />
        </Field>
        <Field label="Excerpt (shown on blog index card)">
          <textarea name="excerpt" defaultValue={post?.excerpt} rows={2} className={inputClass} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Author">
            <input name="author" defaultValue={post?.author || "Muscat Explorer Editorial Team"} className={inputClass} />
          </Field>
          <Field label="Publish date">
            <input type="date" name="date" defaultValue={post?.date || new Date().toISOString().slice(0, 10)} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 space-y-4">
        <h2 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)]">SEO</h2>
        <Field label="Meta title">
          <input name="metaTitle" defaultValue={post?.metaTitle} className={inputClass} />
        </Field>
        <Field label="Meta description">
          <textarea name="metaDescription" defaultValue={post?.metaDescription} rows={2} className={inputClass} />
        </Field>
      </div>

      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 space-y-2">
        <h2 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)]">Body</h2>
        <p className="text-xs text-[var(--color-ink-soft)]">
          Write each section as <code>## Heading</code> on its own line,
          followed by the paragraph text, with a blank line between sections.
        </p>
        <textarea
          name="body"
          defaultValue={sectionsToBody(post)}
          rows={16}
          className={`${inputClass} font-mono text-xs`}
          placeholder={"## Getting oriented in Muscat\nMuscat sprawls along Oman's northern coast..."}
        />
      </div>

      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 space-y-4">
        <h2 className="font-[family-name:var(--font-fraunces)] text-base text-[var(--color-ink)]">Internal linking</h2>
        <Field label="Related article slugs (comma-separated)">
          <input name="relatedSlugs" defaultValue={post?.relatedSlugs?.join(", ")} className={inputClass} />
        </Field>
        <Field label="Linked category slugs (comma-separated)">
          <input name="internalCategoryLinks" defaultValue={post?.internalCategoryLinks?.join(", ")} className={inputClass} />
        </Field>
        <Field label="Linked comparison page slug (optional)">
          <input name="comparisonSlug" defaultValue={post?.comparisonSlug} placeholder="best-wadi-shab-tours" className={inputClass} />
        </Field>
      </div>

      <button
        type="submit"
        className="rounded-full bg-[var(--color-clay)] px-6 py-3 text-sm font-medium text-white"
      >
        Save post
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-clay)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm text-[var(--color-ink)]">
      {label}
      {children}
    </label>
  );
}
