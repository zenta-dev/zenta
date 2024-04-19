"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaTags } from "react-icons/fa6";
import { GiPostStamp } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { PiStackSimpleFill } from "react-icons/pi";
import { RiDashboard3Fill } from "react-icons/ri";
import styles from "./style.module.css";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ItemClient = () => {
  const router = usePathname();
  const navItems = [
    {
      label: "Dashboard",
      href: "/studio",
      icon: RiDashboard3Fill,
      color: "blue",
      btnStyle: styles.btn_studio_dashboard,
    },
    {
      label: "Tags",
      href: "/studio/tags",
      icon: FaTags,
      color: "green",
      btnStyle: styles.btn_studio_tags,
    },
    {
      label: "Stacks",
      href: "/studio/stacks",
      icon: PiStackSimpleFill,
      color: "red",
      btnStyle: styles.btn_studio_stacks,
    },
    {
      label: "Posts",
      href: "/studio/posts",
      icon: GiPostStamp,
      color: "purple",
      btnStyle: styles.btn_studio_posts,
    },
    {
      label: "Settings",
      href: "/studio/settings",
      icon: IoSettings,
      color: "yellow",
      btnStyle: styles.btn_studio_settings,
    },
  ] as const;
  return navItems.map((item, index) => (
    // <Link href={item.href} key={index} className="w-full">
    <Button
      key={index}
      role="button"
      variant="link"
      className={cn("p-2 w-full gap-2", item.btnStyle)}
      onClick={() => (window.location.href = item.href)}
    >
      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
      <p className="text-white">{item.label}</p>
    </Button>
    // </Link>
  ));
};
