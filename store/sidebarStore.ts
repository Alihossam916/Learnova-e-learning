import { create } from "zustand";

type SidebarStore = {
  extended: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  extended: false,
  toggleSidebar: () => set((state) => ({ extended: !state.extended })),
}));
