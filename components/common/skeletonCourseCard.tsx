// components
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function SkeletonCourseCard() {
  return (
    <div className="relative w-full max-w-sm">
      <Card className="pt-0">
        <div className="absolute inset-0 z-30 aspect-video" />
        <Skeleton className="relative z-20 aspect-video w-full rounded-none" />
        <CardHeader>
          <div className="flex flex-row-reverse items-center justify-between gap-2">
            <Skeleton className="w-16 h-6 rounded-sm" />
            <Skeleton className="h-6 flex-1" />
          </div>
          <CardDescription>
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </CardDescription>
          <CardContent className="flex flex-col gap-2 mt-2 w-[17rem] p-0">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter>
          <Skeleton className="h-6 w-16" />
        </CardFooter>
      </Card>
    </div>
  );
}
