import { CreateCVDialog } from "@/components/cv/create/dialog";
import { DeleteCVDialog } from "@/components/cv/delete/dialog";
import { api } from "@/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@packages/ui";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const cv = await api.cv.getAll();

  return (
    <main className="m-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">My CV</CardTitle>
            <CardDescription>Zenta CV now limited to 2 CVs.</CardDescription>
          </div>
          <CreateCVDialog />
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 grid grid-cols-2 gap-8 rounded-lg bg-background-100">
          {cv.map((item) => (
            <div key={item.id} className="relative w-fit">
              <Link href="/dash/cv/[id]" as={`/dash/cv/${item.id}`}>
                <Card className="mx-auto max-w-96">
                  <Image
                    src={item.image ?? "https://picsum.photos/200/300"}
                    alt={item.title}
                    width={200}
                    height={300}
                    className=" h-80 w-96 rounded-lg object-cover"
                  />

                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <p className="text-sm text-gray-500">
                      Update at {item.updatedAt.toLocaleDateString()}
                    </p>
                  </CardHeader>
                </Card>
              </Link>{" "}
              <DeleteCVDialog
                id={item.id}
                title={item.title}
                className="absolute right-2 top-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
