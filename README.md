# StayDue

Private-beta academic planner: upload a PDF syllabus, review extracted course information, and confirm coursework into a unified dashboard and calendar.

**Stack:** Next.js 16, TypeScript, Supabase Postgres/Auth/Storage, Zod, OpenAI structured extraction. V1 is free; integrations and billing are deferred.

## Start locally

```sh
nvm use
npm ci
# Start Docker Desktop first.
npm run db:start
npm run db:reset
npm run db:env
npm run dev
```

Google sign-in and real syllabus analysis need credentials. See [setup and release instructions](docs/SETUP.md). Local API: `http://127.0.0.1:55321`. Local Studio: `http://127.0.0.1:55323`.

## Contracts and verification

- [OpenAPI](docs/openapi.json): versioned HTTP interfaces.
- [Shared schemas and types](src/lib/contracts.ts): frontend integration contract.
- [Synthetic extraction fixture](tests/fixtures/extraction.json): frontend review examples.
- [Beta metrics](docs/metrics.sql): administrative aggregate queries.
- [Implementation status](docs/STATUS.md): tested behavior and external prerequisites.

```sh
npm run lint
npm run typecheck
npm test
npm run db:test
npm run test:e2e
npm run build
```

## Repository workflow

Repository: https://github.com/MeronM18/StayDue

This workspace uses **backend**. Your collaborator uses **frontend**. Production uses **main**, with merges/releases only when explicitly authorized. All completed changes in this workspace are pushed to `origin/backend`.

Vercel project: `stay-due`. Domain: `staydue.com`. Production Supabase: `nugmoaniewzlinfgyhrf`. Development and CI use local Supabase exclusively. `backend` and `frontend` deployments are disabled in `vercel.json`.

Credentials, local connection metadata, and environment files are excluded from Git. No production schema changes or deployments are part of local implementation.
