"use client";

// react imports
import React from "react";
import { useState } from "react";
// next imports
import Link from "next/link";
// icons
import { BookOpen } from "lucide-react";
// shadcn ui imports
import { Button } from "../ui/button";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="border-b-2 border-border fixed top-0 w-full bg-background/50 backdrop-blur-sm z-50">
      <nav className="mx-0 md:mx-10 lg:mx-24">
        <ul className="flex items-center justify-between p-4 text-lg text-secondary-foreground">
          <div className="flex items-center gap-4">
            <Link href={"/"} className="flex gap-2 items-center">
              <i className="text-2xl text-primary-foreground bg-primary p-2 rounded-sm">
                <BookOpen />
              </i>
              <li className="capitalize text-2xl font-bold text-foreground">learnova</li>
            </Link>
            <Link href={"/courses"} className="capitalize text-secondary-foreground hover:text-foreground">
              <li>courses</li>
            </Link>
            <Link href={"/dashboard"} className={isLoggedIn ? 'capitalize text-secondary-foreground hover:text-foreground' : 'hidden'}>
              <li>dashboard</li>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href={"/auth/login"} className={isLoggedIn ? 'hidden' : 'block'}>
              <Button size={"lg"} className="capitalize cursor-pointer text-lg font-bold text-foreground bg-transparent hover:text-accent-foreground hover:bg-accent transition-colors duration-300">sign in</Button>
            </Link>
            <Link href={"/auth/sign-up"} className={isLoggedIn ? 'hidden' : 'block'}>
              <Button size={"lg"} className="capitalize cursor-pointer text-lg font-semibold hover:bg-primary/70 transition-colors duration-300">get started</Button>
            </Link>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
