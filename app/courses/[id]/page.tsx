import React from "react";
import Image from "next/image";
import Link from "next/link";
// lib
import { getCourseById } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

// types
import { Course } from "@/lib/filterCourses";

// components
import { Badge } from "@/components/ui/badge";

// icons
import { CirclePlay, BookOpen, Clock, ChartColumn, Users } from "lucide-react";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}
const LessonsList = () => {
  const lessons = [];
  for (let i = 1; i <= 12; i++) {
    lessons.push(
      <div
        key={i}
        className="flex items-center gap-4 p-4 border-2 border-border rounded-sm hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300 cursor-not-allowed"
      >
        <CirclePlay className="size-6 text-primary" />
        <div>
          <h5 className="font-medium">Lesson {i}: Lesson Title</h5>
          <p className="text-sm text-muted-foreground">10 min</p>
        </div>
      </div>,
    );
  }
  return <div className="flex flex-col gap-4">{lessons}</div>;
};

const CoursePage = async ({ params }: CoursePageProps) => {
  const { id } = await params;
  const course: Course = await getCourseById(id);
  const user = await getCurrentUser();

  const initials =
    `${course.instructor.split(" ")[0][0]}${course.instructor.split(" ")[1][0]}`.toUpperCase();

  return (
    <div className="sm:py-14">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-2 justify-between border-b-2 border-border sm:px-6 lg:px-14 pb-14">
        {/* course overview */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h4 className="text-primary text-sm uppercase">
              {course.category}
            </h4>
            <Badge
              variant={
                course.level === "beginner"
                  ? "default"
                  : course.level === "intermediate"
                    ? "secondary"
                    : "destructive"
              }
            >
              {course.level}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Users className="size-4" />
              <span>by {course.instructor}</span>
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="size-4" />
              <span>12 lessons</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>{course.duration}</span>
            </span>
            <span className="flex items-center gap-2">
              <ChartColumn className="size-4" />
              <span>{course.level}</span>
            </span>
          </div>
        </section>
        {/* course price and image */}
        <aside className="flex flex-col gap-6 p-6 border-2 border-border shadow-[0px_4px_2px_0px_rgba(0,0,0,0.1)] rounded-lg">
          <Image
            src={course.imageUrl}
            alt="Course Image"
            className="aspect-video object-cover rounded-lg w-full"
            width={300}
            height={200}
          />
          <Link
            href={user?`/courses/${course.id}/checkout`:`/auth/login`}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-sm text-center"
          >
            Enroll Now -{" "}
            {course.price == 0 ? "Free" : `$${course.price.toFixed(2)}`}
          </Link>
        </aside>
      </div>
      {/* course content */}
      <div className="flex flex-col-reverse lg:flex-row md:justify-between gap-4 lg:gap-0 mt-4 lg:mt-12">
        <section className="flex flex-col gap-4 w-full lg:w-2/3">
          {/* lessons */}
          <h4 className="text-lg text-center sm:text-left font-bold">
            Course Content (12 Lessons)
          </h4>
          <LessonsList />
          <Link
            href={`/courses/${course.id}/quiz`}
            className="flex items-center gap-4 p-4 border-2 border-border rounded-sm hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <CirclePlay className="size-6 text-primary" />
            Quiz
          </Link>
        </section>
        <aside className="flex flex-col gap-4 border-2 border-border p-6 h-38 w-full md:w-sm rounded-lg mb-8 lg:mb-0 mt-8 md:mt-0">
          {/* instructor details */}
          <h4 className="text-lg font-bold">Instructor</h4>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">{initials}</span>
            </div>
            <div>
              {course.instructor}
              <p className="text-muted-foreground">Instructor</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CoursePage;
