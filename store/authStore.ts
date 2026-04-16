import { create } from "zustand";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updatedData: Partial<User>) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updatedData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedData } : null,
    })),
}));