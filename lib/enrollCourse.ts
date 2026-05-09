"use server";
import { redirect } from "next/navigation";

// lib
import { updateUserDashboard } from "./updateDashboard";
import { getCurrentUser } from "./auth";

// types
import { Course } from "./filterCourses";

export async function enrollCourse(formData: FormData) {
  // Extract course from form data
  const courseData = formData.get("course") as string;
  const course: Course = JSON.parse(courseData);
  const user = await getCurrentUser();

  if (user) {
    // If free course, enroll and redirect to dashboard
    if (course.price === 0) {
      const result = await updateUserDashboard(course);
      if (result.success) {
        redirect("/dashboard");
      } else {
        throw new Error(result.error);
      }
    } else {
      // If paid course, redirect to checkout
      redirect(`/courses/${course.id}/checkout`);
    }
  }else{
    redirect(`/auth/login`)
  }
}
