import { BrandLink, Logo } from "../brand";
import { ThemeButton } from "../buttton";

export const GuestHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-around mx-auto max-w-7xl backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <Logo />
        <BrandLink />
      </div>
      {/* Theme Button */}
      <div className="flex items-center gap-2">
        <ThemeButton />
      </div>
    </header>
  );
};
