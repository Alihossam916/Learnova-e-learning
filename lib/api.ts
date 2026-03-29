export async function getCourses() {
  try {
    const response = await fetch(
      "https://mock.apidog.com/m1/1228540-1224801-default/courses",
      { next: { revalidate: 60 } },
    );
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export async function getCourseById(courseId: string) {
  const response = await fetch(
    `https://mock.apidog.com/m1/1228540-1224801-default/courses?id=${courseId}`,
    { next: { revalidate: 60 } },
  );
  return await response.json();
}
