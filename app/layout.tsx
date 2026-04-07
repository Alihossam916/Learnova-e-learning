import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";

// components
import Navbar from "@/components/layouts/navbar";
import SideNavbar from "@/components/layouts/sideNavbar";
import Footer from "@/components/layouts/footer";
import MainContent from "@/components/layouts/mainContent";
import { ModeToggle } from "@/components/common/theme-button";

// lib
import { getCurrentUser } from "@/lib/auth";

// providers
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/authProvider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <AuthProvider initialUser={user}>
            <Navbar />
            <SideNavbar />
            <MainContent>
              <main className="mt-20 mx-0 sm:mx-6">{children}</main>
              <Footer />
            </MainContent>
          </AuthProvider>
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
