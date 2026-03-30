"use client";
import React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, Star } from "lucide-react";

interface CourseCardProps {
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
interface CourseProps {
  course: CourseCardProps;
}

export function CoursesCard({ course }: CourseProps) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="relative w-full max-w-sm hover:scale-105 hover:drop-shadow-2xl transition-all duration-200"
    >
      <Card className="pt-0">
        <div className="absolute inset-0 z-30 aspect-video" />
        <Image
          width={500}
          height={300}
          src={course.imageUrl}
          alt="Course Image"
          className="relative z-20 aspect-video w-full object-cover brightness-60 hover:brightness-100"
        />
        <CardHeader>
          <div className="flex flex-row-reverse items-center justify-between">
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
            <CardTitle className="text-primary font-semibold">
              {course.title}
            </CardTitle>
          </div>
          <CardDescription>{course.description}</CardDescription>
          <CardContent className="flex flex-col gap-2 mt-2 w-[17rem]">
            <p className="text-muted-foreground">{course.instructor}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <BookOpen className="text-muted-foreground" />
                <p>12 lessons</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground" />
                <p>12 hours</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-muted-foreground" />
                <p>4.8</p>
              </div>
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter>
          <p className="font-bold text-xl">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
