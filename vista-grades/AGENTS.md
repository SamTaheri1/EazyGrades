# VistaGrades Agent Instructions

## Project Purpose

VistaGrades is a student-focused website that sells AI-generated exam-style practice PDFs.

The website must stay simple, serious, professional, and easy to use.

## Product Rules

- VistaGrades sells digital PDF practice materials.
- Content is AI-generated and made for study support only.
- Do not claim the PDFs are official exams, past exams, or university-approved material.
- Do not guarantee grades, passing, academic results, or exam outcomes.
- Always make it clear that VistaGrades is not affiliated with or endorsed by any university.

## Pricing and Access Rules

- VistaGrades uses one-time payments only.
- A Single Course purchase costs $19.99 and gives access to one course.
- A Program Pack costs $24.99 and gives access to the program-specific courses shown for that program.
- There is no monthly subscription unless the user explicitly adds one later.
- A user can access a paid PDF only after buying the related Single Course or Program Pack.
- Paid access must be checked server-side before downloads are allowed.

## Engineering Core Courses

- ENGR 213, ENGR 233, and ENGR 371 are Engineering Core courses.
- Engineering Core is not an engineering program.
- Engineering Core courses are not included in any Program Pack.
- Engineering Core courses must be bought separately as Single Course purchases.
- They may appear as recommended add-ons for programs, but access still requires a separate purchase.

## Stripe Rules

- Use Stripe Checkout for payments.
- Use server-side checkout session creation.
- Never expose Stripe secret keys in frontend code.
- Store Stripe secrets and price IDs in environment variables.
- Never collect or store full card details.
- Do not trust frontend prices.
- Verify payment status server-side before unlocking access.

## PDF Security Rules

- Do not store paid PDFs in the public folder.
- Do not commit paid PDFs to the public repository.
- Do not expose direct PDF links in frontend code.
- Use protected download routes.
- Check user access before returning any PDF.
- Use signed temporary links or secure server-side delivery.

## Course Rules

- Focus on engineering-related courses.
- Do not add unrelated courses.
- Keep course data centralized when possible.
- Reuse overlapping courses instead of duplicating them unnecessarily.

## Website Copy Rules

Use clear, direct student-focused language.

Good style:
- Need one course? Buy it once.
- Need several program courses? Choose a Program Pack.
- AI-generated exam-style practice for focused revision.

Avoid:
- Guaranteed A+
- Official exam questions
- Past exam bank
- University approved
- Revolutionary AI platform
- Long generic marketing text

## Legal Pages

The website must include:
- Privacy Policy
- Terms and Conditions
- Refund Policy

These pages must explain:
- Products are digital.
- Content is AI-generated.
- VistaGrades does not guarantee academic results.
- VistaGrades is not affiliated with or endorsed by any university.
- Refunds are limited once access or download is provided.
- Single Course purchases and Program Packs are one-time payments.

## AI Content Disclaimer

Use this wording when needed:

VistaGrades creates AI-generated exam-style practice materials designed to support focused revision. The content should be used as practice support and may not always reflect every instructor, course section, or exam format.

## Design Rules

- Keep the design simple and professional.
- Use the dark VistaGrades theme.
- Main background color: #0A0F1C.
- Use readable text, clean spacing, and strong contrast.
- Avoid childish visuals, fake testimonials, and clutter.
- Keep pricing and course pages easy to understand.

## Code Rules

- Keep code simple and readable.
- Avoid unnecessary features.
- Avoid over-engineering.
- Reuse components where practical.
- Keep pricing values centralized.
- Keep course data centralized.
- Validate user input server-side.
- Add loading and error states.
- Keep the mobile layout clean.

## Before Finishing Any Task

- Remove conflicting old pricing text.
- Remove unrelated courses or fake content.
- Check that paid PDFs are not exposed publicly.
- Check that Stripe logic is server-side.
- Check that users understand what they get before paying.

## Preservation Rule

Do not rebuild the website from scratch unless the user explicitly asks for a full rebuild. Always inspect the existing code first, preserve working features and designs, and make the smallest safe change needed for the requested task.

## VistaGrades PDF requirements

Apply these rules whenever creating or editing an exam-practice PDF. They do not apply to ordinary website changes.

### Required content
- Use the requested course and title: Core Exam Practice or Advanced Exam Practice.
- Every exam must contain:
  - 8 multiple-choice questions
  - 6 true-or-false questions
  - 10 long-answer questions
  - An answer key
- Total: 24 questions worth exactly 120 points.
- Show question marks clearly and verify that they add up to 120.
- Keep answers consistent with the questions after every revision.
- Follow the supplied course outline and requested topic coverage.
- Advanced practice should require deeper reasoning and harder applications than Core practice.

### Format and typography
- Write every PDF in LaTeX.
- Match the latest user-approved PDF’s layout, typography, spacing, colours, headers, footers, and answer-space style.
- Refer to any similar documents in the folders for reference in style and formatting the each document appropriately, if necessary.
- Typeset every mathematical expression, variable, fraction, exponent, bound, interval, and recurrence in LaTeX math mode.
- Use actual superscripts and properly formatted fractions, Greek letters, logarithms, and floor/ceiling notation.
- Never display raw notation such as `n^2`, `Theta(n)`, or `floor((lo+hi)/2)` in ordinary prose.
- Make multiple-choice labels **A**, **B**, **C**, and **D** bold, with generous separation between choices.
- Provide clearly indented pseudocode when a question asks students to analyse a loop or algorithm.
- Leave sufficient working space, especially for drawing trees, diagrams, and multi-step solutions.
- For long-answer questions, do not write the words “Working Space”; leave the space blank.
- Keep headings with their content and prevent awkward wrapping, clipping, and overlapping text.
- Always start every page with a question (except for the first page which must introduce the course name and question types and numbers and points, as well as its terms and conditions briefly) and leave no page mostly blank only because of a couple of lines, stay efficient.
- There must be a reasonable and consistent line spacing throught each generated PDF (between titles and text, etc.). The header must appear on the first page of every PDF. It should be clean, professional, and consistent across all generated PDFs. Use the correct course code, course title, and practice type for each PDF.

### Wording
- Use “long-answer questions,” not “structured questions.”
- Use “Answer key included,” not “Worked solutions included.”
- Keep the cover and instructions concise.
- Avoid unnecessary page-by-page directions, detailed outline-location references, and repetitive explanations.
- Retain the approved educational disclaimer and copyright footer.
- Student email used for sign up on website must be included next to copyright.
- Do not claim that these are official exams or professor-provided questions.

### Verification
- Compile the LaTeX and inspect the rendered PDF before delivery.
- Check question counts, the 120-point total, answer correctness, mathematical notation, choice spacing, and page layout.
- Do not claim successful compilation or visual verification unless actually completed.

### Private delivery
- Never commit or push exam PDFs, rendered page images, private exam LaTeX sources, or scripts containing exam content to GitHub.
- Keep temporary generation files outside the repository and remove task-created temporary files after delivery is confirmed.
- Do not delete unrelated files or the only usable copy before confirming delivery.

### Update log
- Create or update `logs/pdf-updates.md` whenever a PDF changes.
- Record the course, PDF title, version, actual update date, verified page count, question count, total points, and private status.
- Summarize changes in short, natural bullet points.
- Do not include exam questions, answers, private download paths, or invented public-sample links in the log.
- Website-only changes do not require a PDF log entry.
- All generated PDFs must be saved in the pdf folder in Courses folder, given seperate access to (not in repo).

### Course Resources
- You have access to the “Courses” folder, provided separately from the GitHub repo. It contains course titles and course outline images for each engineering program. Each program has its own folder, and the image files inside each folder are named according to their corresponding course titles.
- You also have access to `eng_list.md`, which has info on courses offered for each program. In that file, the common courses shared between engineering programs are written in **bold**.
- Use only the course content sections from the outline images to create mock exam PDFs, by extracting all the text to read contents. These sections may be titled “Course Content,” “Schedule,” or something similar.
- Do not use irrelevant outline information such as grading breakdowns, dates, policies, instructor details, office hours, or administrative notes.
- The generated mock exam PDFs must follow exactly what is taught in the course content. Do not add topics that are not listed. If a course content section is too broad or unclear, more details will be provided in the prompt.
- Common course outlines are located in the “Engineering Core” folder for courses listed in the “Engineering Core” section of the website.
- Every generated PDF must stay consistent in design, structure, formatting, problem style, syntax, and solvability.

### Code Approval
- Do not commit to GitHub unless prompted.


Specific instructions from the user override these defaults.