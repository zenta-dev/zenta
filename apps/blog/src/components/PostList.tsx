import { Card, CardDescription, CardHeader, CardTitle } from "@packages/ui";
import Image from "next/image";
import Link from "next/link";

export const PostList = async ({
  posts,
  className,
}: {
  posts: any[];
  className?: string;
}) => {
  return (
    <section aria-labelledby="post-list-heading" className={className}>
      <h2 id="post-list-heading" className="sr-only">
        Post List
      </h2>
      <ul role="list" className="grid grid-cols-2 gap-2 md:gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`}>
              <Card
                role="article"
                className="min-h-full overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:ring-1"
              >
                <figure className="relative inline-flex w-full   flex-col items-center p-4 drop-shadow-2xl">
                  <Image
                    className="h-28 rounded-xl object-cover object-center transition-all duration-300 md:h-48"
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
