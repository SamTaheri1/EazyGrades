// Accept compact, spaced and hyphenated codes, as well as course-title searches.
export function matchesCourse(course, query) {
  const normalize = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const search = normalize(query);
  return normalize(course.code).includes(search) || normalize(course.title).includes(search);
}
