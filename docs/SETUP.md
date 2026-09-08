# Development and release setup

## Local development

1. Use Node 24 (`nvm use`) and start Docker Desktop.
2. Run `npm ci`, then `npm run db:start`. StayDue uses API 55321, database 55322, Studio 55323, and test email 55324 to avoid other local projects.
3. Run `npm run db:reset` for a disposable clean database. This erases **local** coursework and loads synthetic test accounts. The wrapper rejects remote connection overrides.
4. Run `npm run db:env`. This backs up a pre-existing environment to ignored `.env.production.backup`, preserves unrelated keys, and configures local app credentials without printing them.
5. Run `npm run dev`. Open http://localhost:3000.

The browser needs only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Server code also requires `SUPABASE_SECRET_KEY` and `APP_ORIGIN`. Never prefix secret keys with `NEXT_PUBLIC_`. Legacy production keys may remain in ignored backup files; application code does not read them.

## Google authentication

Create OAuth credentials in your Google Cloud project. Configure the consent screen and test audience; create a Web Application OAuth client. Google login must be enabled in the matching Supabase environment.

For local development:

- Authorized origin: `http://localhost:3000`.
- Google redirect URI: `http://127.0.0.1:55321/auth/v1/callback`.
- Put `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID` and `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET` in ignored root `.env` (Supabase CLI reads this file).
- Enable `[auth.external.google]` in the local Supabase config, then restart the local stack. Do not commit credentials. Keep it disabled in CI.
- Supabase's allowed app callback: `http://localhost:3000/auth/callback`.
- Add each tester's lowercased email to `public.beta_allowlist` using local Studio for local development. Production has a separate allowlist.

Only verified identities with a Google identity AND a current allowlist entry can access records. The account existence check is performed against Auth, not user-editable metadata. For CI, seeded local users have synthetic Google identities; they are not a production login mechanism.

## Syllabus extraction

Add `OPENAI_API_KEY` to ignored `.env.local`. Default model: `gpt-4.1-mini`. It can be changed with `OPENAI_MODEL`; configure matching per-million token prices for cost estimates. No subscription to ChatGPT supplies API credentials automatically.

The app sends extracted text, not a public PDF URL, to the Responses API with `store:false`. It validates structured results and stores them as drafts. The student must review and confirm. PDFs: text-based, <=4 MiB, <=60 pages, <=120,000 extracted characters. Scanned/encrypted PDFs are rejected. Limits: 5 processing attempts per hour per user and 5 per import, one active extraction per user. Beta document cap: 30 documents per user.

Provider failures retain the document and a retryable import. A 5-minute stale processing lease can be reclaimed after a terminated request. Each attempt has a 100-second provider timeout within a 120-second Vercel handler budget. No background queue is deployed.

## Tests

- `npm test`: deterministic unit/PDF contract tests; no model calls.
- `npm run db:test`: local database isolation and confirmation tests.
- `npm run test:e2e`: local Chromium desktop/phone workflow tests, synthetic authenticated users, and a local HTTP model stub. No live model billing. Requires local Supabase and a free localhost port 3000.
- `npm run db:types`: regenerate TypeScript from the local database.
- `npm run lint`, `npm run typecheck`, `npm run build`.

`LOCAL_TEST_OPENAI_URL` is permitted only in local development, with a loopback URL, and never on Vercel. Real Google OAuth and real model extraction require separate manual smoke testing with configured credentials. Synthetic tests prove mechanics, not real-world syllabus accuracy.

## Release checklist — explicit authorization required

1. Review and merge approved work into `main`; all work in this checkout remains on `backend` until instructed otherwise.
2. Review migration SQL against production, take a data backup where needed, and apply **migrations only** to project `nugmoaniewzlinfgyhrf`. Never run local seed/reset commands against production. The prior CLI production-link metadata is preserved in ignored `supabase/.linked-metadata`; `supabase link --project-ref nugmoaniewzlinfgyhrf` should only be used deliberately during release. Local development does not need a production link.
3. Configure Vercel production env values, Google production OAuth, and the production allowlist. Production Google redirect URI: `https://nugmoaniewzlinfgyhrf.supabase.co/auth/v1/callback`. Supabase app site URL: `https://staydue.com`; callback: `https://staydue.com/auth/callback`.
4. Configure `SENTRY_DSN` to enable server exception capture with request contents and personal information excluded. No Sentry account is provisioned by the code.
5. Verify Vercel has `main` as its production branch. Branch deployments are disabled in `vercel.json`. The repository is connected, but no preview needs production credentials.
6. Test Google sign-in, upload a consented real syllabus, review accuracy, confirm, verify calendar and sources, export, and delete a test account. Missing dates must remain unscheduled. Confirm private document access with two accounts.
7. Invite 5–10 students. Review extraction metrics and structured error logs. Run `docs/metrics.sql` using an authorized administrative connection for aggregate beta metrics. Do not expose this report through a student API.

V1 has no billing, Canvas, Moodle, Google Calendar, SMS, RAG, chatbot, or native app implementation. The integrations table is schema-only and inaccessible to clients.
