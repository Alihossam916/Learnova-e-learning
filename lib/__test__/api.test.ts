import { describe, test, expect } from "@jest/globals";
import { getCourseById } from "../api";

// ─── getCourseById ────────────────────────────────────────────────────────
describe("getCourseById", () => {
  test("returns empty array when id is undefined", async () => {
    expect(await getCourseById(undefined)).toEqual([]);
  });

  test("returns empty array when id is null", async () => {
    expect(await getCourseById(null)).toEqual([]);
  });

  test("returns id not found when there is no course with the same id", async () => {
    expect(await getCourseById("31")).toEqual({ error: "Course not found" });
  });

  test("returns single course when sending single id", async () => {
    expect(await getCourseById("1")).toEqual({
      id: 1,
      title: "React for Beginners",
      slug: "react-for-beginners",
      description:
        "Learn the basics of React by building a simple portfolio app. No prior experience required.",
      level: "beginner",
      duration: "6 weeks",
      price: 0,
      language: "en",
      instructor: "Ali Hossam",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      category: "web development",
      tags: ["react", "frontend", "javascript"],
      quizzes: [
        {
          id: "react-1-q1",
          question: "What is React primarily used for?",
          options: [
            "Building user interfaces",
            "Designing databases",
            "Creating operating systems",
            "Configuring networks",
          ],
          correctIndex: 0,
        },
        {
          id: "react-1-q2",
          question: "What is JSX in React?",
          options: [
            "A CSS framework",
            "A syntax extension for JavaScript",
            "A Node.js runtime",
            "A database driver",
          ],
          correctIndex: 1,
        },
        {
          id: "react-1-q3",
          question:
            "Which hook is used to create state in a function component?",
          options: ["useEffect", "useState", "useMemo", "useRef"],
          correctIndex: 1,
        },
        {
          id: "react-1-q4",
          question: "What do we typically pass into a React component?",
          options: ["Props", "Schemas", "Migrations", "Protocols"],
          correctIndex: 0,
        },
        {
          id: "react-1-q5",
          question:
            "Which command is commonly used to create a new React project?",
          options: [
            "npx create-react-app my-app",
            "npm new react my-app",
            "react init my-app",
            "npm create my-app",
          ],
          correctIndex: 0,
        },
      ],
    });
  });

  test("returns multiple courses when multiple ids sent", async () => {
    expect(await getCourseById(["1", "2", "3"])).toEqual([
      {
        id: 1,
        title: "React for Beginners",
        slug: "react-for-beginners",
        description:
          "Learn the basics of React by building a simple portfolio app. No prior experience required.",
        level: "beginner",
        duration: "6 weeks",
        price: 0,
        language: "en",
        instructor: "Ali Hossam",
        imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475",
        category: "web development",
        tags: ["react", "frontend", "javascript"],
        quizzes: [
          {
            id: "react-1-q1",
            question: "What is React primarily used for?",
            options: [
              "Building user interfaces",
              "Designing databases",
              "Creating operating systems",
              "Configuring networks",
            ],
            correctIndex: 0,
          },
          {
            id: "react-1-q2",
            question: "What is JSX in React?",
            options: [
              "A CSS framework",
              "A syntax extension for JavaScript",
              "A Node.js runtime",
              "A database driver",
            ],
            correctIndex: 1,
          },
          {
            id: "react-1-q3",
            question:
              "Which hook is used to create state in a function component?",
            options: ["useEffect", "useState", "useMemo", "useRef"],
            correctIndex: 1,
          },
          {
            id: "react-1-q4",
            question: "What do we typically pass into a React component?",
            options: ["Props", "Schemas", "Migrations", "Protocols"],
            correctIndex: 0,
          },
          {
            id: "react-1-q5",
            question:
              "Which command is commonly used to create a new React project?",
            options: [
              "npx create-react-app my-app",
              "npm new react my-app",
              "react init my-app",
              "npm create my-app",
            ],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Next.js",
        slug: "advanced-nextjs",
        description:
          "Master routing, SSR, API routes, and deployment with Next.js by building a real e-learning app.",
        level: "advanced",
        duration: "8 weeks",
        price: 79.99,
        language: "en",
        instructor: "Sara Khalil",
        imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475",
        category: "web development",
        tags: ["nextjs", "ssr", "typescript"],
        quizzes: [
          {
            id: "next-2-q1",
            question: "Next.js is built on top of which library?",
            options: ["Vue", "React", "Angular", "Svelte"],
            correctIndex: 1,
          },
          {
            id: "next-2-q2",
            question:
              "Which feature allows you to pre-render a page on each request in Next.js?",
            options: [
              "Static Site Generation (SSG)",
              "Client-Side Rendering (CSR)",
              "Server-Side Rendering (SSR)",
              "Incremental Static Regeneration (ISR)",
            ],
            correctIndex: 2,
          },
          {
            id: "next-2-q3",
            question:
              "Where are API routes defined in the Pages Router for Next.js?",
            options: ["components/api", "pages/api", "lib/api", "public/api"],
            correctIndex: 1,
          },
          {
            id: "next-2-q4",
            question: "What does getStaticProps do?",
            options: [
              "Fetches data on every request",
              "Fetches data at build time",
              "Handles client-side routing",
              "Creates API endpoints",
            ],
            correctIndex: 1,
          },
          {
            id: "next-2-q5",
            question: "Which of these is a benefit of using Next.js?",
            options: [
              "Built-in SSR and SSG",
              "Replacing React completely",
              "Removing the need for routing",
              "Making CSS unnecessary",
            ],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 3,
        title: "UI Design for Web Developers",
        slug: "ui-design-for-web-devs",
        description:
          "Learn how to design clean, modern UIs that feel professional and user-friendly.",
        level: "intermediate",
        duration: "4 weeks",
        price: 59.99,
        language: "en",
        instructor: "Mona Ashraf",
        imageUrl:
          "https://images.unsplash.com/photo-1523475472560-d2df97ec485c",
        category: "design",
        tags: ["ui", "ux", "figma"],
        quizzes: [
          {
            id: "ui-3-q1",
            question:
              "Which principle focuses on keeping similar elements styled the same across the app?",
            options: ["Contrast", "Consistency", "Alignment", "Proximity"],
            correctIndex: 1,
          },
          {
            id: "ui-3-q2",
            question:
              "Which color combination is usually best for readability?",
            options: [
              "Light text on light background",
              "Dark text on light background",
              "Medium text on medium background",
              "Light text on bright background",
            ],
            correctIndex: 1,
          },
          {
            id: "ui-3-q3",
            question: "Which tool is commonly used for UI design?",
            options: ["Git", "Figma", "Postman", "Docker"],
            correctIndex: 1,
          },
          {
            id: "ui-3-q4",
            question: "What does visual hierarchy help the user do?",
            options: [
              "See all colors equally",
              "Understand which elements are most important",
              "Load pages faster",
              "Avoid scrolling",
            ],
            correctIndex: 1,
          },
          {
            id: "ui-3-q5",
            question: "Which spacing approach usually improves UI clarity?",
            options: [
              "No whitespace at all",
              "Very tight spacing everywhere",
              "Consistent spacing and padding",
              "Random spacing based on content length",
            ],
            correctIndex: 2,
          },
        ],
      },
    ]);
  });
});
