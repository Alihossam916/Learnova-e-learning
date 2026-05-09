"use server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  enrolledCourses?: string[];
  createdCourses?: string[];
}

export async function signUp(formData: FormData) {
  const { firstName, lastName, email, password, role } = formData;
  const cookieStore = await cookies();

  //   hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: uuidv4(),
    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
    email,
    password: hashedPassword,
    role,
  };
  newUser.enrolledCourses = [];

  if (role == "teach") {
    newUser.createdCourses = [];
  }

  // Retrieve existing users from cookies, or initialize an empty array if none exist
  const existingUsers = cookieStore.get("users");
  const users = existingUsers ? JSON.parse(existingUsers.value) : [];

  // Check if email already exists
  if (users.find((u: { email: string }) => u.email === email)) {
    return { success: false, error: "Email already exists. Please sign in." };
  }
  // Add the new user to the users array and store it back in cookies
  users.push(newUser);

  cookieStore.set("users", JSON.stringify(users), {
    httpOnly: true,
    secure: true,
  });
  await createSession(newUser);
  return { success: true };
}

export async function signIn(email: string, password: string) {
  const cookieStore = await cookies();
  const existingUsers = cookieStore.get("users");
  const users = existingUsers ? JSON.parse(existingUsers.value) : [];

  const user = users.find((u: { email: string }) => u.email === email);
  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { success: false, error: "Invalid email or password." };
  }

  await createSession(user);
  return { success: true };
}

async function createSession(user: User) {
  const expiresIn = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const cookieStore = await cookies();
  // Create a session for the logged-in user
  const sessionToken = uuidv4();
  const session = [];

  session.push({
    id: sessionToken,
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: new Date(),
    enrolledCourses: user.enrolledCourses,
  });

  // Store session in httpOnly cookie
  cookieStore.set("sessionToken", sessionToken, {
    expires: expiresIn,
    httpOnly: true,
    secure: true,
  });

  cookieStore.set("sessions", JSON.stringify(session), {
    expires: expiresIn,
    httpOnly: true,
    secure: true,
  });
}

// Get current user session
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  if (!sessionToken) return null;

  const sessions = cookieStore.get("sessions");
  if (!sessions) return null;

  const session = sessions ? JSON.parse(sessions.value) : [];

  return session[0] || null;
}

// Logout
export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("sessionToken");
  cookieStore.delete("sessions");
  return { success: true };
}

// Update user profile
export async function updateProfile(formData: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}) {
  const expiresIn = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) return { success: false, error: "Not authenticated" };

  const sessions = cookieStore.get("sessions");
  const session = sessions ? JSON.parse(sessions.value) : [];

  // Update session data
  session[0] = {
    ...session[0],
    firstName:
      formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1),
    lastName:
      formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1),
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
    allUsers[userIndex] = {
      ...allUsers[userIndex],
      firstName:
        formData.firstName.charAt(0).toUpperCase() +
        formData.firstName.slice(1),
      lastName:
        formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1),
    };

    cookieStore.set("users", JSON.stringify(allUsers), {
      httpOnly: true,
      secure: true,
    });
  }

  return { success: true };
}
