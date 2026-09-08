<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## StayDue workflow

- This checkout belongs to the backend developer. Keep work, commits, and pushes on `backend` unless the user explicitly authorizes another branch.
- Never apply migrations or seed/reset commands to production during local development.
- Develop and test with local Supabase on ports 55321–55324.
- Follow `docs/SETUP.md`; use Node 24 and the project-pinned CLI.
- AI extraction produces review candidates only. Preserve transactional, idempotent confirmation and ownership enforcement.
- Keep secrets out of Git and logs. Do not implement roadmap features beyond V1 without an explicit request.
