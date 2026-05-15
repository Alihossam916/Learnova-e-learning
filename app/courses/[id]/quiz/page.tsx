import { redirect } from "next/navigation";

// lib
import { getCurrentUser } from "@/lib/auth";
import { getCourseById } from "@/lib/api";

// components
import QuizContent from "@/components/common/quizContent";

interface QuizProps {
  params: Promise<{ id: string }>;
}

type quiz = {
  id: string;
  question: string;
  options: string[];
  correctIndex: string;
};

const Quiz = async ({ params }: QuizProps) => {
  const { id } = await params;
  const course = await getCourseById(id);
  const user = await getCurrentUser();

  // redirects to login if the user is not logged in
  if (!user) {
    redirect("/auth/login");
  }

  async function submitQuiz(formData: FormData) {
    "use server";
    // Extract all form data
    const answers = Object.fromEntries(formData);
    let score = 0;
    Object.entries(answers).forEach(([questionId, selectedIndex]) => {
      course.quizzes.map((quiz: quiz) => {
        if (quiz.id == questionId) {
          if (quiz.correctIndex == selectedIndex) {
            score++;
          }
        }
      });
    });

    redirect(`/courses/${id}/quiz?score=${score}`);
  }

  return (
    <QuizContent course={course} courseId={id} submitQuizAction={submitQuiz} />
  );
};

export default Quiz;
