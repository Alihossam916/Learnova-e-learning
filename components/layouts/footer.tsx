import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-2 border-border bg-background container mx-auto px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-sm">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl text-foreground font-bold">
              <Link href="/">Learnova</Link>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Master new skills with expert-led courses. Join thousands of
            learners worldwide.
          </p>
        </div>

        {/* Platform Column */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Platform</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/courses"
                className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors duration-200"
              >
                Browse Courses
              </Link>
            </li>
            <li>
              <Link
                href="/auth/sign-up?role=student"
                className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors duration-200"
              >
                Become a Student
              </Link>
            </li>
            <li>
              <Link
                href="/auth/sign-up?role=instructor"
                className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors duration-200"
              >
                Teach on Learnova
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories Column */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Categories</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/courses?category=web-development"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link
                href="/courses?category=data-science"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Data Science
              </Link>
            </li>
            <li>
              <Link
                href="/courses?category=design"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Design
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Support</h4>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Help Center
            </li>
            <li className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
            </li>
            <li className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          &copy; 2026 Learnova. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
