# Twilio Setup Guide - Step by Step

## Step 1: Create Twilio Account

1. Go to [twilio.com](https://twilio.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Sign up with:
   - Email and password, OR
   - Google account
4. Verify your email if prompted
5. Complete the sign-up process

## Step 2: Get Your Trial Account Info

Twilio starts with a **Trial Account** (free credits for testing).

1. After logging in, you'll see your **Dashboard**
2. You'll see:
   - **Account SID**: Starts with `AC...`
   - **Auth Token**: (Click "View" to reveal)
   - **Trial Phone Number**: A phone number is assigned automatically

## Step 3: Get Your Account SID and Auth Token

1. Go to **Dashboard** (main page)
2. You'll see:
   - **Account SID**: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Auth Token**: Click **"View"** to reveal (starts with random characters)
   - ⚠️ **Copy these immediately** - Auth Token is only shown once!

**Alternative location:**
- Go to **Settings** → **General** → **Account Credentials**
- Copy Account SID and Auth Token

## Step 4: Get Your Phone Number

Twilio automatically gives you a trial phone number:

1. Go to **Phone Numbers** → **Manage** → **Active Numbers**
2. You'll see your trial number (looks like: `+1 234 567 8900`)
3. **Copy this number**

**Note**: Trial numbers can only send to verified numbers (see Step 5)

## Step 5: Verify Your Phone Number (For Testing)

**Trial accounts can only send SMS to verified numbers:**

1. Go to **Phone Numbers** → **Verified Caller IDs**
2. Click **"Add a new number"**
3. Enter your phone number (the one you want to receive SMS)
4. Twilio will send a verification code
5. Enter the code to verify

**Once verified, you can send SMS to this number for testing.**

## Step 6: Add to .env.local

Open your `.env.local` file and add:

```bash
# Twilio SMS Service
TWILIO_ACCOUNT_SID=ACyour-account-sid-here
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_PHONE_NUMBER=+1234567890
```

**Replace:**
- `ACyour-account-sid-here` with your Account SID (starts with `AC`)
- `your-auth-token-here` with your Auth Token
- `+1234567890` with your Twilio phone number (include the `+` and country code)

## Step 7: Test SMS Sending

Once configured, you can test sending SMS using a script (similar to the email test).

## Quick Reference

**What you need:**
- ✅ Twilio account
- ✅ Account SID (starts with `AC`)
- ✅ Auth Token (random characters)
- ✅ Phone Number (assigned by Twilio)
- ✅ Verified phone number (for testing)

**Where to find:**
- **Account SID**: Dashboard → Account SID
- **Auth Token**: Dashboard → Auth Token (click "View")
- **Phone Number**: Phone Numbers → Active Numbers

**What to add to .env.local:**
```
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

## Trial Account Limits

- **Free credits**: $15.50 (enough for testing)
- **Can only send to verified numbers** (during trial)
- **Upgrade to full account** when ready for production
- **No monthly fee** for trial

## Production Setup (Later)

When ready for production:
1. **Upgrade your account** (add payment method)
2. **Get a dedicated phone number** (if needed)
3. **Remove verified number restrictions**
4. **Add production keys to Vercel Environment Variables**

## Common Use Cases

You'll use Twilio for:
- ✅ SMS task reminders
- ✅ Two-factor authentication (2FA)
- ✅ Critical notifications
- ✅ Team alerts
- ✅ Mobile verification

## Troubleshooting

**Can't send SMS?**
- Make sure recipient number is verified (for trial accounts)
- Check Account SID and Auth Token are correct
- Verify phone number format includes country code (e.g., `+1234567890`)

**Need more credits?**
- Trial accounts have $15.50 free credits
- Upgrade to full account for more credits
- Credits are pay-as-you-go

**Phone number not working?**
- Trial numbers can only send to verified numbers
- Upgrade account for production number
- Check number format is correct (`+` and country code required)

