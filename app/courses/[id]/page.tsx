import React from "react";
import { getCourseById } from "@/lib/api";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { id } = await params;
  const course = await getCourseById(id);

  return <div>{course.title}</div>;
};

export default CoursePage;