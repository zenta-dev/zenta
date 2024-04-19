import { Separator } from "@/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Image from "next/image";

import { Logo } from "@/components/brand";
import { PostList, StackList, TagList } from "@/components/server";
import { getMetaPosts, getMetaTags, getMetaTechs } from "@/lib/server";
import { cn } from "@/lib/utils";
import banner from "../../../public/cover.webp";

const title = process.env.NEXT_PUBLIC_SITE_NAME;
const url = process.env.NEXT_PUBLIC_SITE_URL;

export const revalidate = 3600 * 12;

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
  const tags = await getMetaTags({ limit: 10, page: 1 });
  const posts = await getMetaPosts({ limit: 10, page: 1 });
  const stacks = await getMetaTechs({ limit: 10, page: 1 });

  return (
    <main className="mt-4">
      <section className="inline-flex flex-col space-y-3 items-center overflow-hidden relative w-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-200 ease-out px-5">
        <Image
          src={banner}
          className="rounded-3xl object-cover object-center h-48 md:h-72 max-w-7xl"
          alt={`Banner image for ${title} landing page`}
          priority
        />
        <Logo
          width={86}
          className="relative z-50 w-20 h-20 -mt-12 bg-transparent rounded-xl"
        />
        <h1 className="my-4 text-3xl font-semibold">{title}</h1>
        <p className="max-w-3xl my-2">
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
      <section className="max-w-3xl mx-auto mt-8">
        <Tabs defaultValue="post">
          <TabsList
            className="justify-around w-full mx-auto bg-transparent"
            role="tablist"
          >
            {tabList.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                role="tab"
                aria-controls={tab.ariaControls}
                className={cn(
                  "px-4 py-2 text-lg font-medium cursor-pointer hover:bg-neutral-800 hover:scale-105 transition-transform duration-200 ease-out",
                  "data-[state=active]:bg-neutral-800 data-[state=active]:text-emerald-500 data-[state=active]:shadow"
                )}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="max-w-3xl md:my-4 my-2" />
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
