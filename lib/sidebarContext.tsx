"use client";
// This file defines a React context for managing the state of a sidebar in a Next.js application. It provides a context provider component and a custom hook for accessing the sidebar state and toggle function.
import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarContextType = {
  extended: boolean;
  setExtended: (value: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [extended, setExtended] = useState(false);
  
  const toggleSidebar = () => setExtended(!extended);
  
  return (
    <SidebarContext.Provider value={{ extended, setExtended, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};