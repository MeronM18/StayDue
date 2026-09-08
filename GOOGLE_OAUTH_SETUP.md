# Google OAuth Setup for StayDue

## Step 1: Get Your Supabase Callback URL

### For Local Development (using local Supabase):
```
http://127.0.0.1:55321/auth/v1/callback
```

### For Production (you'll need your production Supabase project):
If you have a production Supabase project, the callback URL will be:
```
https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
```

**Note:** You currently only have local Supabase running. For production, you'll need to:
1. Create a new Supabase project at https://supabase.com/dashboard
2. Name it "StayDue"
3. Copy the project URL and anon key

---

## Step 2: Create Google OAuth Credentials

1. Go to **Google Cloud Console**: https://console.cloud.google.com/
2. Create a new project or select existing "StayDue" project
3. Go to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
5. If prompted, configure the OAuth consent screen first:
   - User Type: **External**
   - App name: **StayDue**
   - User support email: Your email
   - Developer contact: Your email
   - Save and continue through the rest

6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **StayDue**
   
   **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   http://127.0.0.1:3000
   https://staydue.com
   https://www.staydue.com
   ```
   
   **Authorized redirect URIs:**
   ```
   http://127.0.0.1:55321/auth/v1/callback
   http://localhost:3000/auth/callback
   https://staydue.com/auth/callback
   ```
   
   **For Production Supabase (add when you create it):**
   ```
   https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
   ```

7. Click **CREATE**
8. Copy your **Client ID** and **Client Secret**

---

## Step 3: Configure Local Supabase

### Option A: Via Config File (Recommended)

1. Edit your local Supabase config:
```bash
code supabase/config.toml
```

2. Find the `[auth.external.google]` section and update:
```toml
[auth.external.google]
enabled = true
client_id = "YOUR_GOOGLE_CLIENT_ID_HERE"
secret = "YOUR_GOOGLE_CLIENT_SECRET_HERE"
redirect_uri = "http://127.0.0.1:55321/auth/v1/callback"
```

3. Create a `.env` file in the root (Supabase CLI reads root `.env`):
```bash
echo "SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID" >> .env
echo "SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=YOUR_CLIENT_SECRET" >> .env
```

4. Restart local Supabase:
```bash
npm run db:stop
npm run db:start
```

### Option B: Via Supabase Dashboard (Local Studio)

1. Open Supabase Studio: http://127.0.0.1:55323
2. Go to **Authentication** → **Providers**
3. Find **Google** and click to configure
4. Enable it and enter:
   - **Client ID**: Your Google Client ID
   - **Client Secret**: Your Google Client Secret
5. Save

---

## Step 4: Configure Your App

Your app is already configured! The auth routes are at:
- `/auth/login` - Initiates Google OAuth
- `/auth/callback` - Handles the redirect
- `/auth/logout` - Logs out

---

## Step 5: Test Locally

1. Make sure your dev server is running:
```bash
npm run dev
```

2. Open http://localhost:3000
3. Click **"Sign in with Google"**
4. You should be redirected to Google's consent screen
5. After approving, you'll be redirected back to StayDue

---

## Step 6: Configure Production Supabase (When Ready)

When you create your production Supabase project:

1. Go to your production Supabase dashboard
2. Navigate to **Authentication** → **Providers** → **Google**
3. Enable Google and enter the same Client ID and Client Secret
4. Update **Site URL**: `https://staydue.com`
5. Add **Redirect URLs**:
   ```
   https://staydue.com/auth/callback
   https://staydue.com/*
   ```

6. Add environment variables to Vercel:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Enter: https://[YOUR-PROJECT-REF].supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
# Enter: Your production anon key

vercel env add SUPABASE_SECRET_KEY production
# Enter: Your production service role key

vercel env add APP_ORIGIN production
# Enter: https://staydue.com
```

---

## Quick Checklist

- [ ] Create Google OAuth credentials
- [ ] Add all redirect URIs to Google
- [ ] Configure local Supabase with Google Client ID/Secret
- [ ] Restart local Supabase (`npm run db:stop && npm run db:start`)
- [ ] Test login at http://localhost:3000
- [ ] Create production Supabase project (when ready)
- [ ] Configure production Supabase with Google OAuth
- [ ] Add production Supabase keys to Vercel

---

## Troubleshooting

**"redirect_uri_mismatch" error:**
- Make sure the redirect URI in Google Console exactly matches Supabase's callback URL
- Check for typos, http vs https, trailing slashes

**"Invalid login credentials" error:**
- Your Google Client ID/Secret might not be configured in Supabase
- Check Supabase Studio → Authentication → Providers → Google

**Can't see Google sign-in option:**
- Restart your local Supabase after adding credentials
- Check the config.toml file has the correct values

**Local Supabase not picking up credentials:**
- Supabase CLI reads `.env` from the project root, NOT `.env.local`
- Make sure you created `.env` (not just `.env.local`)
