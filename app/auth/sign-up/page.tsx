import { BookOpen } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import SignUpForm from "@/components/signUpForm";

const SignUp = () => {
  return (
    <div className=" flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex gap-2 items-center justify-center mb-8">
          <BookOpen className="text-primary-foreground bg-primary rounded-sm p-2 size-10" />
          <h2 className="text-2xl text-foreground font-bold">Learnova</h2>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-sm drop-shadow-xl/20 drop-shadow-foreground p-6 md:p-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Create your account
          </h1>

          {/* Form */}
          <Suspense
            fallback={
              <div className="text-center text-sm text-muted-foreground">
                Loading form...
              </div>
            }
          >
            <SignUpForm />
          </Suspense>
          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
