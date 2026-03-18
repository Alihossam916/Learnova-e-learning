import { BookOpen } from "lucide-react";
import { CoursesCard } from "./coursesCard";
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

const CoursesSection = async () => {
  const data = await fetch("https://dummyjson.com/c/68d1-ae2a-4947-9c55", {
    next: { revalidate: 120 },
  });
  const courses = await data.json();

  return (
    <section className="my-12">
      {courses ? (
        <div className="flex flex-wrap items-center justify-center gap-8 last:mr-auto">
          <Suspense fallback={<Spinner className="size-12" />}>
            {courses.map((course: CourseProps) => {
              return <CoursesCard course={course} key={course.id} />;
            })}
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center p-24 border-2 border-dotted border-border rounded-sm">
          <BookOpen className="text-muted-foreground size-12" />
          <h3 className="text-xl text-foreground font-bold">
            No courses found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </section>
  );
};

export default CoursesSection;
