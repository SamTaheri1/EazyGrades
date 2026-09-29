# EazyGrades

A Next.js storefront with an Express API, SQLite accounts, course bundles, individual Plus purchases and a track-scoped Premium subscription.

## Run locally

- Node.js 24 and npm are required.
- `npm ci`
- Copy `.env.example` to `.env` and configure the required values.
- `npm run dev` starts the website on http://127.0.0.1:3000 and API on port 4100.
- `npm run typecheck`, `npm test`, and `npm run build` verify the project.
- `npm start` runs the built site and API. Use HTTPS and APP_URL for production.

## Content and launch

This repository is intentionally in preparation mode. No reviewed Core/Advanced product pairs were present in the previous app. Old unrelated courses, PDFs, and the exam workspace were removed. Do not enable payments until real content and support are ready.

`data/courses.js` exports the course catalog as a JavaScript array shared by the storefront and API. Edit its descriptions and coverage notes directly; restart the API after changing it. Each record retains its source URL and metadata verification date. The date describes existing metadata provenance, not a fresh syllabus or content review. Review source metadata and current coverage before publishing. Add verified engineering/math/software course records here; never invent course names or imply professor-specific coverage. Exactly two products are allowed: `core` and `advanced`.

For reviewed products, use `PRIVATE_PDF_DIR/<course-id>/core.pdf` and `advanced.pdf` outside this public repository and outside `public`. Mark the course `published: true` only after checking every file placed there for mathematical accuracy, readable layout, and permitted original content. Availability is checked per PDF: both reviewed files must exist before the course bundle can be sold; individual Plus purchases use per-file availability. Include the following on every PDF: “AI-generated exam-style practice questions for study purposes only. Not official course material.” Add the footer: “© 2026 EazyGrades. For personal study use only. Redistribution, resale, or sharing is not permitted.” Product files are served only through an authenticated, server-authorized download endpoint. Paths never appear in the frontend catalog. Never configure the web server to serve data or private storage statically.

Set a real `NEXT_PUBLIC_SUPPORT_EMAIL` before building. Review the policies for your actual business, data retention, providers, and applicable consumer rights. No analytics are installed. Optional analytics require appropriate disclosures/consent. Account recovery is currently support-assisted; implement verified recovery before a wider launch. Back up SQLite and private PDFs, restrict filesystem access, and run a single API instance with persistent storage. For multiple instances, migrate to a shared database and distributed locks/rate limiting.

## Pricing and Stripe

Prices live in `config/pricing.json`. Course Bundle is CAD 19.99 once for both Core **and** Advanced PDFs in one selected course. Premium is the only recurring offer: CAD 15.99/month for all available PDFs in **one** selected track. Active Premium members can purchase individual outside-track PDFs for CAD 12.99 using Plus pricing. Plus is a member benefit, not a subscription or third pricing card. Actual Plus prices are returned only in authenticated active-member account data. Individual purchases remain accessible after Premium expires.

`config/tracks.js` maps course IDs to seven engineering fields from the supplied eng_list.md. Each course has explicit memberships and may belong to multiple fields. ENGR 213, ENGR 233 and ENGR 371 belong to all seven. Shared courses are included in Premium for every listed field; unrelated field courses remain excluded. Track selection is stored with the subscription and cannot be changed through the browser. The API accepts only a track selection, a course bundle selection or a Plus course/product selection; it chooses the offer and price server side and refreshes Premium's current Stripe state before quoting a member price. Prices, currency and product selection are snapshotted on the order. Checkout quotes last up to 24 hours; a completed purchase retains the accepted quote even if membership expires meanwhile. Retrying checkout after membership ends replaces an open discounted quote with a regular-price checkout.

1. Configure `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_SINGLE` (CAD 19.99 one-time course bundle), `STRIPE_PRICE_PREMIUM` (CAD 15.99 recurring monthly), and `STRIPE_PRICE_PLUS` (CAD 12.99 one time) in server environment variables. Price IDs and secrets are never sent to the browser. The API validates the Stripe Price's amount, currency, billing interval and active status. Single/Plus use Checkout payment mode; Premium uses subscription mode.
2. Configure the Stripe customer portal and payment methods. Disable subscription switching/quantity updates; changing a track needs a separately reviewed workflow. The account also has a direct **Cancel future renewals** button that schedules cancellation at period end. Set business details and tax treatment in Stripe before accepting payments. Checkout currently expects the configured total without automatic tax, coupons or other adjustments; changing that requires updating fulfillment validation.
3. Register `/api/billing/webhook` for `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`, `invoice.payment_action_required`, `charge.refunded`, and `charge.dispute.created`.
4. In test mode exercise success, cancellation, failed payment, delayed webhook delivery, renewal, expiry, refund, portal cancellation, and unauthorized downloads. Use Stripe CLI forwarding to `http://127.0.0.1:4100/api/billing/webhook` during local tests.
5. After content review, verified support contact, portal configuration, and end-to-end Stripe testing, set `CHECKOUT_ENABLED=true`. Test credentials were not supplied during implementation; no real charge was made.

Webhook signatures use the raw request body. Events are deduplicated and reconciliation is serialized. Subscription reconciliation retrieves current Stripe status and the paid latest invoice, checking the customer, Price and quantity. Bundle and individual Plus purchases require a freshly retrieved completed, paid Checkout session with matching order, customer, product Price, quantity, currency and total. The success URL only polls persisted webhook-confirmed state. Every download rechecks individual ownership or active Premium for the course's track and paid-period expiration; a browser redirect cannot grant access.

Refunds/disputes retain the existing conservative policy of suspending all of that customer's access for support review, including partial refunds. An operator must review user/subscription block flags and purchase status before restoring access. Subsequent payment or subscription webhooks do not clear restrictions. Timely webhooks are required for immediate revocation; expiration is enforced even if renewal events are missing. Monitor webhook failures in Stripe. Schema changes are additive; old subscription records are preserved but never converted to Premium or all-track access. Review any legacy subscriptions manually before launch.

Validation: `npm test` covers payment verification, course-bundle ownership, track boundaries, Plus eligibility, cancellation, failed renewals, expiry, retries and refunds. `npm run test:browser` requires a running local site; it checks desktop/mobile layout and uses isolated mocked account/catalog responses for purchase-button states. No test makes a real Stripe payment.

Sources: https://docs.stripe.com/checkout/fulfillment and https://docs.stripe.com/billing/subscriptions/webhooks.


## Registration profile

New accounts require full name, email, password, a valid non-future date of birth (1900 onward), one of the seven fields in `config/engineering-fields.js`, and explicit terms acceptance. The API validates these before inserting the account. SQLite stores the birth date privately, engineering field, acceptance timestamp and policy version. Birth dates are omitted from account responses and Stripe customer requests. Passwords remain salted and hashed. Existing users can still sign in without new profile fields. Engineering field is a profile choice, separate from Premium track selection; it does not grant paid access. No minimum-age policy or identity verification is implied by collecting a birth date.

## Curated engineering catalog

The catalog contains only the 38 unique courses in the supplied engineering list. `config/tracks.js` is the membership source for the seven visible field filters, registration options and Premium access. Common courses are deduplicated in All courses and included in each field. Typing a search resets the field filter to All courses; codes such as `comp352`, `COMP 352` and `comp-352` all match. Selecting a field clears the search to show its complete list. New course records are in preparation until their PDFs are reviewed and published.
