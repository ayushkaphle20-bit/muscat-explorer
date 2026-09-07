import { notFound } from "next/navigation";
import { getComparisons, getExperiences } from "@/lib/data";
import ComparisonForm from "@/components/admin/ComparisonForm";

export default async function EditComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisons().find((c) => c.slug === slug);
  if (!comparison) notFound();
  const experiences = getExperiences();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)] mb-6">
        Edit comparison page
      </h1>
      <ComparisonForm comparison={comparison} allExperiences={experiences} />
    </div>
  );
}
