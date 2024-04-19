"use client";
import { useBottomNavbar } from "@/hooks";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LiaHamburgerSolid } from "react-icons/lia";

export const BottomNavBarButton = ({ className }: { className?: string }) => {
  const { isOpen, toggle } = useBottomNavbar();
  const { theme } = useTheme();
  const mode = theme === "dark";
  const [isButtonFocused, setButtonFocused] = useState(false);

  return (
    <button
      className={cn(
        "p-2 m-2 rounded-lg hover:transform hover:scale-110 duration-300 ease-in-out",
        isButtonFocused ? "ring-2 ring-primary" : "",
        mode ? "bg-white/30" : "bg-black/30",
        className
      )}
      onClick={() => {
        console.log("invoking toggle open", isOpen);
        toggle(!isOpen);
      }}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      aria-controls="bottomNavbar"
      onFocus={() => setButtonFocused(true)}
      onBlur={() => setButtonFocused(false)}
    >
      {!isOpen ? (
        <LiaHamburgerSolid className="size-6" />
      ) : (
        <IoIosCloseCircleOutline className="size-6" />
      )}
    </button>
  );
};
