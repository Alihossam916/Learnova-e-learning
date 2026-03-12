"use client";
import { useSidebar } from "@/lib/sidebarContext";
import { ReactNode } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
  const { extended } = useSidebar();

  return (
    <div 
      className={`overflow-hidden xs:overflow-visible transition-all duration-300 p-4 ${
        extended ? "ml-52" : "ml-16"
      }`}
    >
      {children}
    </div>
  );
}