# Vercel Build Fix - Monorepo Configuration

## The Problem
Vercel is failing to find the Next.js build output because it needs to know the root directory of your Next.js app in the monorepo.

## Solution

You need to set the **Root Directory** in Vercel project settings.

### Steps to Fix:

1. **Go to your Vercel project dashboard**
   - Visit vercel.com and select your StayDue project

2. **Navigate to Settings → General**

3. **Find "Root Directory" section**
   - Click "Edit"
   - Enter: `apps/web`
   - Click "Save"
   - ✅ Enable: "Include files outside the root directory in the Build Step"

4. **Override Build Command** (Important for monorepo):
   - Scroll to "Framework Settings" section
   - Find "Build Command"
   - Click the "Override" toggle to enable it
   - Enter: `pnpm install && pnpm --filter ./apps/web build`
   - Click "Save"

5. **Override Install Command**:
   - Find "Install Command"
   - Click the "Override" toggle to enable it
   - Enter: `pnpm install`
   - Click "Save"

6. **Verify Other Settings**:
   - **Framework Preset**: Next.js (should be auto-detected) ✅
   - **Output Directory**: Leave as "Next.js default" (don't override) ✅

5. **Redeploy**:
   - Go to Deployments tab
   - Click the "..." menu on the latest deployment
   - Click "Redeploy"

## Alternative: Update vercel.json

If setting Root Directory in the dashboard doesn't work, we can configure it in `vercel.json`, but **the Root Directory setting in Vercel dashboard is the preferred method for monorepos**.

## Why This Happens

Vercel needs to know:
- Where your Next.js app is located (`apps/web`)
- How to build it from the monorepo root
- Where the build output will be (`.next` folder)

Setting the Root Directory tells Vercel to treat `apps/web` as the project root.

## After Fixing

Once you set the Root Directory to `apps/web`:
- ✅ Vercel will run commands from the monorepo root
- ✅ It will build the Next.js app correctly
- ✅ It will find the `.next` output directory
- ✅ Workspace dependencies will be resolved properly

