import React from "react";
import { Suspense } from "react";
// import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import CoursesSection from "@/components/coursesSection";

const Courses = () => {
  // const [categoryState, setCategoryState] = useState("all");
  const categories: string[] = [
    "all",
    "business",
    "data science",
    "design",
    "marketing",
    "mobile development",
    "web development",
  ];

  // const handleChange = (e) => {
  //   setCategoryState(e.target.value);
  // };

  return (
    <div>
      <h2 className="text-2xl text-foreground font-bold">All Courses</h2>
      <p className="text-muted-foreground">
        Explore our library of expert-led courses
      </p>
      {/* categories */}
      <section className="flex flex-col lg:flex-row mt-8 items-center justify-center gap-x-16 gap-y-8">
        <div className="flex items-center justify-center gap-2 xs:w-xs sm:w-sm md:w-md">
          <Input placeholder="Search courses..." />
          <Button size="lg" className="cursor-pointer hover:bg-primary/80">
            Search
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
          {categories.map((category: string): React.ReactNode => {
            return (
              <label key={category} className="cursor-pointer">
                <input
                  type="radio"
                  value={category}
                  name="categories"
                  className="hidden"
                  // checked={categoryState === category}
                  // onChange={handleChange}
                />
                <div className="min-w-14 text-center p-2 rounded-sm capitalize bg-background text-foreground hover:bg-muted border-2 border-border transition-colors duration-200">
                  {category}
                </div>
              </label>
            );
          })}
        </div>
      </section>
      <Suspense fallback={<Spinner className="size-12" />}>
        <CoursesSection />
      </Suspense>
    </div>
  );
};

export default Courses;
