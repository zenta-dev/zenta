import { EducationPreview } from "@/components/cv/preview/education";
import { ExperiencePreview } from "@/components/cv/preview/experience";
import { OrganizationPreview } from "@/components/cv/preview/organization";
import { OtherPreview } from "@/components/cv/preview/other";
import { PersonalPreview } from "@/components/cv/preview/personal";
import { api } from "@/trpc/server";
import { nullsToUndefined } from "@packages/utils";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PreviewPage({ params }: Props) {
  const { slug } = params;

  const data = await api.cv.getBySlug({ slug });

  if (!data) {
    redirect("/404");
  }
  const { personal, educations, experiences, organizations, others } = data;

  return (
    <main className="bg-[#0F0716] pb-16">
      <PersonalPreview personal={nullsToUndefined(personal)} />
      <EducationPreview educations={nullsToUndefined(educations)} />
      <ExperiencePreview experiences={nullsToUndefined(experiences)} />
      <OrganizationPreview organizations={nullsToUndefined(organizations)} />
      <OtherPreview others={nullsToUndefined(others)} />
    </main>
  );
}
