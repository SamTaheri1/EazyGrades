const note = "Each PDF contains 8 multiple choice questions, 6 true or false questions, and 10 long answer questions. An answer guidance is provided at the end of each PDF. Selected topics only; not a full-length exam or complete syllabus coverage.";
const courses = [
  
  {
    id: "comp-248",
    code: "COMP 248",
    title: "Object-Oriented Programming I",
    category: "Computer Science",
    description: "Classes, encapsulation, control flow, references, and arrays.",
    credits: 3.5,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3535",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-287",
    code: "SOEN 287",
    title: "Web Programming",
    category: "Software Engineering",
    description: "Semantic HTML, CSS, JavaScript, HTTP, and web application state.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3690",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-352",
    code: "COMP 352",
    title: "Data Structures and Algorithms",
    category: "Computer Science",
    description: "Data structures, searching, sorting, graphs, and complexity.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3565",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-108",
    code: "COMP 108",
    title: "Computer Science C.Edge Option Reflective Learning I",
    category: "Computer Science",
    description: "Structured reflection on first-placement learning and professional development.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3516",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "reflection",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-208",
    code: "COMP 208",
    title: "Computer Science C.Edge Option Reflective Learning II",
    category: "Computer Science",
    description: "Structured reflection on second-placement learning and professional development.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3517",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "reflection",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-218",
    code: "COMP 218",
    title: "Fundamentals of Programming",
    category: "Computer Science",
    description: "Programming fundamentals, functions, arrays, and simple objects.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3518",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-228",
    code: "COMP 228",
    title: "System Hardware",
    category: "Computer Science",
    description: "Digital logic, processor instructions, caches, and memory systems.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3527",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-232",
    code: "COMP 232",
    title: "Mathematics for Computer Science",
    category: "Computer Science",
    description: "Logic, sets, relations, number theory, and mathematical proofs.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3529",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-233",
    code: "COMP 233",
    title: "Probability and Statistics for Computer Science",
    category: "Computer Science",
    description: "Probability models, estimation, and hypothesis testing.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3532",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-249",
    code: "COMP 249",
    title: "Object-Oriented Programming II",
    category: "Computer Science",
    description: "Inheritance, polymorphism, exceptions, generics, and linked structures.",
    credits: 3.5,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3538",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-326",
    code: "COMP 326",
    title: "Computer Architecture",
    category: "Computer Science",
    description: "Pipelining, parallel architectures, locality, and cache coherence.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3543",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-333",
    code: "COMP 333",
    title: "Data Analytics",
    category: "Computer Science",
    description: "Data cleaning, exploratory analysis, and reproducible analytics.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3546",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-335",
    code: "COMP 335",
    title: "Introduction to Theoretical Computer Science",
    category: "Computer Science",
    description: "Automata, formal languages, parsing, and computability.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3549",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-339",
    code: "COMP 339",
    title: "Combinatorics",
    category: "Computer Science",
    description: "Counting methods, recurrences, graph theory, and matchings.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3551",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-345",
    code: "COMP 345",
    title: "Advanced Program Design with C++",
    category: "Computer Science",
    description: "C++ ownership, generic containers, object design, and exceptions.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3552",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-346",
    code: "COMP 346",
    title: "Operating Systems",
    category: "Computer Science",
    description: "Scheduling, concurrency, virtual memory, and file systems.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3556",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-348",
    code: "COMP 348",
    title: "Principles of Programming Languages",
    category: "Computer Science",
    description: "Programming paradigms, scope, binding, and type systems.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3563",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-353",
    code: "COMP 353",
    title: "Databases",
    category: "Computer Science",
    description: "Relational modelling, SQL, relational algebra, and database applications.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3567",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-354",
    code: "COMP 354",
    title: "Introduction to Software Engineering",
    category: "Computer Science",
    description: "Software lifecycles, requirements, traceability, and quality assurance.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3568",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-361",
    code: "COMP 361",
    title: "Elementary Numerical Methods",
    category: "Computer Science",
    description: "Numerical roots, linear systems, interpolation, integration, and error.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3569",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-367",
    code: "COMP 367",
    title: "Techniques in Symbolic Computation",
    category: "Computer Science",
    description: "Modular arithmetic, finite algebra, and symbolic computation.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3571",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-371",
    code: "COMP 371",
    title: "Computer Graphics",
    category: "Computer Science",
    description: "Geometric transforms, viewing, visibility, and illumination.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3572",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-376",
    code: "COMP 376",
    title: "Introduction to Game Development",
    category: "Computer Science",
    description: "Game loops, interaction, level design, and basic simulation.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3573",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-425",
    code: "COMP 425",
    title: "Computer Vision",
    category: "Computer Science",
    description: "Image formation, geometric estimation, and visual recognition.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3574",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-426",
    code: "COMP 426",
    title: "Multicore Programming",
    category: "Computer Science",
    description: "Shared-memory parallelism, multicore locality, and scalability.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3575",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-428",
    code: "COMP 428",
    title: "Parallel Programming",
    category: "Computer Science",
    description: "Message passing, decomposition, communication, and parallel cost.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3576",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-432",
    code: "COMP 432",
    title: "Machine Learning",
    category: "Computer Science",
    description: "Learning models, validation, classification, and generalization.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3577",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-433",
    code: "COMP 433",
    title: "Introduction to Deep Learning",
    category: "Computer Science",
    description: "Neural-network losses, gradients, regularization, and evaluation.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#40125",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-438",
    code: "COMP 438",
    title: "Geometric Modelling and Processing",
    category: "Computer Science",
    description: "Meshes, geometric processing, curves, and shape modelling.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#40145",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-442",
    code: "COMP 442",
    title: "Compiler Design",
    category: "Computer Science",
    description: "Lexing, parsing, intermediate representations, and optimization.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3578",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-444",
    code: "COMP 444",
    title: "System Software Design",
    category: "Computer Science",
    description: "Kernel interfaces, process management, memory, and system design.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3582",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-445",
    code: "COMP 445",
    title: "Data Communication and Computer Networks",
    category: "Computer Science",
    description: "Network protocols, reliability, routing, and communication performance.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3585",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-451",
    code: "COMP 451",
    title: "Database Design",
    category: "Computer Science",
    description: "Indexes, query plans, transactions, concurrency, and recovery.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3588",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-465",
    code: "COMP 465",
    title: "Design and Analysis of Algorithms",
    category: "Computer Science",
    description: "Algorithm design, dynamic programming, amortization, and hardness.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3595",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-472",
    code: "COMP 472",
    title: "Artificial Intelligence",
    category: "Computer Science",
    description: "Search, heuristics, game trees, planning, and AI foundations.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3599",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-473",
    code: "COMP 473",
    title: "Pattern Recognition",
    category: "Computer Science",
    description: "Features, distances, clustering, and statistical pattern decisions.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3600",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-474",
    code: "COMP 474",
    title: "Intelligent Systems",
    category: "Computer Science",
    description: "Knowledge representation, rules, agents, and explainable reasoning.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#19044",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-475",
    code: "COMP 475",
    title: "Immersive Technologies",
    category: "Computer Science",
    description: "Immersive interaction, 3D environments, and experience evaluation.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#21266",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-476",
    code: "COMP 476",
    title: "Advanced Game Development",
    category: "Computer Science",
    description: "Game AI, collision response, engine design, and networked simulation.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3606",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-477",
    code: "COMP 477",
    title: "Animation for Computer Games",
    category: "Computer Science",
    description: "Animation interpolation, articulated motion, and kinematics.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3610",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-478",
    code: "COMP 478",
    title: "Image Processing",
    category: "Computer Science",
    description: "Image transforms, filtering, restoration, and segmentation.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3613",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-479",
    code: "COMP 479",
    title: "Information Retrieval and Web Search",
    category: "Computer Science",
    description: "Inverted indexes, ranking, retrieval metrics, and web search.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3616",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-490",
    code: "COMP 490",
    title: "Computer Science Project I",
    category: "Computer Science",
    description: "Project and report practice covering search correctness and reproducible evaluation.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3621",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-492",
    code: "COMP 492",
    title: "Computer Science Project II",
    category: "Computer Science",
    description: "Project and report practice covering experimental comparison and technical reporting.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3625",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-493",
    code: "COMP 493",
    title: "Computational Biology Team Project",
    category: "Computer Science",
    description: "Project and report practice covering data provenance, sequence processing and reproducibility.",
    credits: 6,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#22184",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-495",
    code: "COMP 495",
    title: "Honours Seminar",
    category: "Computer Science",
    description: "Seminar analysis, research argumentation, and critical reporting.",
    credits: 1,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3631",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "seminar",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-498",
    code: "COMP 498",
    title: "Topics in Computer Science",
    category: "Computer Science",
    description: "Offering-specific topics; adaptable practice template requiring your syllabus.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3640",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "topic-template",
    coverageNote: note,
    published: false,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "comp-499",
    code: "COMP 499",
    title: "Topics in Computer Science with Lab",
    category: "Computer Science",
    description: "Offering-specific topics and lab work; adaptable practice template requiring your syllabus.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3644",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "topic-template",
    coverageNote: note,
    published: false,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-228",
    code: "SOEN 228",
    title: "System Hardware",
    category: "Software Engineering",
    description: "Digital logic, processor instructions, caches, and memory systems.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3645",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-298",
    code: "SOEN 298",
    title: "System Hardware Lab",
    category: "Software Engineering",
    description: "Digital hardware lab planning, truth tables, and fault diagnosis.",
    credits: 1,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3692",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "lab",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-321",
    code: "SOEN 321",
    title: "Information Systems Security",
    category: "Software Engineering",
    description: "Security properties, cryptographic mechanisms, and threat modelling.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3694",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-331",
    code: "SOEN 331",
    title: "Formal Methods for Software Engineering",
    category: "Software Engineering",
    description: "Contracts, invariants, temporal properties, and state-based specifications.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3695",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-341",
    code: "SOEN 341",
    title: "Software Process and Practices",
    category: "Software Engineering",
    description: "Team workflows, version control, review, testing, and continuous integration.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3697",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-342",
    code: "SOEN 342",
    title: "Software Requirements and Deployment",
    category: "Software Engineering",
    description: "Requirements elicitation, change analysis, deployment, and traceability.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3699",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-343",
    code: "SOEN 343",
    title: "Software Architecture and Design",
    category: "Software Engineering",
    description: "Design principles, UML, patterns, and refactoring.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3701",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-344",
    code: "SOEN 344",
    title: "Advanced Software Architecture and Design",
    category: "Software Engineering",
    description: "Architecture views, styles, quality tradeoffs, and performance evaluation.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3704",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-345",
    code: "SOEN 345",
    title: "Software Testing, Verification and Quality Assurance",
    category: "Software Engineering",
    description: "Test design, integration, dependency isolation, and quality verification.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3707",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-357",
    code: "SOEN 357",
    title: "User Interface Design",
    category: "Software Engineering",
    description: "User-centred design, prototyping, usability, and interface evaluation.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#24160",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-363",
    code: "SOEN 363",
    title: "Data Systems for Software Engineers",
    category: "Software Engineering",
    description: "Relational and nonrelational stores, distributed data, and streams.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3708",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-384",
    code: "SOEN 384",
    title: "Management, Measurement and Quality Control",
    category: "Software Engineering",
    description: "Project planning, measurement, risk, and software quality control.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3713",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-385",
    code: "SOEN 385",
    title: "Control Systems and Applications",
    category: "Software Engineering",
    description: "Dynamic models, feedback, stability, and controller design.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3715",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-387",
    code: "SOEN 387",
    title: "Web-Based Enterprise Application Design",
    category: "Software Engineering",
    description: "Layered web applications, HTTP, transactions, and authentication.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3717",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-390",
    code: "SOEN 390",
    title: "Software Engineering Team Design Project",
    category: "Software Engineering",
    description: "Project and report practice covering requirements, integration, tests and process evidence.",
    credits: 3.5,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3719",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-422",
    code: "SOEN 422",
    title: "Embedded Systems and Software",
    category: "Software Engineering",
    description: "Embedded interfaces, interrupts, conversion, timing, and control.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3721",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-423",
    code: "SOEN 423",
    title: "Distributed Systems",
    category: "Software Engineering",
    description: "Replication, distributed coordination, consistency, and fault tolerance.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3720",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-471",
    code: "SOEN 471",
    title: "Big Data Analytics",
    category: "Software Engineering",
    description: "Large-scale analytics, distributed processing, and data mining.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3726",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-487",
    code: "SOEN 487",
    title: "Web Services and Applications",
    category: "Software Engineering",
    description: "Service architectures, deployment, security, and load testing.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3729",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-490",
    code: "SOEN 490",
    title: "Capstone Software Engineering Design Project",
    category: "Software Engineering",
    description: "Project and report practice covering scope, architecture and individual contributions.",
    credits: 6,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3730",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-491",
    code: "SOEN 491",
    title: "Software Engineering Project",
    category: "Software Engineering",
    description: "Project and report practice covering method selection and defensible evaluation.",
    credits: 1,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3733",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-498",
    code: "SOEN 498",
    title: "Topics in Software Engineering",
    category: "Software Engineering",
    description: "Offering-specific topics; adaptable practice template requiring your syllabus.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3734",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "topic-template",
    coverageNote: note,
    published: false,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "soen-499",
    code: "SOEN 499",
    title: "Topics in Software Engineering with Lab",
    category: "Software Engineering",
    description: "Offering-specific topics and lab work; adaptable practice template requiring your syllabus.",
    credits: 4,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#3736",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "topic-template",
    coverageNote: note,
    published: false,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-108",
    code: "ENGR 108",
    title: "Engineering C.Edge Option Reflective Learning I",
    category: "Engineering Core",
    description: "Structured reflection on first-placement learning and professional development.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3524",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "reflection",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-201",
    code: "ENGR 201",
    title: "Professional Practice and Responsibility",
    category: "Engineering Core",
    description: "Professional responsibility, safety reasoning, and ethical decisions.",
    credits: 1.5,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3525",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-202",
    code: "ENGR 202",
    title: "Sustainable Development and Environmental Stewardship",
    category: "Engineering Core",
    description: "Sustainability assessment, environmental tradeoffs, and project decisions.",
    credits: 1.5,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3526",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-208",
    code: "ENGR 208",
    title: "Engineering C.Edge Option Reflective Learning II",
    category: "Engineering Core",
    description: "Structured reflection on second-placement learning and professional development.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3528",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "reflection",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-213",
    code: "ENGR 213",
    title: "Applied Ordinary Differential Equations",
    category: "Engineering Core",
    description: "Ordinary differential equations, initial values, and linear systems.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3530",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-233",
    code: "ENGR 233",
    title: "Applied Advanced Calculus",
    category: "Engineering Core",
    description: "Multivariable derivatives, multiple integrals, and vector calculus.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3531",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-242",
    code: "ENGR 242",
    title: "Statics",
    category: "Engineering Core",
    description: "Force equilibrium, moments, beams, and friction.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3533",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-243",
    code: "ENGR 243",
    title: "Dynamics",
    category: "Engineering Core",
    description: "Particle and rigid-body motion, energy, momentum, and vibrations.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3534",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-244",
    code: "ENGR 244",
    title: "Mechanics of Materials",
    category: "Engineering Core",
    description: "Stress, strain, bending, torsion, and elastic stability.",
    credits: 3.75,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3536",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-245",
    code: "ENGR 245",
    title: "Mechanical Analysis",
    category: "Engineering Core",
    description: "Free-body diagrams, rigid-body equilibrium, and motion analysis.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3537",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-251",
    code: "ENGR 251",
    title: "Thermodynamics I",
    category: "Engineering Core",
    description: "Energy balances, ideal-gas processes, and thermodynamic cycles.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3539",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-290",
    code: "ENGR 290",
    title: "Introductory Engineering Team Design Project",
    category: "Engineering Core",
    description: "Project and report practice covering interdisciplinary interfaces and prototype verification.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3540",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-301",
    code: "ENGR 301",
    title: "Engineering Management Principles and Economics",
    category: "Engineering Core",
    description: "Engineering economics, cash flows, project evaluation, and planning.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3542",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-308",
    code: "ENGR 308",
    title: "Engineering C.Edge Option Reflective Learning III",
    category: "Engineering Core",
    description: "Structured reflection on third-placement learning and professional development.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3544",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "reflection",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-311",
    code: "ENGR 311",
    title: "Transform Calculus and Partial Differential Equations",
    category: "Engineering Core",
    description: "Laplace transforms, Fourier series, and separated PDE solutions.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3545",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-361",
    code: "ENGR 361",
    title: "Fluid Mechanics I",
    category: "Engineering Core",
    description: "Fluid statics, conservation laws, pipe flow, and dimensional analysis.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3547",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-371",
    code: "ENGR 371",
    title: "Probability and Statistics in Engineering",
    category: "Engineering Core",
    description: "Probability models, estimation, and hypothesis testing.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3548",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-391",
    code: "ENGR 391",
    title: "Numerical Methods in Engineering",
    category: "Engineering Core",
    description: "Numerical roots, linear systems, interpolation, integration, and error.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3550",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-392",
    code: "ENGR 392",
    title: "Impact of Technology on Society",
    category: "Engineering Core",
    description: "Technology history, social impacts, and responsible evaluation.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3553",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-411",
    code: "ENGR 411",
    title: "Special Technical Report",
    category: "Engineering Core",
    description: "Project and report practice covering problem definition, evidence and report structure.",
    credits: 1,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3554",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-412",
    code: "ENGR 412",
    title: "Honours Research Project",
    category: "Engineering Core",
    description: "Project and report practice covering research question, method and uncertainty.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3555",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-472",
    code: "ENGR 472",
    title: "Robot Manipulators",
    category: "Engineering Core",
    description: "Robot kinematics, Jacobians, trajectories, and manipulator control.",
    credits: 3.5,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3557",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "mock",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-490",
    code: "ENGR 490",
    title: "Multidisciplinary Capstone Design Project",
    category: "Engineering Core",
    description: "Project and report practice covering discipline-specific goals and system integration.",
    credits: 6,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3558",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "project",
    coverageNote: note,
    published: true,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  },
  {
    id: "engr-498",
    code: "ENGR 498",
    title: "Topics in Engineering",
    category: "Engineering Core",
    description: "Offering-specific topics; adaptable practice template requiring your syllabus.",
    credits: 3,
    sourceUrl: "https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-60-engineering-course-descriptions/engineering-courses.html#3559",
    metadataVerifiedAt: "2026-09-12",
    practiceKind: "topic-template",
    coverageNote: note,
    published: false,
    products: [
      {
        id: "core",
        title: "Core Exam Practice"
      },
      {
        id: "advanced",
        title: "Advanced Exam Practice"
      }
    ]
  }
];

export default courses;
