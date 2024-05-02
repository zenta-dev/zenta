"use client";

import type { Session } from "@packages/supabase";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast,
} from "@packages/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addImageSize, dev } from "../../lib/utils";

export function Profile({ session }: { session: Session | null }) {
  const router = useRouter();
  if (!session || session.user === null)
    return (
      <>
        <Link href="/auth/signin">
          <Button variant="outline">SignIn</Button>
        </Link>
        <Link href="/auth/signup" className="ml-2">
          <Button>Signup</Button>
        </Link>
      </>
    );

  const user = session?.user.user_metadata;
  function determineAvatar() {
    console.log(user);
    if (user.avatar_url.includes("cdn.")) {
      return (
        <AvatarImage
          src={user.avatar_url}
          alt={user.firstName || user.email || ""}
        />
      );
    }
    if (user?.avatar_url) {
      return (
        <AvatarImage
          src={addImageSize(user.image, 32, 32)}
          alt={user.firstName || user.email || ""}
        />
      );
    } else {
      const name = user.firstName + " " + user.lastName;
      const initials = name
        ?.split(" ")
        .map((n) => n[0])
        .join("");
      return (
        <AvatarFallback className="text-primary-background bg-primary-foreground">
          {initials}
        </AvatarFallback>
      );
    }
  }

  async function handleSignOut() {
    const res = await fetch(
      dev
        ? "https://zenta.local:3003/api/auth/logout"
        : "https://studio.zenta.dev/api/auth/logout",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );
    const json = await res.json();
    // console.log(json);
    if (json.redirect) {
      router.push("/redirect/auth");
    } else {
      toast.error("An error occurred");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">{determineAvatar()}</Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
