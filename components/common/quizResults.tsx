"use client";

import React from "react";
import Link from "next/link";

// icons
import { X, CheckCircle, XCircle } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
  passingScore?: number;
}

const QuizResults = ({
  score,
  totalQuestions,
  courseId,
  isOpen,
  onClose,
  passingScore = 3,
}: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = score >= passingScore;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 " +
          (isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none")
        }
      />

      {/* Popup */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background border-2 border-border rounded-sm shadow-lg w-full max-w-md transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-border">
          <h2 className="text-2xl font-bold">Quiz Results</h2>
          <button
            onClick={onClose}
            className="hover:bg-input transition-colors duration-200 p-2 rounded-sm cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Result Icon and Status */}
          <div className="flex flex-col items-center gap-4">
            {isPassed ? (
              <CheckCircle className="text-green-500" size={64} />
            ) : (
              <XCircle className="text-red-500" size={64} />
            )}
            <h3 className="text-2xl font-bold">
              {isPassed ? "Congratulations!" : "Try Again"}
            </h3>
          </div>

          {/* Score Display */}
          <div className="bg-input rounded-sm p-4 text-center space-y-2">
            <p className="text-sm text-muted-foreground">Your Score</p>
            <p className="text-4xl font-bold text-primary">
              {score}/{totalQuestions}
            </p>
            <p className="text-lg text-foreground">{percentage}%</p>
          </div>

          {/* Status Message */}
          <div className="text-center">
            <p className="text-muted-foreground">
              {isPassed
                ? `You passed! You answered ${score} out of ${totalQuestions} questions correctly.`
                : `You need to score at least ${passingScore}/${totalQuestions} to pass. You got ${score}/${totalQuestions}. Please try again!`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <button
              onClick={onClose}
              className="flex-1 bg-primary text-primary-foreground py-2 px-4 cursor-pointer rounded-sm hover:bg-primary/80 transition-colors duration-200 font-semibold"
            >
              Retake Quiz
            </button>
            <Link
              href={`/courses/${courseId}`}
              className="flex-1 text-center py-2 px-4 border-2 border-border cursor-pointer hover:bg-input transition-colors duration-200 rounded-sm font-semibold"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResults;
