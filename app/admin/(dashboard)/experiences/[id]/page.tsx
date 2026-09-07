import { notFound } from "next/navigation";
import { getExperiences } from "@/lib/data";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = getExperiences().find((e) => e.id === id);
  if (!experience) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-ink)] mb-6">
        Edit experience
      </h1>
      <ExperienceForm experience={experience} />
    </div>
  );
}
