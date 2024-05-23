import { defaultLayout } from "@/helpers";
import { Button, cn, ResizablePanel, ResizablePanelGroup } from "@packages/ui";
import Link from "next/link";
import { FaTags } from "react-icons/fa6";
import { GiPostStamp } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { PiStackSimpleFill } from "react-icons/pi";
import { RiDashboard3Fill } from "react-icons/ri";
import styles from "./style.module.css";

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
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  return (
    <section className="px-4">
      <ResizablePanelGroup direction="horizontal" className="rounded-xl border">
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
                <item.icon className={`h-6 w-6 text-${item.color}-400`} />
                <p className="text-white">{item.label}</p>
              </Button>
            </Link>
          ))}
        </ResizablePanel>
        {children}
      </ResizablePanelGroup>
    </section>
  );
}
