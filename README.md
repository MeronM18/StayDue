# StayDue

Fresh start for StayDue. Application planning and implementation are pending.

- GitHub: https://github.com/MeronM18/StayDue
- Production domain: https://staydue.com
- Hosting: Vercel

## Repository workflow

Use `origin` at `https://github.com/MeronM18/StayDue.git` for this project.
Push completed commits to GitHub; `main` is the intended production branch.
Keep credentials, environment files, and local Vercel metadata out of Git.

## Supabase

- Project: `nugmoaniewzlinfgyhrf` (StayDue)
- URL: https://nugmoaniewzlinfgyhrf.supabase.co
- Local configuration: `supabase/config.toml`
- Local API credentials: `.env.local` (ignored by Git)

To link another checkout, authenticate with `supabase login`, then run
`supabase link --project-ref nugmoaniewzlinfgyhrf`.
The CLI stores the workspace link in ignored local metadata.
