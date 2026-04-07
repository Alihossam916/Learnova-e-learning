"use client";
import { useSidebarStore } from "@/store/sidebarStore";
import { ReactNode, useState, useEffect } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
  const { extended } = useSidebarStore();
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`overflow-hidden xs:overflow-visible transition-all duration-300 p-4 ${
        screenWidth < 640
          ? "ml-0" // No margin on mobile
          : extended
            ? "ml-52"
            : "ml-16"
      }`}
    >
      {children}
    </div>
  );
}
