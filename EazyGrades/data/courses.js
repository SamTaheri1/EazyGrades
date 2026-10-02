const note = "Each PDF contains 8 multiple choice questions, 6 true or false questions, and 10 long answer questions. An answer guidance is provided at the end of each PDF. Selected topics only; not a full-length exam or complete syllabus coverage.";
// Catalog restricted to the supplied engineering list. Memberships live in config/tracks.js.
const courses = [
  {
    "id": "comp-232",
    "code": "COMP 232",
    "title": "Mathematics for Computer Science",
    "category": "Software Engineering",
    "description": "Sets, logic, functions, relations, number theory, and proof techniques.",
    "credits": 3,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3529",
    "metadataVerifiedAt": "2026-10-02",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "comp-352",
    "code": "COMP 352",
    "title": "Data Structures and Algorithms",
    "category": "Software Engineering",
    "description": "Data structures, searching, sorting, graphs, and complexity.",
    "credits": 3,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3565",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "comp-346",
    "code": "COMP 346",
    "title": "Operating Systems",
    "category": "Software Engineering",
    "description": "Scheduling, concurrency, virtual memory, and file systems.",
    "credits": 4,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3556",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "engr-233",
    "code": "ENGR 233",
    "title": "Applied Advanced Calculus",
    "category": "Engineering Core",
    "description": "Multivariable derivatives, multiple integrals, and vector calculus.",
    "credits": 3,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3531",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "elec-275",
    "code": "ELEC 275",
    "title": "Principles of Electrical Engineering",
    "description": "Core and Advanced practice for Principles of Electrical Engineering. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/electrical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Software Engineering"
  },
  {
    "id": "soen-331",
    "code": "SOEN 331",
    "title": "Formal Methods for Software Engineering",
    "category": "Software Engineering",
    "description": "Contracts, invariants, temporal properties, and state-based specifications.",
    "credits": 3,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3695",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "comp-249",
    "code": "COMP 249",
    "title": "Object-Oriented Programming II",
    "category": "Software Engineering",
    "description": "Inheritance, polymorphism, exceptions, generics, and linked structures.",
    "credits": 3.5,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3538",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "engr-213",
    "code": "ENGR 213",
    "title": "Applied Ordinary Differential Equations",
    "category": "Engineering Core",
    "description": "Ordinary differential equations, initial values, and linear systems.",
    "credits": 3,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3530",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "engr-371",
    "code": "ENGR 371",
    "title": "Probability and Statistics in Engineering",
    "category": "Engineering Core",
    "description": "Probability models, estimation, and hypothesis testing.",
    "credits": 3,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3548",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "coen-352",
    "code": "COEN 352",
    "title": "Data Structures and Algorithms",
    "description": "Core and Advanced practice for Data Structures and Algorithms. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/computer-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Computer Engineering"
  },
  {
    "id": "coen-346",
    "code": "COEN 346",
    "title": "Operating Systems",
    "description": "Core and Advanced practice for Operating Systems. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/computer-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Computer Engineering"
  },
  {
    "id": "elec-273",
    "code": "ELEC 273",
    "title": "Basic Circuit Analysis",
    "description": "Core and Advanced practice for Basic Circuit Analysis. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/electrical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Computer Engineering"
  },
  {
    "id": "elec-342",
    "code": "ELEC 342",
    "title": "Discrete-Time Signals and Systems",
    "description": "Core and Advanced practice for Discrete-Time Signals and Systems. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/electrical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Computer Engineering"
  },
  {
    "id": "coen-311",
    "code": "COEN 311",
    "title": "Computer Organization and Software",
    "description": "Core and Advanced practice for Computer Organization and Software. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/computer-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Computer Engineering"
  },
  {
    "id": "elec-372",
    "code": "ELEC 372",
    "title": "Fundamentals of Control Systems",
    "description": "Core and Advanced practice for Fundamentals of Control Systems. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/electrical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Electrical Engineering"
  },
  {
    "id": "elec-331",
    "code": "ELEC 331",
    "title": "Fundamentals of Electrical Power Engineering",
    "description": "Core and Advanced practice for Fundamentals of Electrical Power Engineering. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/electrical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Electrical Engineering"
  },
  {
    "id": "elec-311",
    "code": "ELEC 311",
    "title": "Electronics I",
    "description": "Core and Advanced practice for Electronics I. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/electrical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Electrical Engineering"
  },
  {
    "id": "elec-251",
    "code": "ELEC 251",
    "title": "Fundamentals of Applied Electromagnetics",
    "description": "Core and Advanced practice for Fundamentals of Applied Electromagnetics. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/electrical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Electrical Engineering"
  },
  {
    "id": "engr-244",
    "code": "ENGR 244",
    "title": "Mechanics of Materials",
    "category": "Mechanical Engineering",
    "description": "Stress, strain, bending, torsion, and elastic stability.",
    "credits": 3.75,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3536",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "engr-361",
    "code": "ENGR 361",
    "title": "Fluid Mechanics I",
    "category": "Mechanical Engineering",
    "description": "Fluid statics, conservation laws, pipe flow, and dimensional analysis.",
    "credits": 3,
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3547",
    "metadataVerifiedAt": "2026-09-12",
    "practiceKind": "mock",
    coverageNote: note,
    "published": true,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ]
  },
  {
    "id": "mech-352",
    "code": "MECH 352",
    "title": "Heat Transfer I",
    "description": "Core and Advanced practice for Heat Transfer I. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/mechanical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Mechanical Engineering"
  },
  {
    "id": "mech-371",
    "code": "MECH 371",
    "title": "Analysis and Design of Control Systems",
    "description": "Core and Advanced practice for Analysis and Design of Control Systems. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/mechanical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Mechanical Engineering"
  },
  {
    "id": "mech-343",
    "code": "MECH 343",
    "title": "Theory of Machines",
    "description": "Core and Advanced practice for Theory of Machines. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/mechanical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Mechanical Engineering"
  },
  {
    "id": "mech-351",
    "code": "MECH 351",
    "title": "Thermodynamics II",
    "description": "Core and Advanced practice for Thermodynamics II. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/mechanical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Mechanical Engineering"
  },
  {
    "id": "bcee-342",
    "code": "BCEE 342",
    "title": "Structural Analysis I",
    "description": "Core and Advanced practice for Structural Analysis I. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/building-civil-and-environmental-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Civil & Building Engineering"
  },
  {
    "id": "bcee-344",
    "code": "BCEE 344",
    "title": "Structural Design of Steel and Wood Elements",
    "description": "Core and Advanced practice for Structural Design of Steel and Wood Elements. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/building-civil-and-environmental-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Civil & Building Engineering"
  },
  {
    "id": "bcee-345",
    "code": "BCEE 345",
    "title": "Structural Design of Reinforced Concrete Elements",
    "description": "Core and Advanced practice for Structural Design of Reinforced Concrete Elements. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/building-civil-and-environmental-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Civil & Building Engineering"
  },
  {
    "id": "civi-381",
    "code": "CIVI 381",
    "title": "Hydraulics",
    "description": "Core and Advanced practice for Hydraulics. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/civil-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Civil & Building Engineering"
  },
  {
    "id": "bcee-432",
    "code": "BCEE 432",
    "title": "Soil Mechanics",
    "description": "Core and Advanced practice for Soil Mechanics. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/building-civil-and-environmental-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Civil & Building Engineering"
  },
  {
    "id": "aero-371",
    "code": "AERO 371",
    "title": "Modelling and Control Systems",
    "description": "Core and Advanced practice for Modelling and Control Systems. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/aerospace-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Aerospace Engineering"
  },
  {
    "id": "mech-361",
    "code": "MECH 361",
    "title": "Fluid Mechanics II",
    "description": "Core and Advanced practice for Fluid Mechanics II. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/mechanical-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Aerospace Engineering"
  },
  {
    "id": "aero-464",
    "code": "AERO 464",
    "title": "Aerodynamics",
    "description": "Core and Advanced practice for Aerodynamics. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/aerospace-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Aerospace Engineering"
  },
  {
    "id": "aero-455",
    "code": "AERO 455",
    "title": "Computational Fluid Dynamics for Aerospace Applications",
    "description": "Core and Advanced practice for Computational Fluid Dynamics for Aerospace Applications. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/aerospace-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Aerospace Engineering"
  },
  {
    "id": "indu-323",
    "code": "INDU 323",
    "title": "Operations Research I",
    "description": "Core and Advanced practice for Operations Research I. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/industrial-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Industrial Engineering"
  },
  {
    "id": "indu-324",
    "code": "INDU 324",
    "title": "Operations Research II",
    "description": "Core and Advanced practice for Operations Research II. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/industrial-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Industrial Engineering"
  },
  {
    "id": "indu-311",
    "code": "INDU 311",
    "title": "Simulation of Industrial Systems",
    "description": "Core and Advanced practice for Simulation of Industrial Systems. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/industrial-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Industrial Engineering"
  },
  {
    "id": "indu-371",
    "code": "INDU 371",
    "title": "Stochastic Models in Industrial Engineering",
    "description": "Core and Advanced practice for Stochastic Models in Industrial Engineering. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/industrial-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Industrial Engineering"
  },
  {
    "id": "indu-372",
    "code": "INDU 372",
    "title": "Quality Control and Reliability",
    "description": "Core and Advanced practice for Quality Control and Reliability. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/industrial-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Industrial Engineering"
  },
  {
    "id": "indu-423",
    "code": "INDU 423",
    "title": "Inventory Control",
    "description": "Core and Advanced practice for Inventory Control. Topic coverage will be confirmed before release.",
    "sourceUrl": "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/industrial-engineering-courses.html",
    "metadataVerifiedAt": "2026-09-29",
    "practiceKind": "mock",
    coverageNote: note,
    "published": false,
    "products": [
      {
        "id": "core",
        "title": "Core Exam Practice"
      },
      {
        "id": "advanced",
        "title": "Advanced Exam Practice"
      }
    ],
    "category": "Industrial Engineering"
  }
];
export default courses;
