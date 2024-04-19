import { options } from "@/lib/server";
import { getServerSession } from "next-auth";
import { BrandLink, Logo } from "../brand";
import { ThemeButton } from "../buttton";
import { Profile } from "../client";

export const StudioHeader = async () => {
  const session = await getServerSession(options);
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 mx-auto backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <Logo />
        <BrandLink />
      </div>
      {/* Theme Button */}
      <div className="flex items-center gap-2">
        <ThemeButton />
        <Profile session={session} />
      </div>
    </header>
  );
};
