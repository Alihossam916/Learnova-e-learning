import React from "react";
import Link from "next/link";

// icons
import { X } from "lucide-react";

// stores
import { useAuthStore } from "@/store/authStore";

const MobileNav = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}) => {
  const { user } = useAuthStore(); // Access the user state from authStore
 
  return (
    <>
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 " +
          (isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none")
        }
      />

      <aside
        className={`${isMobileMenuOpen ? `translate-x-0` : `-translate-x-full`} fixed top-0  bg-background border-r-2 z-60 transition-all duration-200`}
      >
        <nav className="w-64 h-screen p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="mb-4 ml-46 hover:bg-primary hover:text-primary-foreground transition-all duration-300 p-2 rounded-sm cursor-pointer"
          >
            <X />
          </button>
          <hr className="-ml-0.5 mb-2 border-2 w-full" />
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                Courses
              </Link>
            </li>
            {user ? (
              <li>
                <Link
                  href="/dashboard"
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <>
                <hr className="-ml-0.5 mb-2 border-2 w-full" />
                <li>
                  <Link
                    href="/auth/login"
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
      <div className="w-full bg-red-500"></div>
    </>
  );
};

export default MobileNav;
