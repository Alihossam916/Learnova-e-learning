import { create } from "zustand";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type MobileMenuStore = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;

};

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
    isMobileMenuOpen: false,
    setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
}));