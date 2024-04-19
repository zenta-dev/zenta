import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemMeta } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const PostList = async ({ posts }: { posts: ItemMeta[] }) => {
  return (
    <section aria-labelledby="post-list-heading">
      <h2 id="post-list-heading" className="sr-only">
        Post List
      </h2>
      <ul role="list" className="grid grid-cols-2 md:gap-4 gap-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <Card
                role="article"
                className="transition-transform duration-300 hover:shadow-lg hover:scale-105 hover:ring-1 min-h-full overflow-hidden"
              >
                <figure className="inline-flex flex-col items-center   relative w-full drop-shadow-2xl p-4">
                  <Image
                    className="rounded-xl object-cover object-center h-28 md:h-48"
                    src={post.photo ?? "https://via.placeholder.com/360/144"}
                    alt={post.name}
                    priority={false}
                    width={360}
                    height={144}
                  />
                </figure>
                <CardHeader>
                  <CardTitle>{post.name}</CardTitle>
                  <CardDescription className="truncate">
                    {post.description}
                  </CardDescription>
                  <time dateTime={post.updatedAt?.toISOString()}>
                    Updated at : {post.updatedAt?.toLocaleDateString()}
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
