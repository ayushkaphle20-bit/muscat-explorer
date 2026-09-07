import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/data";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)] mb-6">
        Edit blog post
      </h1>
      <BlogPostForm post={post} />
    </div>
  );
}
