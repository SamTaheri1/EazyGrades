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

- Users can buy individual PDFs as one-time purchases.
- Users may also subscribe for access to one selected engineering track.
- A subscription must not unlock every course unless explicitly coded as a full-access plan.
- A user can access a PDF only if they purchased it directly or their active subscription includes it.
- Paid access must be checked server-side before downloads are allowed.

## Common Core Courses

ENGR 213, ENGR 233, and ENGR 371 are common engineering core courses, under the title "Engineering Core" in the Courses section of the website.

They must be sold as separate one-time course bundles and must not be included automatically in any Premium program track.

Premium tracks should include only program-specific courses.

Common core courses may appear as recommended add-ons, but access requires a separate purchase.

## Stripe Rules

- Use Stripe Checkout for payments.
- Use server-side checkout session creation.
- Never expose Stripe secret keys in frontend code.
- Store Stripe secrets and price IDs in environment variables.
- Never collect or store full card details.
- Do not trust frontend prices.
- Verify payment or subscription status server-side before unlocking access.

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
- Need one PDF? Buy it once.
- Studying a full track? Choose a subscription.
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
- Canceling a subscription stops future renewals but does not automatically refund completed charges.

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
- Inspect that approved reference before generating a new document. If unavailable, ask for it rather than inventing a replacement format.
- Typeset every mathematical expression, variable, fraction, exponent, bound, interval, and recurrence in LaTeX math mode.
- Use actual superscripts and properly formatted fractions, Greek letters, logarithms, and floor/ceiling notation.
- Never display raw notation such as `n^2`, `Theta(n)`, or `floor((lo+hi)/2)` in ordinary prose.
- Make multiple-choice labels **A**, **B**, **C**, and **D** bold, with generous separation between choices.
- Provide clearly indented pseudocode when a question asks students to analyse a loop or algorithm.
- Leave sufficient working space, especially for drawing trees, diagrams, and multi-step solutions.
- Keep headings with their content and prevent awkward wrapping, clipping, and overlapping text.

### Wording
- Use “long-answer questions,” not “structured questions.”
- Use “Answer key included,” not “Worked solutions included.”
- Keep the cover and instructions concise.
- Avoid unnecessary page-by-page directions, detailed outline-location references, and repetitive explanations.
- Retain the approved educational disclaimer and copyright footer.
- Do not claim that these are official exams or professor-provided questions.

### Verification
- Compile the LaTeX and inspect the rendered PDF before delivery.
- Check question counts, the 120-point total, answer correctness, mathematical notation, choice spacing, and page layout.
- Do not claim successful compilation or visual verification unless actually completed.

### Private delivery
- Deliver exam PDFs in the conversation.
- Never commit or push exam PDFs, rendered page images, private exam LaTeX sources, or scripts containing exam content to GitHub.
- Keep temporary generation files outside the repository and remove task-created temporary files after delivery is confirmed.
- Do not delete unrelated files or the only usable copy before confirming delivery.

### Update log
- Create or update `logs/pdf-updates.md` whenever a PDF changes.
- Record the course, PDF title, version, actual update date, verified page count, question count, total points, and private status.
- Summarize changes in short, natural bullet points.
- Do not include exam questions, answers, private download paths, or invented public-sample links in the log.
- Website-only changes do not require a PDF log entry.

### Course Resources
- You have access to all engineering course titles as well as their course outlines (PDF names as the course title) inside the folder "courses", for each individual engineering program in its own folder.
- Common course outlines are in the Engineering Core folder
- The generated PDFs must cover the course outlines for the requested courses and must follow prior given instructions related to syntax, design, format, solvability, etc. of the problems in each PDF.

### Course Resources
- Do not commit to GitHub unless prompted.


Specific instructions from the user override these defaults.