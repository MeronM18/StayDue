# How to Test Twilio SMS

## Quick Test

Once you have Twilio configured in `.env.local`, you can test it with a simple script.

## Step 1: Make Sure You Have

Your `.env.local` should have:
```bash
TWILIO_ACCOUNT_SID=ACyour-account-sid-here
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_PHONE_NUMBER=+1234567890
```

## Step 2: Verify Your Phone Number (For Trial Accounts)

**Important**: Trial accounts can only send SMS to verified numbers!

1. Go to [Twilio Console](https://console.twilio.com) → **Phone Numbers** → **Verified Caller IDs**
2. Click **"Add a new number"**
3. Enter your phone number
4. Twilio will send a verification code
5. Enter the code to verify

## Step 3: Run the Test Script

```bash
cd /Users/meron/Documents/Coding_Projects/StayDue/staydue
node test-sms-simple.js +1234567890 "Your message here"
```

**Replace:**
- `+1234567890` with the verified phone number (include `+` and country code)
- `"Your message here"` with your message (optional)

**Example:**
```bash
node test-sms-simple.js +1234567890 "Hello from StayDue! Test SMS"
```

## What You'll See

✅ Success:
```
📱 Sending test SMS...
   From: +1234567890
   To: +1234567890
   Message: Hello from StayDue! Test SMS

✅ SMS sent successfully!
   Message SID: SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Status: queued

📬 Check your phone for the SMS message!
```

❌ Error:
- Check your credentials are correct
- Make sure phone number is verified (for trial accounts)
- Verify phone number format includes country code

## Phone Number Format

**Correct:**
- `+1234567890` ✅ (with + and country code)
- `+442071234567` ✅ (UK number)
- `+61412345678` ✅ (Australia number)

**Incorrect:**
- `1234567890` ❌ (missing +)
- `(123) 456-7890` ❌ (wrong format)
- `123-456-7890` ❌ (wrong format)

## Troubleshooting

**SMS not arriving?**
- Check spam folder (some carriers filter SMS)
- Verify phone number is verified in Twilio (for trial accounts)
- Check phone number format is correct
- Wait a few seconds (SMS can take 10-30 seconds)

**"Trial account" error?**
- Trial accounts can only send to verified numbers
- Go to Twilio Console → Verified Caller IDs
- Add and verify the recipient number

**Script error?**
- Check `.env.local` has all three Twilio variables
- Verify credentials are correct
- Make sure Node.js is installed (Node 18+)

## Alternative: Test via Twilio Console

1. Go to [Twilio Console](https://console.twilio.com) → **Messaging** → **Try it out**
2. Enter recipient number (must be verified for trial)
3. Enter message
4. Click "Send Test SMS"

This uses Twilio's interface, but the script above is better for testing your actual configuration.

