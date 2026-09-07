import Breadcrumbs from "./Breadcrumbs";

export default function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title, href: "#" }]} />
      <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl text-[var(--color-ink)]">
        {title}
      </h1>
      {updated && (
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">Last updated: {updated}</p>
      )}
      <div className="mt-6 max-w-2xl prose-article text-[var(--color-ink-soft)]">
        {children}
      </div>
    </div>
  );
}
