"use server";
import { cookies } from "next/headers";

// types
import { Course } from "./filterCourses";

export async function updateUserDashboard(course: Course) {
  const expiresIn = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) return { success: false, error: "Not authenticated" };

  const sessions = cookieStore.get("sessions");
  const session = sessions ? JSON.parse(sessions.value) : [];

  // Update session data
  const currentEnrolled = session[0].enrolledCourses || [];
  session[0] = {
    ...session[0],
    enrolledCourses: [...currentEnrolled, course.id],
  };

  cookieStore.set("sessions", JSON.stringify(session), {
    expires: expiresIn,
    httpOnly: true,
    secure: true,
  });

  // Update user data in users array
  const users = cookieStore.get("users");
  const allUsers = users ? JSON.parse(users.value) : [];

  const userIndex = allUsers.findIndex(
    (u: { id: string }) => u.id === session[0].userId,
  );

  if (userIndex !== -1) {
    const currentUserEnrolled = allUsers[userIndex].enrolledCourses || [];
    allUsers[userIndex] = {
      ...allUsers[userIndex],
      enrolledCourses: [...currentUserEnrolled, course.id],
    };

    cookieStore.set("users", JSON.stringify(allUsers), {
      httpOnly: true,
      secure: true,
    });
  }

  return { success: true };
}
