"use client";

import { dev } from "@/lib/config";
import { addImageSize } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast,
} from "@packages/ui";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  function determineAvatar() {
    if (session?.user.image) {
      return (
        <AvatarImage
          src={addImageSize(session.user.image, 32, 32)}
          alt={session.user.name || session.user.email || ""}
        />
      );
    } else {
      const name = session?.user.name;
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
        ? "http://zenta.local:3003/api/auth/logout"
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
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={""}>
            <DropdownMenuItem>Studio</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
