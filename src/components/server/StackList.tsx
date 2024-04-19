import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemMeta } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const StackList = async ({ stacks }: { stacks: ItemMeta[] }) => {
  return (
    <section aria-labelledby="stacks-list-heading">
      <h2 id="stacks-list-heading" className="sr-only">
        Stack List
      </h2>
      <ul role="list" className="grid grid-cols-2 md:gap-4 gap-2">
        {stacks.map((stack) => (
          <li key={stack.id}>
            <Link href={`/stack/${stack.id}`}>
              <Card
                role="article"
                className="transition-transform duration-300 hover:shadow-lg hover:scale-105 hover:ring-1 min-h-full overflow-hidden"
              >
                <figure className="inline-flex flex-col items-center   relative w-full drop-shadow-2xl p-4">
                  <Image
                    className="rounded-xl object-cover object-center h-28 md:h-48"
                    src={stack.photo ?? "https://via.placeholder.com/360/144"}
                    alt={stack.name}
                    priority={false}
                    width={360}
                    height={144}
                  />
                </figure>
                <CardHeader>
                  <CardTitle>{stack.name}</CardTitle>
                  <CardDescription className="truncate">
                    {stack.description}
                  </CardDescription>
                  <time dateTime={stack.updatedAt?.toISOString()}>
                    Updated at : {stack.updatedAt?.toLocaleDateString()}
                  </time>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
