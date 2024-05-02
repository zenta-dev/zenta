import { User } from "@packages/supabase";
import { BrandLink, cn, Profile } from "@packages/ui";
import { Logo } from "./Brand/Logo";

export const Header = async ({
  name,
  className,
  data,
  handleLogout,
}: {
  name: string;
  className?: string;
  data: User | undefined;
  handleLogout: () => void;
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto flex max-w-5xl items-center justify-between p-4 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Logo />
        <BrandLink name={name} />
      </div>
      <div className="flex items-center gap-2">
        {data && <Profile data={data} handleLogout={handleLogout} />}
      </div>
    </header>
  );
};
