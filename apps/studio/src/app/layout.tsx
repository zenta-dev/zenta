import { env } from "@/env";
import { defaultLayout } from "@/helpers";
import { TRPCReactProvider } from "@/trpc/react";
import { createAuthServer, getServerSession } from "@packages/supabase";
import {
  Button,
  cn,
  Header,
  ResizablePanel,
  ResizablePanelGroup,
  ThemeProvider,
  Toaster,
} from "@packages/ui";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import { FaTags } from "react-icons/fa6";
import { GiPostStamp } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { PiStackSimpleFill } from "react-icons/pi";
import { RiDashboard3Fill } from "react-icons/ri";
import "./globals.css";
import styles from "./style.module.css";

const montserrat = Montserrat({ subsets: ["latin"] });

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: RiDashboard3Fill,
    color: "blue",
    btnStyle: styles.btn_studio_dashboard,
  },
  {
    label: "Tags",
    href: "/tags",
    icon: FaTags,
    color: "green",
    btnStyle: styles.btn_studio_tags,
  },
  {
    label: "Stacks",
    href: "/stacks",
    icon: PiStackSimpleFill,
    color: "red",
    btnStyle: styles.btn_studio_stacks,
  },
  {
    label: "Posts",
    href: "/posts",
    icon: GiPostStamp,
    color: "purple",
    btnStyle: styles.btn_studio_posts,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: IoSettings,
    color: "yellow",
    btnStyle: styles.btn_studio_settings,
  },
] as const;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const res = await getServerSession({ cookies: cookies() });

  const handleLogout = async () => {
    "use server";
    const sb = createAuthServer({ cookies: cookies() });
    await sb.auth.signOut();
  };

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <TRPCReactProvider>
            <Header
              name="studio"
              data={res?.user}
              handleLogout={handleLogout}
            />
            <section className="px-4">
              <ResizablePanelGroup
                direction="horizontal"
                className="rounded-xl border"
              >
                <ResizablePanel
                  defaultSize={defaultLayout[0]}
                  className={`bg- flex flex-col  items-start gap-2 p-2`}
                >
                  {navItems.map((item, index) => (
                    <Link href={item.href} key={index} className="w-full">
                      <Button
                        role="button"
                        variant="link"
                        className={cn("w-full gap-2 p-2", item.btnStyle)}
                      >
                        <item.icon
                          className={`h-6 w-6 text-${item.color}-400`}
                        />
                        <p className="text-white">{item.label}</p>
                      </Button>
                    </Link>
                  ))}
                </ResizablePanel>
                {children}
              </ResizablePanelGroup>
            </section>
            <Toaster richColors />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: env.NEXT_PUBLIC_APP_NAME,
    description:
      "Effortlessly manage and create blog posts with the Zenta blog platform. Engage your audience and expand your online presence with our fast, reliable tools designed for growth and interaction.",
  };
}
