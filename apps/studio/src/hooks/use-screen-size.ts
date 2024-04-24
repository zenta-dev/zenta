import { createContext } from "react";
import { create } from "zustand";

export interface ScreenSizeState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  setScreenSize: (width: number, height: number) => void;
}

export const useScreenSize = create<ScreenSizeState>((set) => ({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  width: 0,
  height: 0,
  setScreenSize: (width, height) => {
    set({
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
      width,
      height,
    });
  },
}));

export const ScreenSizeContext = createContext<ScreenSizeState | undefined>(
  undefined
);

export const useScreenSizeStore = () => {
  const screenSize = useScreenSize((state) => state);
  return screenSize;
};
