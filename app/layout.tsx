import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";

// components
import Navbar from "@/components/layouts/navbar";
import SideNavbar from "@/components/layouts/sideNavbar";
import Footer from "@/components/layouts/footer";
import MainContent from "@/components/layouts/mainContent";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-button";

// context
import { SidebarProvider } from "@/lib/sidebarContext";

// styles
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learnova - Unlock Your Potential with Expert-Led Courses",
  description:
    "Discover a world of knowledge with Learnova. Our expert-led courses empower you to master new skills, advance your career, and achieve your goals. Join thousands of learners worldwide and start your learning journey today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Navbar />
          <SidebarProvider>
            <SideNavbar />
            <MainContent>
              <main className="mt-20 mx-0 sm:mx-6">{children}</main>
              <Footer />
            </MainContent>
          </SidebarProvider>
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
