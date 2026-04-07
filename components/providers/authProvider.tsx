"use client";

import { useEffect } from "react";

// stores
import { useAuthStore } from "@/store/authStore";

// types
import { User } from "@/store/authStore";

type AuthProviderProps = {
  children: React.ReactNode;
  initialUser: User; // Pass from server
};

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Initialize store with user from server
    setUser(initialUser);
  }, [initialUser, setUser]);

  return <>{children}</>;
}