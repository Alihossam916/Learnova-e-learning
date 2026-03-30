import { Suspense } from "react";
// components
import { CoursesCard } from "./coursesCard";
import { Spinner } from "../ui/spinner";
// icons
import { BookOpen } from "lucide-react";
// api
import { getCourses } from "@/lib/api";

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

type CoursesSectionProps = {
  params: Promise<{ category: string; search: string }>;
};

const normalizeCategory = (value: string) =>
  decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/[-_\s]+/g, " ");

const CoursesSection = async ({ params }: CoursesSectionProps) => {
  const { category, search } = (await params) || {
    category: "all",
    search: "",
  };
  const normalizedCategory = normalizeCategory(category);

  const courses = await getCourses();

  const filteredCourses = courses.filter((course: CourseProps) => {
    const matchesCategory =
      normalizedCategory === "all" ||
      course.category.toLowerCase() === normalizedCategory;
    const matchesSearch =
      search === "" ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="my-12">
      {filteredCourses.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-8 last:mr-auto">
          <Suspense fallback={<Spinner className="size-12" />}>
            {filteredCourses.map((course: CourseProps) => {
              return <CoursesCard course={course} key={course.id} />;
            })}
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center p-16 sm:p-24 border-2 border-dotted border-border rounded-sm">
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
