// components
import { CoursesCard } from "./coursesCard";
// icons
import { BookOpen } from "lucide-react";
// lib
import { getCourses } from "@/lib/api";
import { filterCourses } from "@/lib/filterCourses";


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

const CoursesSection = async ({ params }: CoursesSectionProps) => {
  const { category, search } = (await params) || {
    category: "all",
    search: "",
  };

  const courses = await getCourses();

const filteredCourses = filterCourses(courses, category, search);

  return (
    <section className="my-12">
      {filteredCourses.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-8 last:mr-auto">
            {filteredCourses.map((course: CourseProps) => {
              return <CoursesCard course={course} key={course.id} />;
            })}
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
