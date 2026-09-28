// Track membership is explicit. A subscription includes only this category,
// never the entire catalog or another track's shared/core courses.
export const tracks = [
  {id: 'computer-science', name: 'Computer Science', category: 'Computer Science'},
  {id: 'software-engineering', name: 'Software Engineering', category: 'Software Engineering'},
  {id: 'engineering-core', name: 'Engineering Core', category: 'Engineering Core'},
];
export const trackForCourse = course => tracks.find(track => track.category === course.category)?.id ?? null;
