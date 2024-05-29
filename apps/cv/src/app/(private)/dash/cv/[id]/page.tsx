import { FormStepper } from "@/components/cv/form-stepper";
import { api } from "@/trpc/server";
import { nullsToUndefined } from "@packages/utils";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};
export default async function CVPage({ params }: Props) {
  const cv = await api.cv.getById({ id: params.id });
 
  const nulledCv = nullsToUndefined(cv);
  return (
    <main className="mt-8 flex w-full items-start justify-between">
      <section className="w-full justify-start p-4">
        <FormStepper initialData={nulledCv} />
      </section>
      {/* <section className="m-6 w-1/2">
        <Image
          src="https://via.placeholder.com/720x1280"
          alt="placeholder"
          width={720}
          height={1280}
          className="mx-auto"
        />
      </section> */}
    </main>
  );
}
