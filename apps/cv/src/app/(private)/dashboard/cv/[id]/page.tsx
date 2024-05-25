import Image from "next/image";
import { FormStepper } from "./_components/FormStepper";

type Props = {
  params: {
    id: string;
  };
};
export default function CVPage({ params }: Props) {
  return (
    <main className=" flex w-full items-start justify-between">
      <section className="m-9 w-1/2 justify-start p-4">
        <FormStepper />
      </section>
      <section className="m-6 w-1/2">
        <Image
          src="https://via.placeholder.com/720x1280"
          alt="placeholder"
          width={720}
          height={1280}
          className="mx-auto"
        />
      </section>
    </main>
  );
}
