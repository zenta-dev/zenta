import { Card, CardHeader, CardTitle } from "@packages/ui";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const data = [
    {
      id: "94a34cf6-8858-4e1c-a2cd-88529c881e3d",
      image: "https://picsum.photos/200/300",
      title: "Violia CV",
      updateAt: new Date("2021-5-10"),
    },

    {
      id: "9cb7c321-1678-4a56-acda-a8ed8593bb36",
      image: "https://picsum.photos/200/300",
      title: "Rahmat CV",
      updateAt: new Date("2021-10-12"),
    },
  ];
  return (
    <main className="m-4">
      <h1 className="pb-2 text-xl font-semibold">
        Choose a Template or Create Your Own CV
      </h1>
      <section className="grid grid-cols-3 gap-8 rounded-lg bg-background-100 p-8">
        {data.map((item) => (
          <Link
            key={item.id}
            href="/dashboard/cv/[id]"
            as={`/dashboard/cv/${item.id}`}
          >
            <Card className="mx-auto max-w-96">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={300}
                className=" h-80 w-96 rounded-lg object-cover"
              />
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  Update at {item.updateAt.toLocaleDateString()}
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      <h1 className="pb-2 pt-6 text-xl font-semibold">My CV</h1>
      <section className="grid grid-cols-3 gap-8 rounded-lg bg-background-100 p-8">
        {data.map((item) => (
          <Link
            key={item.id}
            href="/dashboard/cv/[id]"
            as={`/dashboard/cv/${item.id}`}
          >
            <Card className="mx-auto max-w-96">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={300}
                className=" h-80 w-96 rounded-lg object-cover"
              />
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  Update at {item.updateAt.toLocaleDateString()}
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
