// Exact field memberships from the supplied eng_list.md; common courses belong to every field.
export const commonCourseIds = ["engr-213","engr-233","engr-371"];
export const tracks = [
  {
    "id": "software-engineering",
    "name": "Software Engineering",
    "courseIds": [
      "comp-352",
      "comp-346",
      "engr-233",
      "elec-275",
      "soen-331",
      "comp-249",
      "engr-213",
      "engr-371"
    ]
  },
  {
    "id": "computer-engineering",
    "name": "Computer Engineering",
    "courseIds": [
      "coen-352",
      "coen-346",
      "elec-273",
      "elec-342",
      "coen-311",
      "engr-233",
      "engr-213",
      "engr-371"
    ]
  },
  {
    "id": "electrical-engineering",
    "name": "Electrical Engineering",
    "courseIds": [
      "elec-342",
      "elec-372",
      "elec-331",
      "elec-311",
      "elec-251",
      "coen-352",
      "engr-213",
      "engr-233",
      "engr-371"
    ]
  },
  {
    "id": "mechanical-engineering",
    "name": "Mechanical Engineering",
    "courseIds": [
      "engr-244",
      "engr-361",
      "mech-352",
      "mech-371",
      "mech-343",
      "mech-351",
      "engr-213",
      "engr-233",
      "engr-371"
    ]
  },
  {
    "id": "civil-building-engineering",
    "name": "Civil & Building Engineering",
    "courseIds": [
      "engr-244",
      "bcee-342",
      "bcee-344",
      "bcee-345",
      "civi-381",
      "bcee-432",
      "engr-213",
      "engr-233",
      "engr-371"
    ]
  },
  {
    "id": "aerospace-engineering",
    "name": "Aerospace Engineering",
    "courseIds": [
      "aero-371",
      "engr-361",
      "mech-352",
      "mech-361",
      "aero-464",
      "aero-455",
      "engr-213",
      "engr-233",
      "engr-371"
    ]
  },
  {
    "id": "industrial-engineering",
    "name": "Industrial Engineering",
    "courseIds": [
      "indu-323",
      "indu-324",
      "indu-311",
      "indu-371",
      "indu-372",
      "indu-423",
      "engr-213",
      "engr-233",
      "engr-371"
    ]
  }
];
export const tracksForCourse = course => tracks.filter(track => track.courseIds.includes(course.id)).map(track => track.id);
export const courseInTrack = (course, trackId) => Boolean(trackId) && tracksForCourse(course).includes(trackId);
