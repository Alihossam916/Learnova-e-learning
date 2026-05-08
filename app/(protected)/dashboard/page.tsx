import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

// shadcn ui
import { Button } from "@/components/ui/button";

// components
import { CoursesCard } from "@/components/common/coursesCard";

// types
import { Course } from "@/lib/filterCourses";

// icons
import {
  BookOpen,
  TrendingUp,
  CirclePlay,
  Award,
  Users,
  Eye,
  DollarSign,
} from "lucide-react";

// lib
import { getCurrentUser } from "@/lib/auth";
import { getCourseById } from "@/lib/api";

const Dashboard = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // get enrolled courses if student
  const enrolledCoursesId = user.enrolledCourses;
  const enrolledCourses = await getCourseById(enrolledCoursesId);

  // get created courses if instructor
  const createdCoursesId = user.createdCourses;
  const createdCourses = await getCourseById(createdCoursesId);

  return (
    <div className="flex flex-col px-8 sm:px-4 pb-8">
      {user.role == "teach" ? (
        <div className="space-y-8">
          {/* instructor dashboard */}
          <section className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Instructor Dashboard</h2>
              <p className="text-muted-foreground text-sm capitalize">
                Welcome back,{" "}
                <span className="capitalize">
                  {user.firstName} {user.lastName}
                </span>
              </p>
            </div>
            {/* for adding new courses (needs database to store new courses) */}
            <Link href={"/dashboard/create-course"}>
              <Button className="flex items-center gap-4 px-3 py-4.5 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 transition-colors duration-200">
                <span className="font-bold">+</span> New Course
              </Button>
            </Link>
          </section>
          {/* progress overview */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 border-border border-2 rounded-sm p-8">
              <BookOpen className="size-10 p-2 text-primary bg-primary/20 rounded-sm" />
              <div className="flex flex-col">
                <div className="font-bold text-2xl">
                  {user.enrolledCourses?.length || 0}
                </div>
                <div className="text-muted-foreground text-sm">
                  Total Courses
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-border border-2 rounded-sm p-8">
              <Eye className="size-10 p-2 text-chart-4 bg-chart-4/20 rounded-sm" />
              <div className="flex flex-col">
                <div className="font-bold text-2xl">
                  {user.enrolledCourses?.length || 0}
                </div>
                <div className="text-muted-foreground text-sm">Published</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-border border-2 rounded-sm p-8">
              <Users className="size-10 p-2 text-primary bg-primary/20 rounded-sm" />
              <div className="flex flex-col">
                <div className="font-bold text-2xl">0</div>
                <div className="text-muted-foreground text-sm">Students</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-border border-2 rounded-sm p-8">
              <DollarSign className="size-10 p-2 text-chart-3 bg-chart-3/20 rounded-sm" />
              <div className="flex flex-col">
                <div className="font-bold text-2xl">$0.00</div>
                <div className="text-muted-foreground text-sm">
                  Total Income
                </div>
              </div>
            </div>
          </section>
          <section className="border-2 border-border p-6 rounded-sm">
            <h4 className="flex gap-4 items-center">
              <TrendingUp className="size-6 text-primary" />
              <span className="font-bold">Income by Course</span>
            </h4>
            <article className="text-center p-12">
              <p className="text-muted-foreground">
                No income yet. Publish courses and enroll students to start
                earning.
              </p>
            </article>
          </section>
          {/* created courses */}
          <section className="space-y-2">
            <h3 className="text-xl font-bold">My Courses</h3>
            {user.createdCourses?.length > 0 ? (
              <article className="flex flex-wrap justify-center xl:justify-between items-center gap-x-5 gap-y-10 p-12 border-2 border-border rounded-sm">
                {/* replace the enrolled courses with created courses for instructor rule */}
                {createdCourses.map((course: Course) => (
                  <CoursesCard course={course} key={course.id} />
                ))}
              </article>
            ) : (
              <article className="flex flex-col justify-center items-center gap-4 p-16 border-2 border-border rounded-sm">
                <BookOpen className="text-muted-foreground size-12" />
                <h3 className="font-bold text-lg">No courses yet</h3>
                <p className="text-muted-foreground">
                  Create your first course and start teaching!
                </p>
                {/* for adding new courses (needs database to store new courses) */}
                <Link href={"/dashboard/create-course"}>
                  <Button
                    variant="default"
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-primary/80"
                  >
                    <span className="font-bold">+</span> Create Course
                  </Button>
                </Link>
              </article>
            )}
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          {/* student dashboard */}
          <section className="space-y-1">
            <h2 className="text-2xl font-bold">
              Welcome back, <span className="capitalize">{user.firstName}</span>
            </h2>
            <p className="text-muted-foreground text-sm capitalize">
              Track your learning progress
            </p>
          </section>
          {/* progress overview */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 border-border border-2 rounded-sm p-8">
              <BookOpen className="size-10 p-2 text-primary bg-primary/20 rounded-sm" />
              <div className="flex flex-col">
                <div className="font-bold text-2xl">
                  {user.enrolledCourses?.length || 0}
                </div>
                <div className="text-muted-foreground text-sm">Enrolled</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-border border-2 rounded-sm p-8">
              <TrendingUp className="size-10 p-2 text-chart-4 bg-chart-4/20 rounded-sm" />
              <div className="flex flex-col">
                <div className="font-bold text-2xl">
                  {user.enrolledCourses?.length || 0}
                </div>
                <div className="text-muted-foreground text-sm">In Progress</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-border border-2 rounded-sm p-8">
              <CirclePlay className="size-10 p-2 text-primary bg-primary/20 rounded-sm" />
              <div className="flex flex-col">
                <div className="font-bold text-2xl">0</div>
                <div className="text-muted-foreground text-sm">Completed</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-border border-2 rounded-sm p-8">
              <Award className="size-10 p-2 text-chart-3 bg-chart-3/20 rounded-sm" />
              <div className="flex flex-col">
                <div className="font-bold text-2xl">0</div>
                <div className="text-muted-foreground text-sm">
                  Certificates
                </div>
              </div>
            </div>
          </section>
          {/* enrolled courses */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">My Courses</h3>
              <Link href={"/courses"}>
                <Button
                  variant="outline"
                  className="p-4 cursor-pointer border-2 hover:bg-accent hover:text-accent-foreground"
                >
                  Browse More
                </Button>
              </Link>
            </div>
            {user.enrolledCourses?.length > 0 ? (
              <article className="flex flex-wrap justify-center xl:justify-between items-center gap-x-5 gap-y-10 p-12 border-2 border-border rounded-sm">
                {enrolledCourses.map((course: Course) => (
                  <CoursesCard course={course} key={course.id} />
                ))}
              </article>
            ) : (
              <article className="flex flex-col justify-center items-center gap-4 p-16 border-2 border-border rounded-sm">
                <BookOpen className="text-muted-foreground size-12" />
                <p className="text-muted-foreground">
                  You haven&apos;t enrolled in any courses yet
                </p>
                <Link href={"/courses"}>
                  <Button
                    variant="default"
                    className="p-5 cursor-pointer hover:bg-primary/80"
                  >
                    Browse More
                  </Button>
                </Link>
              </article>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
