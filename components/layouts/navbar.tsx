"use client";
import Link from "next/link";

// icons
import { BookOpen, Menu } from "lucide-react";

// conponents
import MobileNav from "./mobileNav";

// lib
import { signOut } from "@/lib/auth";

// stores
import { useAuthStore } from "@/store/authStore";
import { useMobileMenuStore } from "@/store/mobileMenuStore";

// shadcn ui imports
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useAuthStore(); // Access the user state from authStore
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenuStore(); // Access mobile menu state and setter from the store

  const handleSignOut = async () => {
    const result = await signOut();
    if (!result.success) {
      alert("Error signing out. Please try again.");
      return;
    }
    alert("Signed out successfully.");
  };

  // Get initials from name e.g. "Ahmed Hassan" → "AH"
  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "";

  return (
    <>
      <nav className="w-full fixed top-0 z-50 flex items-center justify-between p-3 border-b-2 border-border backdrop-blur-sm bg-background/80">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden"
          >
            <Menu className="size-10 sm:size-12 text-foreground bg-background hover:text-primary-foreground hover:bg-primary p-2 rounded-sm transition-colors duration-300 cursor-pointer" />
          </button>
          <BookOpen className="size-10 sm:size-12 text-primary-foreground bg-primary p-2 rounded-sm" />
          <Link href={"/"} className="text-xl sm:text-2xl font-bold">
            Learnova
          </Link>
        </div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                className="bg-primary/30 text-primary text-xl font-bold p-6"
              >
                {initials}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-semibold text-md capitalize">
                  Hello, {user.firstName}
                </DropdownMenuLabel>
                <DropdownMenuItem className="text-md">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-md">
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={handleSignOut}
                  className="text-md text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 focus:bg-red-100 focus:text-red-700"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="text-sm sm:text-lg font-semibold py-5 hover:bg-primary/80 transition-colors duration-200">
            <Link href={"/auth/sign-up"}>Get Started</Link>
          </Button>
        )}
      </nav>
      <div className="sm:hidden">
        <MobileNav
        />
      </div>
    </>
  );
};

export default Navbar;
