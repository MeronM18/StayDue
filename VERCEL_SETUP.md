# Vercel Setup Guide for StayDue.com

## Step 1: Create Vercel Project

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign in (or create an account)

2. **Import GitHub Repository**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `MeronM18/StayDue`
   - Click "Import"

3. **Configure Project Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `apps/web`
   - **Build Command**: Leave default (or use: `pnpm install && pnpm --filter ./apps/web build`)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install`
   - **Node.js Version**: 20.x (or latest LTS)

4. **Environment Variables** (add later):
   - We'll add these when setting up Supabase, Stripe, etc.

5. **Click "Deploy"**

## Step 2: Buy Domain on Vercel

1. **After deployment succeeds**, go to your project dashboard

2. **Navigate to Settings → Domains**

3. **Add Domain**:
   - Click "Add Domain"
   - Enter: `staydue.com`
   - Click "Add"

4. **Purchase Domain**:
   - Vercel will check if the domain is available
   - If available, click "Buy Domain"
   - Follow the checkout process
   - Domain typically costs $15-20/year

5. **Domain Configuration**:
   - Vercel will automatically configure DNS records
   - SSL certificate is automatically provisioned
   - Wait for DNS propagation (usually 1-24 hours)

## Step 3: Domain Setup Details

### If domain is already owned:
1. In Vercel, go to Settings → Domains
2. Add `staydue.com` 
3. Update your domain's nameservers to Vercel's:
   - Go to your domain registrar
   - Update nameservers to Vercel's (they'll be shown in Vercel dashboard)
   - OR add DNS records as instructed by Vercel

### Domain Options:
- **staydue.com** (primary)
- **www.staydue.com** (optional, can redirect to staydue.com)

## Step 4: Verify Setup

1. **Check Deployment**: Your Next.js app should be live at `staydue.com`
2. **Check SSL**: Vercel automatically provides SSL certificates
3. **Test**: Visit your domain to verify it's working

## Important Notes

- Vercel will automatically redeploy on every push to the `main` branch
- The `vercel.json` file in the root is configured for the monorepo structure
- Make sure your `next.config.ts` is properly set up (already done)
- Keep your `.env` files local and add them to Vercel's environment variables

## Next Steps After Domain Setup

- [ ] Configure environment variables in Vercel
- [ ] Set up Supabase project
- [ ] Add Supabase environment variables
- [ ] Test production build locally
- [ ] Verify domain is working

## Troubleshooting

**Domain not connecting?**
- Check DNS records are correct
- Wait up to 24 hours for DNS propagation
- Verify nameservers are pointing to Vercel

**Build failing?**
- Check Node.js version (should be 20.x)
- Verify pnpm is being used (not npm)
- Check build logs in Vercel dashboard

