import type { User } from "@packages/supabase";
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
} from "@packages/ui";
import { LogoutButton } from "../client/LogoutButton";

export function Profile({
  data,
  handleLogout,
}: {
  data: User | null;
  handleLogout?: () => void;
}) {
  if (!data || data === null) return null;
  const user = data?.user_metadata;
  console.log("PROFILE", user);
  function determineAvatar() {
    if (user?.avatar_url) {
      return (
        <AvatarImage
          src={user.avatar_url}
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
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <form action={handleLogout}>
          <DropdownMenuItem>
            <LogoutButton handleLogout={handleLogout} />
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
