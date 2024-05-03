import { PostList, StackList, TagList } from "@/components";
import { env } from "@/env";
import { api } from "@/trpc/server";
import {
  cn,
  Logo,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@packages/ui";
import { Metadata } from "next";
import Image from "next/image";
import banner from "../../public/cover.webp";

const title = env.NEXT_PUBLIC_APP_NAME;
const url = env.NEXT_PUBLIC_APP_URL;

export const revalidate = 60 * 12;

export const metadata: Metadata = {
  title,
  description: `${title} is a website about programming 🧑‍💻 . I will be posting about my programming progress, good and bad days and more. Also, I might have some videos of me coding 🎥 .`,
  keywords: `programming, coding, web development, software development, software engineering, developer, web developer, software developer, programming blog, coding blog, web development blog, software development blog, software engineering blog, developer blog, web developer blog, software developer blog, programming videos, coding videos, web development videos, software development videos, software engineering videos, developer videos, web developer videos, software developer videos, programming tutorials, coding tutorials, web development tutorials, software development tutorials, software engineering tutorials, developer tutorials, web developer tutorials, software developer tutorials`,
  openGraph: {
    title,
    description: `${title} is a website about programming 🧑‍💻 . I will be posting about my programming progress, good and bad days and more. Also, I might have some videos of me coding 🎥 .`,
    url,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    site: "@zenta-dev",
    title,
    description: `${title} is a website about programming 🧑‍💻 . I will be posting about my programming progress, good and bad days and more. Also, I might have some videos of me coding 🎥 .`,
  },
};

const tabList = [
  {
    name: "Post",
    value: "post",
    ariaControls: "post-tab",
  },
  {
    name: "Tag",
    value: "tag",
    ariaControls: "tag-tab",
  },
  {
    name: "Stack",
    value: "stack",
    ariaControls: "stack-tab",
  },
];

export default async function Home() {
  const tags = (await api.tag.getAllMetaPublic()).map((tag) => ({
    id: tag.id,
    name: tag.name,
    photo: tag.photo,
    description: tag.description,
    updatedAt: tag.updatedAt,
  }));
  const stacks = (await api.tech.getAllMetaPublic()).map((stack) => ({
    id: stack.id,
    name: stack.name,
    photo: stack.logo,
    description: stack.description,
    updatedAt: stack.updatedAt,
  }));

  const posts = (await api.post.getAllMetaPublic()).map((post) => ({
    id: post.id,
    name: post.title,
    slug: post.slug,
    photo: post.cover,
    description: post.summary,
    updatedAt: post.updatedAt,
  }));

  return (
    <main className="mt-4">
      <section className="relative inline-flex w-full flex-col items-center space-y-3 overflow-hidden px-5 drop-shadow-2xl transition-transform duration-200 ease-out group-hover:scale-105">
        <Image
          src={banner}
          className=" h-48 max-w-5xl rounded-3xl object-cover object-center transition-all duration-300 md:h-72"
          alt={`Banner image for ${title} landing page`}
          width={1024}
          height={288}
          priority
        />
        <Logo className="relative z-50 -mt-12 h-20 w-20 rounded-xl bg-transparent" />
        <h1 className="my-4 text-3xl font-semibold">{title}</h1>
        <p className="my-2 max-w-3xl">
          Welcome to {title} , your friendly corner of the internet dedicated to
          all things programming! 🌟.{" "}
          <span className="hidden md:inline">
            {" "}
            Join us on our exciting programming journey as we share our
            experiences, tips, and tricks. Stay tuned for engaging written
            content and, who knows, maybe even some video updates along the way!
            🚀
          </span>
          Let&apos;s embark on this coding adventure together! 🧑‍💻🎥.
        </p>
      </section>
      <section className="mx-auto mt-8 max-w-3xl">
        <Tabs defaultValue="post">
          <TabsList
            className="mx-auto w-full justify-around bg-transparent"
            role="tablist"
          >
            {tabList.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                role="tab"
                aria-controls={tab.ariaControls}
                className={cn(
                  "cursor-pointer px-4 py-2 text-lg font-medium transition-transform duration-200 ease-out hover:scale-105 hover:bg-neutral-800",
                  "data-[state=active]:bg-neutral-800 data-[state=active]:text-emerald-500 data-[state=active]:shadow",
                )}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="my-2 max-w-3xl md:my-4" />
          <TabsContent
            value="post"
            id="post-tab"
            role="tabpanel"
            aria-labelledby="post"
            tabIndex={0}
          >
            <PostList posts={posts} />
          </TabsContent>
          <TabsContent
            value="tag"
            id="tag-tab"
            role="tabpanel"
            aria-labelledby="tag"
            tabIndex={1}
          >
            <TagList tags={tags} />
          </TabsContent>
          <TabsContent
            value="stack"
            id="stack-tab"
            role="tabpanel"
            aria-labelledby="stack"
            tabIndex={2}
          >
            <StackList stacks={stacks} />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
