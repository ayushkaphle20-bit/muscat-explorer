import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)] mb-6">
        New blog post
      </h1>
      <BlogPostForm />
    </div>
  );
}
