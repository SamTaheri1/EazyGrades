// Program Packs contain program-specific courses only. Engineering Core is sold separately.
export const commonCourseIds = ["engr-213","engr-233","engr-371"];
export const tracks = [
  {
    "id": "software-engineering",
    "name": "Software Engineering",
    "courseIds": [
      "comp-232",
      "comp-352",
      "comp-346",
      "elec-275",
      "soen-331",
      "comp-249"
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
      "coen-311"
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
      "coen-352"
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
      "mech-351"
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
      "bcee-432"
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
      "aero-455"
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
      "indu-423"
    ]
  }
];
export const tracksForCourse = course => tracks.filter(track => track.courseIds.includes(course.id)).map(track => track.id);
export const courseInTrack = (course, trackId) => Boolean(trackId) && tracksForCourse(course).includes(trackId);

export const isCommonCourse = course => commonCourseIds.includes(course.id);
export const courseGroups = [{id:"engineering-core",name:"Engineering Core",courseIds:commonCourseIds},...tracks];
export const courseInGroup = (course, groupId) => groupId === "engineering-core" ? isCommonCourse(course) : courseInTrack(course, groupId);
