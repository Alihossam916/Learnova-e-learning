"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// components
import QuizResults from "@/components/common/quizResults";

interface quiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: string;
}

interface QuizContentProps {
  course: {
    id: string;
    title: string;
    quizzes: quiz[];
  };
  courseId: string;
  submitQuizAction: (formData: FormData) => Promise<void>;
}

const QuizContent = ({
  course,
  courseId,
  submitQuizAction,
}: QuizContentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Read score from URL when component mounts or URL changes
  useEffect(() => {
    const scoreFromUrl = searchParams.get("score");
    if (scoreFromUrl) {
      const parsedScore = parseInt(scoreFromUrl, 10);
      startTransition(() => {
        setScore(parsedScore);
        setShowResults(true);
      });
    }
  }, [searchParams, startTransition]);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await submitQuizAction(formData);
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    });
  };

  const handleRetakeQuiz = () => {
    setShowResults(false);
    setScore(null);
    router.push(`/courses/${courseId}/quiz`);
  };

  return (
    <>
      <div className="mb-16">
        <article className="w-full lg:w-2/3 mx-auto">
          <h3 className="text-xl font-bold">Quiz (5 Questions, Pass: 3/5)</h3>
          <h4 className="p-4 border-2 border-border rounded-sm my-5">
            {course.title}
          </h4>
          <form action={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4 p-6 border-2 border-border rounded-sm">
              {course.quizzes.map((q: quiz, index: number) => {
                return (
                  <section
                    className="p-8 border-2 border-border rounded-sm space-y-4"
                    key={q.id}
                  >
                    <h5 className="font-bold">Question {index + 1}</h5>
                    <p className="p-3 border-2 border-border rounded-sm">
                      {q.question}
                    </p>
                    <div className="space-y-4">
                      {q.options.map((option, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
                          >
                            <input
                              type="radio"
                              name={q.id}
                              id={option}
                              value={index}
                              className="cursor-pointer"
                              required
                              disabled={isPending}
                            />
                            <label
                              htmlFor={option}
                              className="p-3 border-2 border-border rounded-sm w-full cursor-pointer hover:bg-input"
                            >
                              {option}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-4/5 bg-primary text-primary-foreground py-2 px-4 cursor-pointer rounded-sm hover:bg-primary/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
              <Link
                href={`/courses/${courseId}`}
                className="w-1/2 sm:w-1/5 text-center py-2 px-4 border-2 border-border cursor-pointer hover:bg-input transition-colors duration-200 rounded-sm"
              >
                Cancel
              </Link>
            </div>
          </form>
        </article>
      </div>

      {/* Quiz Results Popup */}
      {score !== null && (
        <QuizResults
          score={score}
          totalQuestions={course.quizzes.length}
          courseId={courseId}
          isOpen={showResults}
          onClose={handleRetakeQuiz}
          passingScore={3}
        />
      )}
    </>
  );
};

export default QuizContent;
