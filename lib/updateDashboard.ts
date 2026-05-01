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
  const allSessions = sessions ? JSON.parse(sessions.value) : [];

  const sessionIndex = allSessions.findIndex(
    (s: { id: string }) => s.id === sessionToken,
  );

  if (sessionIndex === -1)
    return { success: false, error: "Session not found" };

  // Update session data
  allSessions[sessionIndex] = {
    ...allSessions[sessionIndex],
    enrolledCourses: [course.id],
  };

  cookieStore.set("sessions", JSON.stringify(allSessions), {
    expires: expiresIn,
    httpOnly: true,
    secure: true,
  });

  // Update user data in users array
  const users = cookieStore.get("users");
  const allUsers = users ? JSON.parse(users.value) : [];

  const userIndex = allUsers.findIndex(
    (u: { id: string }) => u.id === allSessions[sessionIndex].userId,
  );

  if (userIndex !== -1) {
    allUsers[userIndex] = {
      ...allUsers[userIndex],
      enrolledCourses: [course.id],
    };

    cookieStore.set("users", JSON.stringify(allUsers), {
      httpOnly: true,
      secure: true,
    });
  }

  return { success: true };
}
