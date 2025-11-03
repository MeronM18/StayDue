# Fix Vercel Production Overrides Warning

## The Issue

You're seeing a warning: **"Configuration Settings in the current Production deployment differ from your current Project Settings."**

This happens when your production deployment was created with different settings than what you have in Project Settings.

## Solution

You have two options:

### Option 1: Update Production Overrides (Quick Fix)

1. **In the "Production Overrides" section** (the collapsible section with the deployment link)
2. **Fill in the Build Command**:
   - Enter: `pnpm install && pnpm --filter ./apps/web build`
3. **Fill in the Install Command**:
   - Enter: `pnpm install`
4. **Click "Save"**

This will make the production deployment use the same settings as your Project Settings.

### Option 2: Redeploy with New Settings (Recommended)

1. **Go to the Deployments tab** (click "Deployments" in the top nav)
2. **Find your latest production deployment**
3. **Click the "..." menu** (three dots) on that deployment
4. **Click "Redeploy"**
5. **Confirm the redeploy**

This will create a new deployment using your current Project Settings, which will eliminate the warning.

## Recommended Approach

**I recommend Option 2 (Redeploy)** because:
- It ensures all future deployments use consistent settings
- It tests that your build works with the new settings
- It keeps everything in sync

After redeploying, the warning should disappear because the production deployment will match your Project Settings.

## Current Project Settings (Already Correct ✅)

- **Build Command**: `pnpm install && pnpm --filter ./apps/web build` ✅
- **Install Command**: `pnpm install` ✅
- **Framework**: Next.js ✅
- **Root Directory**: `apps/web` (from General settings) ✅

## After Fixing

Once you redeploy or update the production overrides:
- ✅ Warning will disappear
- ✅ Future deployments will use consistent settings
- ✅ Build should succeed

