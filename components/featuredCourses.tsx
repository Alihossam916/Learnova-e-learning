import Link from "next/link";
// api
import { getCourses } from "@/lib/api";
// components
import { Button } from "@/components/ui/button";
import { CoursesCard } from "./coursesCard";
// icons
import { BookOpen } from "lucide-react";
import { Suspense } from "react";
import { Spinner } from "./ui/spinner";

interface CourseProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: string;
  duration: string;
  price: number;
  language: string;
  instructor: string;
  imageUrl: string;
  category: string;
  tags: string[];
  quizzes: object[];
}

const FeaturedCourses = async () => {
  const courses = await getCourses();
  const featuredCourses = courses.slice(0, 6); // Get the first 6 courses as featured
  return (
    <section className="w-full space-y-16">
      <div className="flex flex-col xs:flex-row gap-4 xs:gap-0 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Featured Courses
          </h2>
          <p className="text-muted-foreground">
            Popular courses picked for you
          </p>
        </div>
        <Link href={"/courses"}>
          <Button className="p-4 bg-background text-foreground border-2 border-border hover:bg-accent hover:text-accent-foreground cursor-pointer">
            View All
          </Button>
        </Link>
      </div>
      {featuredCourses ? (
        <div className="flex flex-wrap items-center justify-center gap-8 last:mr-auto">
          <Suspense fallback={<Spinner className="size-12" />}>
            {featuredCourses.map((course: CourseProps) => {
              return <CoursesCard course={course} key={course.id} />;
            })}
          </Suspense>
        </div>
      ) : (
        <div className="border-2 border-border border-dotted py-16 rounded-sm">
          <div className="flex flex-col items-center gap-2">
            <BookOpen className="size-12 text-muted-foreground" />
            <h3 className="text-foreground font-bold">No courses yet</h3>
            <p className="text-muted-foreground">
              Be the first instructor to create a course!
            </p>
            <Link href={"/auth/sign-up?role=teach"}>
              <Button className="text-primary-foreground bg-primary hover:bg-primary/80 transition-colors duration-200 cursor-pointer">
                Start Teaching
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedCourses;
