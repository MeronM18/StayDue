# API Keys & Configuration

**⚠️ IMPORTANT: Never commit actual API keys to Git!**

This file serves as a reference for where to find your API keys. Store actual keys in `.env.local` (gitignored).

---

## Supabase Configuration

### Setup Steps:
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Organization**: (create/select one)
   - **Project Name**: `StayDue`
   - **Database Password**: (save this securely!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine to start

### After Project Creation:

#### 1. Project Settings → API
- **Project URL**: `https://your-project-id.supabase.co`
- **Anon/Public Key**: `eyJhbGc...` (starts with `eyJ`)
- **Service Role Key**: `eyJhbGc...` (⚠️ KEEP SECRET - has admin access)

**Save these in `.env.local`:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

#### 2. Database → Connection String
- Go to Settings → Database
- Under "Connection string", select "URI"
- Copy the connection string (looks like: `postgresql://postgres:[PASSWORD]@...`)

**Save in `.env.local`:**
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
```

#### 3. Authentication Settings
- Go to Authentication → URL Configuration
- Add to "Redirect URLs":
  - `http://localhost:3000/auth/callback`
  - `https://staydue.com/auth/callback`

#### 4. Storage (Optional for now)
- We'll set up Storage buckets later when needed

---

## PostHog Analytics

### Setup:
1. Go to [posthog.com](https://posthog.com) and sign up
2. Create a new project: "StayDue"
3. Copy your API key from Project Settings

**Save in `.env.local`:**
```
NEXT_PUBLIC_POSTHOG_KEY=phc_your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## Sentry Error Tracking

### Setup:
1. Go to [sentry.io](https://sentry.io) and sign up
2. Create a new project:
   - Platform: Next.js
   - Project Name: StayDue
3. Copy the DSN (Data Source Name)

**Save in `.env.local`:**
```
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## Resend Email Service

### Setup:
1. Go to [resend.com](https://resend.com) and sign up
2. Verify your domain (staydue.com) or use test domain
3. Create an API key in API Keys section

**Save in `.env.local`:**
```
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=noreply@staydue.com
```

---

## Stripe Payment Processing

### Setup:
1. Go to [stripe.com](https://stripe.com) and sign in
2. Make sure you're in **Test Mode** (toggle in dashboard)
3. Go to Developers → API keys
   - **Publishable key**: `pk_test_xxx`
   - **Secret key**: `sk_test_xxx` (⚠️ KEEP SECRET)

### Webhook Setup (later):
1. Go to Developers → Webhooks
2. Add endpoint: `https://staydue.com/api/webhooks/stripe`
3. Copy webhook signing secret: `whsec_xxx`

### Create Products & Prices (later):
1. Products → Add Product
2. Create Monthly and Yearly plans
3. Copy Price IDs

**Save in `.env.local`:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx (add later)
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_xxx (add later)
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=price_xxx (add later)
```

---

## Upstash Rate Limiting

### Setup:
1. Go to [upstash.com](https://upstash.com) and sign up
2. Create a Redis database
3. Copy REST URL and REST Token

**Save in `.env.local`:**
```
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

---

## OpenAI (Optional)

### Setup:
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key

**Save in `.env.local`:**
```
OPENAI_API_KEY=sk-xxx
```

---

## App Configuration

```
NEXT_PUBLIC_APP_URL=https://staydue.com
NEXT_PUBLIC_APP_NAME=StayDue
```

---

## Quick Reference: Where to Find Keys

| Service | Location |
|---------|----------|
| Supabase | Project Settings → API |
| PostHog | Project Settings → Project API Key |
| Sentry | Project Settings → Client Keys (DSN) |
| Resend | API Keys section |
| Stripe | Developers → API keys |
| Upstash | Database → REST API section |
| OpenAI | API Keys section |

---

## Security Checklist

- [ ] All keys stored in `.env.local` (not committed to Git)
- [ ] `.env.local` is in `.gitignore` ✓ (already done)
- [ ] Never share keys publicly
- [ ] Use test/development keys locally
- [ ] Production keys should be in Vercel Environment Variables
- [ ] Rotate keys if accidentally exposed

---

## Next Steps

1. Create `.env.local` file in `staydue/` root
2. Copy keys from this file as you set up each service
3. Add production keys to Vercel Environment Variables when ready

