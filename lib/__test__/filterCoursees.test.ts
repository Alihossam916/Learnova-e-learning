import { describe, test, expect } from "@jest/globals";
import { filterCourses, normalizeCategory, Course } from "../filterCourses";

// ─── Mock course data ─────────────────────────────────────────────────────────
const mockCourses: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    slug: "react-for-beginners",
    description: "Learn the fundamentals of React including hooks and components",
    level: "beginner",
    duration: "10h",
    price: 49,
    language: "English",
    instructor: "John Doe",
    imageUrl: "/react.png",
    category: "web development",
    tags: ["react", "javascript"],
    quizzes: [],
  },
  {
    id: 2,
    title: "Advanced Node.js",
    slug: "advanced-nodejs",
    description: "Deep dive into Node.js APIs and backend architecture",
    level: "advanced",
    duration: "15h",
    price: 79,
    language: "English",
    instructor: "Jane Smith",
    imageUrl: "/node.png",
    category: "web development",
    tags: ["node", "backend"],
    quizzes: [],
  },
  {
    id: 3,
    title: "Python for Data Science",
    slug: "python-data-science",
    description: "Master data analysis and visualization with Python and pandas",
    level: "intermediate",
    duration: "20h",
    price: 99,
    language: "English",
    instructor: "Alice Johnson",
    imageUrl: "/python.png",
    category: "data science",
    tags: ["python", "data"],
    quizzes: [],
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    slug: "uiux-design",
    description: "Learn design principles, wireframing, and prototyping",
    level: "beginner",
    duration: "8h",
    price: 39,
    language: "English",
    instructor: "Bob Lee",
    imageUrl: "/design.png",
    category: "design",
    tags: ["design", "figma"],
    quizzes: [],
  },
  {
    id: 5,
    title: "React Native Mobile App",
    slug: "react-native",
    description: "Build cross-platform mobile apps with React Native",
    level: "intermediate",
    duration: "12h",
    price: 69,
    language: "English",
    instructor: "John Doe",
    imageUrl: "/mobile.png",
    category: "mobile development",
    tags: ["react-native", "mobile"],
    quizzes: [],
  },
];

// ─── normalizeCategory ────────────────────────────────────────────────────────
describe("normalizeCategory", () => {
  test("lowercases the value", () => {
    expect(normalizeCategory("Web Development")).toBe("web development");
  });

  test("trims whitespace", () => {
    expect(normalizeCategory("  design  ")).toBe("design");
  });

  test("replaces hyphens with spaces", () => {
    expect(normalizeCategory("web-development")).toBe("web development");
  });

  test("replaces underscores with spaces", () => {
    expect(normalizeCategory("data_science")).toBe("data science");
  });

  test("decodes URL-encoded characters", () => {
    expect(normalizeCategory("mobile%20development")).toBe("mobile development");
  });

  test("handles already normalized values", () => {
    expect(normalizeCategory("web development")).toBe("web development");
  });
  test("handles normal category names without modification", () => {
    expect(normalizeCategory("programming")).toBe("programming");
  });
});

// ─── filterCourses - category ─────────────────────────────────────────────────
describe("filterCourses — category", () => {
  test("returns all courses when category is 'all'", () => {
    const result = filterCourses(mockCourses, "all", "");
    expect(result).toHaveLength(5);
  });

  test("filters by exact category match", () => {
    const result = filterCourses(mockCourses, "design", "");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("UI/UX Design Fundamentals");
  });

  test("filters and returns multiple courses in the same category", () => {
    const result = filterCourses(mockCourses, "web development", "");
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.title)).toEqual([
      "React for Beginners",
      "Advanced Node.js",
    ]);
  });

  test("returns empty array when no courses match the category", () => {
    const result = filterCourses(mockCourses, "marketing", "");
    expect(result).toHaveLength(0);
  });

  test("category matching is case insensitive", () => {
    const result = filterCourses(mockCourses, "DATA SCIENCE", "");
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("data science");
  });

  test("normalizes hyphenated category from URL slug", () => {
    // URL slugs like /courses?category=web-development should match "web development"
    const result = filterCourses(mockCourses, "web-development", "");
    expect(result).toHaveLength(2);
  });
});

// ─── filterCourses - search ───────────────────────────────────────────────────
describe("filterCourses — search", () => {
  test("returns all courses when search is empty", () => {
    const result = filterCourses(mockCourses, "all", "");
    expect(result).toHaveLength(5);
  });

  test("filters by title match", () => {
    const result = filterCourses(mockCourses, "all", "React");
    expect(result).toHaveLength(2); // React for Beginners + React Native
    expect(result.map((c) => c.title)).toEqual([
      "React for Beginners",
      "React Native Mobile App",
    ]);
  });

  test("filters by description match", () => {
    const result = filterCourses(mockCourses, "all", "pandas");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Python for Data Science");
  });

  test("search is case insensitive", () => {
    const upperResult = filterCourses(mockCourses, "all", "REACT");
    const lowerResult = filterCourses(mockCourses, "all", "react");
    expect(upperResult).toHaveLength(lowerResult.length);
  });

  test("returns empty array when search matches nothing", () => {
    const result = filterCourses(mockCourses, "all", "kubernetes");
    expect(result).toHaveLength(0);
  });

  test("partial search term matches correctly", () => {
    const result = filterCourses(mockCourses, "all", "Node");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Advanced Node.js");
  });
});

// ─── filterCourses - combined ─────────────────────────────────────────────────
describe("filterCourses — category + search combined", () => {
  test("filters by both category and search together", () => {
    const result = filterCourses(mockCourses, "web development", "React");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("React for Beginners");
  });

  test("returns empty when search matches but category does not", () => {
    // "React Native" is in mobile development, not web development
    const result = filterCourses(mockCourses, "web development", "React Native");
    expect(result).toHaveLength(0);
  });

  test("returns empty when category matches but search does not", () => {
    const result = filterCourses(mockCourses, "design", "python");
    expect(result).toHaveLength(0);
  });

  test("'all' category with search returns matches across all categories", () => {
    const result = filterCourses(mockCourses, "all", "John Doe");
    // John Doe is instructor on 2 courses but search only checks title/description
    // so this should return 0 — instructor is not a search field
    expect(result).toHaveLength(0);
  });
});

// ─── edge cases ───────────────────────────────────────────────────────────────
describe("filterCourses — edge cases", () => {
  test("returns empty array when courses list is empty", () => {
    const result = filterCourses([], "all", "react");
    expect(result).toHaveLength(0);
  });

  test("handles whitespace-only search as empty search", () => {
    // "   " doesn't match any title or description so returns 0
    const result = filterCourses(mockCourses, "all", "   ");
    expect(result).toHaveLength(0);
  });
});