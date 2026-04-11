import { describe, test, expect, beforeEach } from "@jest/globals";

// Use require() — NOT jest.requireMock() — so we get the exact same module
// instance that auth.ts imports. jest.requireMock() loads a second instance
// with its own separate fakeCookies, which is why writes from auth.ts were invisible.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getFakeCookies, clearFakeCookies } = require("next/headers");

import { signUp, signIn, signOut, getCurrentUser } from "../auth";

beforeEach(() => {
  clearFakeCookies();
});

// ─── signUp ───────────────────────────────────────────────────────────────────
describe("signUp", () => {
  const newUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john@test.com",
    password: "123456",
    role: "learn",
  };

  test("successfully signs up a new user and stores them in cookies", async () => {
    const result = await signUp(newUser);
    const fakeCookies = getFakeCookies();

    expect(result.success).toBe(true);
    expect(fakeCookies["users"]).toBeDefined();

    const storedUsers = JSON.parse(fakeCookies["users"]);
    expect(storedUsers).toHaveLength(1);
    expect(storedUsers[0].email).toBe("john@test.com");
    expect(storedUsers[0].firstName).toBe("John");
  });

  test("hashes the password before storing", async () => {
    await signUp(newUser);
    const fakeCookies = getFakeCookies();

    const storedUsers = JSON.parse(fakeCookies["users"]);
    // Password must not be stored as plain text
    expect(storedUsers[0].password).not.toBe("123456");
    // Password must look like a bcrypt hash (starts with $2b$)
    expect(storedUsers[0].password).toMatch(/^\$2b\$/);
  });

  test("creates a session after sign up", async () => {
    await signUp(newUser);
    const fakeCookies = getFakeCookies();

    expect(fakeCookies["sessionToken"]).toBeDefined();
    expect(fakeCookies["sessions"]).toBeDefined();

    const sessions = JSON.parse(fakeCookies["sessions"]);
    expect(sessions[0].email).toBe("john@test.com");
  });

  test("rejects sign up if email already exists", async () => {
    await signUp(newUser);
    const result = await signUp(newUser);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Email already exists. Please sign in.");
  });

  test("stores the correct role for the user", async () => {
    await signUp({ ...newUser, role: "teach" });
    const fakeCookies = getFakeCookies();

    const storedUsers = JSON.parse(fakeCookies["users"]);
    expect(storedUsers[0].role).toBe("teach");
  });
});

// ─── signIn ───────────────────────────────────────────────────────────────────
describe("signIn", () => {
  beforeEach(async () => {
    await signUp({
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
      password: "123456",
      role: "learn",
    });
    const fakeCookies = getFakeCookies();
    delete fakeCookies["sessionToken"];
    delete fakeCookies["sessions"];
  });

  test("successfully signs in with correct credentials", async () => {
    const result = await signIn("john@test.com", "123456");
    const fakeCookies = getFakeCookies();

    expect(result.success).toBe(true);
    expect(fakeCookies["sessionToken"]).toBeDefined();
  });

  test("creates a session on successful sign in", async () => {
    await signIn("john@test.com", "123456");
    const fakeCookies = getFakeCookies();

    const sessions = JSON.parse(fakeCookies["sessions"]);
    expect(sessions[0].email).toBe("john@test.com");
    expect(sessions[0].firstName).toBe("John");
    expect(sessions[0].role).toBe("learn");
  });

  test("rejects sign in with wrong password", async () => {
    const result = await signIn("john@test.com", "wrongpassword");
    const fakeCookies = getFakeCookies();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid email or password.");
    expect(fakeCookies["sessionToken"]).toBeUndefined();
  });

  test("rejects sign in with non-existent email", async () => {
    const result = await signIn("nobody@test.com", "123456");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid email or password.");
  });
});

// ─── getCurrentUser ───────────────────────────────────────────────────────────
describe("getCurrentUser", () => {
  test("returns null when no session exists", async () => {
    const user = await getCurrentUser();
    expect(user).toBeNull();
  });

  test("returns the current user after sign up", async () => {
    await signUp({
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
      password: "123456",
      role: "learn",
    });

    const user = await getCurrentUser();
    expect(user).not.toBeNull();
    expect(user.email).toBe("john@test.com");
    expect(user.firstName).toBe("John");
  });
});

// ─── signOut ──────────────────────────────────────────────────────────────────
describe("signOut", () => {
  test("clears session cookies on sign out", async () => {
    await signUp({
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
      password: "123456",
      role: "learn",
    });

    const fakeCookies = getFakeCookies();
    expect(fakeCookies["sessionToken"]).toBeDefined();

    await signOut();
    expect(fakeCookies["sessionToken"]).toBeUndefined();
    expect(fakeCookies["sessions"]).toBeUndefined();
  });

  test("returns success after sign out", async () => {
    const result = await signOut();
    expect(result.success).toBe(true);
  });
});