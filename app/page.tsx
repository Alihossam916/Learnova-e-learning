import Link from "next/link";
// components
import { Button } from "@/components/ui/button";
// icons
import { TrendingUp, ArrowRight, BookOpen, Users, Award } from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Business", icon: "BookOpen" },
    { name: "Data Science", icon: "BookOpen" },
    { name: "Design", icon: "BookOpen" },
    { name: "Marketing", icon: "BookOpen" },
    { name: "Mobile Development", icon: "BookOpen" },
    { name: "Web Development", icon: "BookOpen" },
  ];
  return (
    <div className="flex flex-col items-center space-y-24 mt-32">
      {/* hero section */}
      <section className="flex flex-col items-center space-y-8 text-center">
        <p className="flex items-center gap-2 bg-primary/20 text-primary rounded py-1 px-4">
          <TrendingUp />
          Join 10,000+ learners worldwide
        </p>
        <h1 className="text-4xl font-bold text-foreground">
          Unlock Your Potential <br /> with Expert-Led Courses
        </h1>
        <p className="text-muted-foreground">
          Learn from industry professionals. Build real skills. Earn
          certificates. Start your <br /> journey to a better career today.
        </p>
        <div className="flex flex-col xs:flex-row items-center gap-4">
          <Link href="/courses">
            <Button className="px-4 py-5 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 transition-colors duration-200">
              Browse Courses
              <ArrowRight className=" ml-2" />
            </Button>
          </Link>
          <Link href="/auth/sign-up?role=teach">
            <Button className="px-4 py-5 border-2 border-border cursor-pointer bg-secondary/50 text-foreground hover:text-accent-foreground hover:bg-accent transition-colors duration-200">
              Start Teaching
            </Button>
          </Link>
        </div>
      </section>
      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-y-10 w-full border-y-2 border-border py-16">
        <div className="flex flex-col items-center gap-2">
          <BookOpen className="size-12 p-2 text-primary bg-primary/20 rounded-sm" />
          <h3 className="text-2xl font-bold">200+</h3>
          <p className="text-sm text-muted-foreground">Courses</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Users className="size-12 p-2 text-primary bg-primary/20 rounded-sm" />
          <h3 className="text-2xl font-bold">10,000+</h3>
          <p className="text-sm text-muted-foreground">Students</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Award className="size-12 p-2 text-primary bg-primary/20 rounded-sm" />
          <h3 className="text-2xl font-bold">5,000+</h3>
          <p className="text-sm text-muted-foreground">Certificates</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <TrendingUp className="size-12 p-2 text-primary bg-primary/20 rounded-sm" />
          <h3 className="text-2xl font-bold">92%</h3>
          <p className="text-sm text-muted-foreground">Completion Rate</p>
        </div>
      </section>
      {/* categories */}
      <section className="flex flex-col gap-6 w-full">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Browse By Categories
          </h2>
          <p className="text-muted-foreground">
            Find courses in your area of interest
          </p>
        </div>
        <div className="flex items-center w-full justify-around gap-4 flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/courses?category=${category.name.toLowerCase()}`}
            >
              <Button className="flex flex-col items-center gap-2 bg-background border-2 border-border h-full w-44 p-4 hover:scale-115 hover:shadow-xl shadow-shadow-color cursor-pointer">
                <BookOpen className="text-primary bg-primary/20 p-2 rounded-sm size-12" />
                <h4 className="text-foreground font-semibold">
                  {category.name}
                </h4>
              </Button>
            </Link>
          ))}
        </div>
      </section>
      <section className="w-full space-y-6">
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
      </section>
      <section className="flex flex-col items-center justify-center gap-4 bg-primary text-primary-foreground w-full py-16 ">
        <h2 className="text-xl xs:text-2xl font-bold">Ready to Start Learning?</h2>
        <p className="text-secondary text-center">
          Join thousands of learners. Gain new skills, earn certificates, and
          advance <br /> your career.
        </p>
        <Link href={"/auth/sign-up?role=learn"} className="mt-4">
          <Button className="bg-background text-foreground border-2 border-border hover:bg-accent hover:text-accent-foreground hover:border-accent p-4 transition-colors duration-200 cursor-pointer">
            Get Started for Free
          </Button>
        </Link>
      </section>
    </div>
  );
}
