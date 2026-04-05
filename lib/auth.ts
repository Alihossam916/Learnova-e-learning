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
}

const expiresIn = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

export async function signUp(formData: FormData) {
  const { firstName, lastName, email, password, role } = formData;
  const cookieStore = await cookies();

  //   hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  };

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
  return { success: true};
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
  const cookieStore = await cookies();
  // Create a session for the logged-in user
  const sessionToken = uuidv4();
  const sessions = cookieStore.get("sessions");
  const allSessions = sessions ? JSON.parse(sessions.value) : [];

  allSessions.push({
    id: sessionToken,
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: new Date(),
  });

  // Store session in httpOnly cookie
  cookieStore.set("sessionToken", sessionToken, {
    expires: expiresIn,
    httpOnly: true,
    secure: true,
  });

  cookieStore.set("sessions", JSON.stringify(allSessions), {
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
  const allSessions = sessions ? JSON.parse(sessions.value) : [];

  const session = allSessions.find(
    (s: { id: string }) => s.id === sessionToken,
  );
  return session || null;
}

// Logout
export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("sessionToken");
  cookieStore.delete("sessions");
  return { success: true };
}
