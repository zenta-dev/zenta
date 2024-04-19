"use client";

import { addImageSize } from "@/lib/utils";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Profile({ session }: { session: Session | null }) {
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
        <AvatarFallback className="bg-primary-foreground text-primary-background">
          {initials}
        </AvatarFallback>
      );
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
          <Link href={"/studio"}>
            <DropdownMenuItem>Studio</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
