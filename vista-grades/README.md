# VistaGrades

A Next.js storefront with an Express API, SQLite accounts, one-time Single Course purchases and Program Packs.

Production domain: https://vistagrades.com. Set `APP_URL=https://vistagrades.com` on the production server.

## Run locally

- Node.js 24 and npm are required.
- From the repository root, run `cd "vista-grades"`.
- `npm ci`
- Copy `.env.example` to `.env` and configure the required values.
- `npm run dev` starts the website on http://127.0.0.1:3000 and API on port 4100.
- `npm run typecheck`, `npm test`, and `npm run build` verify the project.
- `npm start` runs the built site and API. Use HTTPS and APP_URL for production.

## Content and launch

This repository is intentionally in preparation mode. No reviewed Core/Advanced product pairs were present in the previous app. Old unrelated courses, PDFs, and the exam workspace were removed. Do not enable payments until real content and support are ready.

`data/courses.js` exports the course catalog as a JavaScript array shared by the storefront and API. Edit its descriptions and coverage notes directly; restart the API after changing it. Each record retains its source URL and metadata verification date. The date describes existing metadata provenance, not a fresh syllabus or content review. Review source metadata and current coverage before publishing. Add verified engineering/math/software course records here; never invent course names or imply professor-specific coverage. Exactly two products are allowed: `core` and `advanced`.

For reviewed products, use `PRIVATE_PDF_DIR/<course-id>/core.pdf` and `advanced.pdf` outside this public repository and outside `public`. Mark the course `published: true` only after checking every file placed there for mathematical accuracy, readable layout, and permitted original content. Availability is checked per PDF: both reviewed files must exist before the course bundle can be sold; individual Plus purchases use per-file availability. Include the following on every PDF: “AI-generated exam-style practice questions for study purposes only. Not official course material.” Add the footer: “© 2026 VistaGrades. For personal study use only. Redistribution, resale, or sharing is not permitted.” Product files are served only through an authenticated, server-authorized download endpoint. Paths never appear in the frontend catalog. Never configure the web server to serve data or private storage statically.

The authorized download endpoint adds the account's signup email beside the copyright on every page. Keep reusable masters free of buyer-specific information and reserve the bottom 52 PDF points for the footer on unrotated pages. Personalization happens in memory after the purchase or subscription check; the master is never overwritten. Downloads use private, no-store caching and fail without returning the master if personalization fails. Long emails wrap in the footer without truncation.

Set a real `NEXT_PUBLIC_SUPPORT_EMAIL` before building. Review the policies for your actual business, data retention, providers, and applicable consumer rights. No analytics are installed. Optional analytics require appropriate disclosures/consent. Account recovery is currently support-assisted; implement verified recovery before a wider launch. Back up SQLite and private PDFs, restrict filesystem access, and run a single API instance with persistent storage. For multiple instances, migrate to a shared database and distributed locks/rate limiting.

## Pricing and Stripe

Prices live in `config/pricing.json`: Single Course costs CAD 12.99 once and includes both Core and Advanced PDFs for one course. Program Pack costs CAD 49.99 once, with CAD 64.99 shown as its previous price. No new recurring subscriptions or Plus purchases are offered.

`config/tracks.js` defines the program-specific courses shown before purchase. ENGR 213, ENGR 233, and ENGR 371 require separate Single Course purchases. Program Pack course IDs are snapshotted on the order; future catalog edits cannot silently expand or shrink a purchase. Listed courses in preparation become downloadable when published.

Configure `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_SINGLE` (CAD 12.99 one-time), and `STRIPE_PRICE_PROGRAM` (CAD 49.99 one-time) server-side. Replace any old Single Course Price ID with a new matching Price. The API rejects incorrect amounts, currencies, inactive Prices, and recurring Prices. Keep `CHECKOUT_ENABLED=false` until real Stripe configuration and end-to-end payment checks are complete.

Both offers use server-created Stripe Checkout payment sessions. Signed webhooks retrieve and verify the paid session, customer, order, exact Price, quantity, currency, and total before granting access. The success page cannot grant access. Downloads check ownership on the server and personalize a private in-memory PDF copy with the authenticated signup email.

Retain checkout completion, asynchronous payment, expiration, refund, and dispute webhook events. Legacy subscription reconciliation and cancellation remain available only for existing records; this migration does not create, cancel, or change existing Stripe subscriptions. Keep their invoice and subscription webhook events registered while legacy accounts exist. Existing individual purchases remain valid. Refunds/disputes suspend access for support review, and later webhooks cannot clear the user block.

Run `npm test`, `npm run typecheck`, and `npm run test:browser` (with the local site running). Tests use isolated fixtures and do not make real payments.


## Registration profile

New accounts require full name, email, password, a valid non-future date of birth (1900 onward), one of the seven fields in `config/engineering-fields.js`, and explicit terms acceptance. The API validates these before inserting the account. SQLite stores the birth date privately, engineering field, acceptance timestamp and policy version. Birth dates are omitted from account responses and Stripe customer requests. Passwords remain salted and hashed. Existing users can still sign in without new profile fields. Engineering field is a profile choice, separate from Program Pack selection; it does not grant paid access. No minimum-age policy or identity verification is implied by collecting a birth date.

## Curated engineering catalog

The catalog contains only the 38 unique courses in the supplied engineering list. `config/tracks.js` is the membership source for the seven visible field filters, registration options and Program Pack membership. Common courses are deduplicated in All courses and included in each field. Typing a search resets the field filter to All courses; codes such as `comp352`, `COMP 352` and `comp-352` all match. Selecting a field clears the search to show its complete list. New course records are in preparation until their PDFs are reviewed and published.

## Deploying the name change

Set the hosting project root to `vista-grades` and reconnect the renamed GitHub repository if needed. Configure DNS and TLS for `vistagrades.com`, update Stripe webhook and customer portal URLs, and set the production `APP_URL` before deployment. Keep the existing support email until its replacement is verified.

Stop the API before moving an existing database. Checkpoint its SQLite WAL, preserve all records, and set `DATABASE_PATH` to its new location. The default filename is `vistagrades.sqlite`. The renamed session cookie requires users to sign in again; accounts and purchases remain in the database. Keep private PDF storage outside the public website.
