# EazyGrades

A Next.js storefront with an Express API, SQLite accounts and Stripe subscriptions.

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

For each reviewed course place PDFs at `PRIVATE_PDF_DIR/<course-id>/core.pdf` and `advanced.pdf`, outside `public`. Mark that course `published: true` only after both PDFs have been checked for mathematical accuracy, readable layout, and permitted original content. Include the following on every PDF: “AI-generated exam-style practice questions for study purposes only. Not official course material.” Add the footer: “© 2026 EazyGrades. For personal study use only. Redistribution, resale, or sharing is not permitted.” Product files are served only through an authenticated, server-authorized download endpoint. Paths never appear in the frontend catalog. Never configure the web server to serve data or private storage statically.

Set a real `NEXT_PUBLIC_SUPPORT_EMAIL` before building. Review the policies for your actual business, data retention, providers, and applicable consumer rights. No analytics are installed. Optional analytics require appropriate disclosures/consent. Account recovery is currently support-assisted; implement verified recovery before a wider launch. Back up SQLite and private PDFs, restrict filesystem access, and run a single API instance with persistent storage. For multiple instances, migrate to a shared database and distributed locks/rate limiting.

## Pricing and Stripe

All displayed prices and plan coverage live in `config/plans.json`. Initial prices are configurable launch defaults, not business-approved prices. Basic is CAD 9/month for one selected course; Pro is CAD 19/month for all available courses; Semester is CAD 49 every four months, recurring until cancellation. Set the corresponding Stripe recurring Price IDs. The server verifies currency, amount, interval, and active price before checkout to prevent displayed/charged price mismatches.

1. Configure `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and all three Price IDs in server environment variables. No secret is public.
2. Enable the Stripe customer portal, payment methods and **cancellation at period end**. Disable subscription switching/quantity updates in the portal; changing the course or plan needs a separately reviewed workflow. Set business details and tax treatment in Stripe before accepting payments.
3. Register `/api/billing/webhook` for `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`, `invoice.payment_action_required`, `charge.refunded`, and `charge.dispute.created`.
4. In test mode exercise success, cancellation, failed payment, delayed webhook delivery, renewal, expiry, refund, portal cancellation, and unauthorized downloads. Use Stripe CLI forwarding to `http://127.0.0.1:4100/api/billing/webhook` during local tests.
5. After content review, verified support contact, portal configuration, and end-to-end Stripe testing, set `CHECKOUT_ENABLED=true`. Test credentials were not supplied during implementation; no real charge was made.

Webhook signatures use the raw request body. Events are deduplicated and reconciliation is serialized. The current subscription and paid latest invoice are fetched from Stripe before granting access. The success URL only polls persisted webhook-confirmed state. Every PDF request rechecks the current stored entitlement and its expiration; a browser redirect cannot grant access. Basic is bound to the selected course. Refunds/disputes conservatively suspend that customer's existing subscriptions for support review, including partial refunds; after resolving the case an operator must review the subscription `blocked` flag and the user `access_blocked` flag before restoring access. Future webhook updates do not clear that flag. Timely webhooks are required for immediate revocation; expiration is enforced even if renewals are not received. Monitor webhook delivery failures in Stripe.

Sources: https://docs.stripe.com/checkout/fulfillment and https://docs.stripe.com/billing/subscriptions/webhooks.

