import { create } from "zustand";

export interface BottomNavbarState {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
}

export const useBottomNavbar = create<BottomNavbarState>((set) => ({
  isOpen: false,
  toggle: (isOpen) => set({ isOpen }),
}));
