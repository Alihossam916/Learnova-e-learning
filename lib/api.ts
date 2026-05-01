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

export async function getCourseById(courseId: string | string[]) {
  try {
    // Handle undefined or null
    if (!courseId) {
      return [];
    }

    // Handle single ID
    if (typeof courseId === "string") {
      const response = await fetch(
        `https://mock.apidog.com/m1/1228540-1224801-default/courses?id=${courseId}`,
        { next: { revalidate: 60 } },
      );
      return await response.json();
    }

    // Handle array of IDs - fetch each course individually in parallel
    const courses = await Promise.all(
      courseId.map((id) =>
        fetch(
          `https://mock.apidog.com/m1/1228540-1224801-default/courses?id=${id}`,
          { next: { revalidate: 60 } },
        ).then((res) => res.json()),
      ),
    );

    // Flatten and filter out empty responses
    return courses
      .flat()
      .filter((course) => course && Object.keys(course).length > 0);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}
