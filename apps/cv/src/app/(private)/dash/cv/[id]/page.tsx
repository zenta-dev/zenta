import { FormStepper } from "@/components/cv/form/form-stepper";
import { PdfRealtime } from "@/components/cv/pdf/pdf-realtime";
import { InitialPDFDataProps, PDFProvider } from "@/provider/pdf-provider";
import { api } from "@/trpc/server";
import { nullsToUndefined } from "@packages/utils";

type Props = {
  params: {
    id: string;
  };
};

export default async function CVPage({ params }: Props) {
  const cv = await api.cv.getById({ id: params.id });

  const nulledCv = nullsToUndefined(cv) as InitialPDFDataProps["initialData"];
  if (!nulledCv.id) {
    return <div>Missing CV ID. Please reopen from the dashboard.</div>;
  }
  return (
    <PDFProvider initialData={nulledCv}>
      <main className="mt-8 flex w-full items-start justify-between">
        <section className="w-full justify-start p-4 transition-all duration-300 md:w-1/2">
          <FormStepper />
        </section>
        <section className="relative hidden  w-1/2 p-4 transition-all duration-300 md:flex">
          <PdfRealtime />
        </section>
      </main>
    </PDFProvider>
  );
}
