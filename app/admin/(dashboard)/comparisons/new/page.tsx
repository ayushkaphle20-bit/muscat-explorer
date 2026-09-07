import { getExperiences } from "@/lib/data";
import ComparisonForm from "@/components/admin/ComparisonForm";

export default function NewComparisonPage() {
  const experiences = getExperiences();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)] mb-6">
        Add comparison page
      </h1>
      <ComparisonForm allExperiences={experiences} />
    </div>
  );
}
