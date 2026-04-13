export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: string;
  duration: string;
  price: number;
  language: string;
  instructor: string;
  imageUrl: string;
  category: string;
  tags: string[];
  quizzes: object[];
}

export const normalizeCategory = (value: string) =>
  decodeURIComponent(value).trim().toLowerCase().replace(/[-_\s]+/g, " ");

export function filterCourses(
  courses: Course[],
  category: string,
  search: string
): Course[] {
  const normalizedCategory = normalizeCategory(category);

  return courses.filter((course) => {
    const matchesCategory =
      normalizedCategory === "all" ||
      course.category.toLowerCase() === normalizedCategory;

    const matchesSearch =
      search === "" ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}