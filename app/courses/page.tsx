import React from "react";
import Link from "next/link";
import { Suspense } from "react";
// components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CoursesSection from "@/components/common/coursesSection";
import { SkeletonCourseCard } from "@/components/common/skeletonCourseCard";

type CoursesPageProps = {
  searchParams: Promise<{ category?: string; search?: string }>;
};

const categories: string[] = [
  "all",
  "programming",
  "databases",
  "design",
  "devops",
  "mobile development",
  "web development",
];
// Utility function to normalize category names for URL slugs
const normalizeCategory = (value: string) =>
  decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/[-_\s]+/g, "-");

const Courses = async ({ searchParams }: CoursesPageProps) => {
  // Extract and normalize category and search query from searchParams
  const params = await searchParams;

  const selectedCategory = params.category
    ? normalizeCategory(params.category)
    : "all";

  const searchQuery = params.search ?? "";

  return (
    <div>
      <h2 className="text-2xl text-foreground font-bold">All Courses</h2>
      <p className="text-muted-foreground">
        Explore our library of expert-led courses
      </p>
      {/* categories */}
      <section className="flex flex-col lg:flex-row mt-8 items-center justify-center gap-x-16 gap-y-8">
        {/* form to update url with search parameters */}
        <form
          action="/courses"
          method="get"
          className="flex items-center justify-center gap-2 xs:w-xs sm:w-sm md:w-md"
        >
          <input type="hidden" name="category" value={selectedCategory} />
          <Input
            name="search"
            defaultValue={searchQuery}
            placeholder="Search courses..."
          />
          <Button size="lg" className="cursor-pointer hover:bg-primary/80">
            Search
          </Button>
        </form>
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
          {categories.map((category: string): React.ReactNode => {
            // Normalize category name to create a URL-friendly slug
            const categorySlug = normalizeCategory(category);

            return (
              <label
                key={category}
                className={`${
                  selectedCategory === categorySlug
                    ? `bg-primary text-primary-foreground`
                    : `bg-background text-foreground hover:bg-secondary hover:scale-110 transition-all duration-200`
                } min-w-14 text-center p-2 rounded-sm capitalize border-2 border-border cursor-pointer`}
              >
                <Link href={`/courses?category=${categorySlug}`}>
                  <input
                    type="radio"
                    value={category.split(" ").join("-").toLowerCase()}
                    name="categories"
                    className="hidden"
                    defaultChecked={selectedCategory === categorySlug}
                  />
                  {category}
                </Link>
              </label>
            );
          })}
        </div>
      </section>
      {/* Courses Section */}
      <Suspense
        fallback={
          <div className="my-12 flex flex-wrap items-center justify-center gap-8">
            <SkeletonCourseCard />
            <SkeletonCourseCard />
            <SkeletonCourseCard />
          </div>
        }
      >
        <CoursesSection
          params={Promise.resolve({
            category: selectedCategory,
            search: searchQuery,
          })}
        />
      </Suspense>
    </div>
  );
};

export default Courses;
