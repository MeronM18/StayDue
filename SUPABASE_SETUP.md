# Supabase Setup Guide for StayDue

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in (or create account with GitHub)
3. Click "New Project"
4. Fill in the details:
   - **Organization**: Create new or select existing
   - **Project Name**: `StayDue`
   - **Database Password**: ⚠️ **SAVE THIS SECURELY!** You'll need it for database connections
   - **Region**: Choose closest to your users (e.g., `US East` or `EU West`)
   - **Pricing Plan**: Free tier is fine for development

5. Click "Create new project"
6. Wait 2-3 minutes for project to be provisioned

## Step 2: Get API Keys

### Project URL & API Keys:
1. In your project dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (starts with `eyJ`)
   - **service_role** key: `eyJhbGc...` (⚠️ **KEEP THIS SECRET!** - has admin access)

### Save to `.env.local`:
```bash
# Create .env.local file in staydue/ root
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
```

## Step 3: Get Database Connection String

1. Go to **Settings** → **Database**
2. Scroll to **Connection string**
3. Select **URI** tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

### Save to `.env.local`:
```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```
*(Replace `[YOUR-PASSWORD]` with the password you saved in Step 1)*

## Step 4: Configure Authentication Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Add to **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://staydue.com/auth/callback`
   - `https://www.staydue.com/auth/callback` (if using www)

3. Add to **Site URL**:
   - `https://staydue.com`

4. Click "Save"

## Step 5: Enable Auth Providers (Later)

For now, we'll just set up the project. When ready to implement auth:

### Email Magic Links:
- Already enabled by default
- No additional setup needed

### Google OAuth:
1. Go to **Authentication** → **Providers**
2. Click on **Google**
3. Toggle "Enable Google provider"
4. You'll need to:
   - Create OAuth credentials in Google Cloud Console
   - Add Client ID and Client Secret
   - Add redirect URL: `https://xxxxx.supabase.co/auth/v1/callback`

## Step 6: Database Tables (To be created later)

We'll create tables in Week 1:
- `users` (extended user profiles)
- `organizations` / `workspaces`
- `tasks` / `projects`
- etc.

For now, the project is ready for configuration.

## Step 7: Storage Setup (Optional - Later)

We'll set up Storage buckets when needed for file uploads.

## Quick Links

- **Dashboard**: `https://supabase.com/dashboard/project/[your-project-id]`
- **API Docs**: Settings → API
- **Database**: Table Editor
- **SQL Editor**: SQL Editor (for running migrations)
- **Auth**: Authentication → Users

## Important Notes

- ⚠️ **Never commit `.env.local` to Git** - it's already gitignored
- Service Role Key has full database access - only use server-side
- Anon Key is safe to use client-side (with Row Level Security)
- Save your database password securely
- Free tier includes: 500MB database, 1GB file storage, 50,000 monthly active users

## Next Steps

1. ✅ Save all keys to `.env.local`
2. ✅ Copy keys to `API_KEYS.md` for reference (not the actual keys, just where to find them)
3. ⬜ Set up database tables (next step)
4. ⬜ Configure Row Level Security policies
5. ⬜ Implement authentication

