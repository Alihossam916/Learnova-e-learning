"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { BookOpen } from "lucide-react";

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
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating user authentication state

  return (
    <nav className="w-full fixed top-0 z-50 flex items-center justify-between p-3 border-b-2 border-border backdrop-blur-sm bg-background/80">
      <div className="flex items-center gap-3">
        <BookOpen className="size-10 sm:size-12 text-primary-foreground bg-primary p-2 rounded-sm" />
        <Link href={"/"} className="text-xl sm:text-2xl ml-3 sm:ml-0 font-bold">
          Learnova
        </Link>
      </div>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={"icon"}
              className="bg-primary/30 text-primary text-xl font-bold p-6"
            >
              AH
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-semibold text-md">
                Hello, Ali
              </DropdownMenuLabel>
              <DropdownMenuItem className="text-md">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-md">Dashboard</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => setIsLoggedIn(false)}
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
  );
};

export default Navbar;
