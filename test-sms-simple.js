/**
 * Simple test script to send an SMS with Twilio
 * 
 * First, make sure you have:
 * 1. TWILIO_ACCOUNT_SID in .env.local
 * 2. TWILIO_AUTH_TOKEN in .env.local
 * 3. TWILIO_PHONE_NUMBER in .env.local
 * 
 * Then run:
 *   node test-sms-simple.js +1234567890 "Your message here"
 */

const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.join(__dirname, '.env.local');
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      envVars[key] = value;
    }
  });
}

const accountSid = envVars.TWILIO_ACCOUNT_SID;
const authToken = envVars.TWILIO_AUTH_TOKEN;
const fromNumber = envVars.TWILIO_PHONE_NUMBER;

if (!accountSid) {
  console.error('❌ TWILIO_ACCOUNT_SID not found in .env.local');
  console.log('\nPlease add:');
  console.log('  TWILIO_ACCOUNT_SID=ACyour-account-sid');
  process.exit(1);
}

if (!authToken) {
  console.error('❌ TWILIO_AUTH_TOKEN not found in .env.local');
  console.log('\nPlease add:');
  console.log('  TWILIO_AUTH_TOKEN=your-auth-token');
  process.exit(1);
}

if (!fromNumber) {
  console.error('❌ TWILIO_PHONE_NUMBER not found in .env.local');
  console.log('\nPlease add:');
  console.log('  TWILIO_PHONE_NUMBER=+1234567890');
  process.exit(1);
}

// Get recipient phone number and message from command line
const toPhoneNumber = process.argv[2];
const message = process.argv[3] || 'Hello from StayDue! This is a test SMS to verify your Twilio configuration is working. ✅';

if (!toPhoneNumber) {
  console.log('📱 Twilio SMS Test Script');
  console.log('');
  console.log('Usage:');
  console.log('  node test-sms-simple.js +1234567890 "Your message here"');
  console.log('');
  console.log('Example:');
  console.log('  node test-sms-simple.js +1234567890 "Test message"');
  console.log('');
  console.log('Note:');
  console.log('  - Phone number must include country code (e.g., +1234567890)');
  console.log('  - For trial accounts, number must be verified in Twilio');
  console.log('');
  process.exit(1);
}

// Validate phone number format
if (!toPhoneNumber.startsWith('+')) {
  console.error('❌ Phone number must start with + and include country code');
  console.log('Example: +1234567890');
  process.exit(1);
}

// Encode credentials for Basic Auth
const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

// Send SMS using Twilio API
async function sendSMS() {
  console.log('📱 Sending test SMS...');
  console.log(`   From: ${fromNumber}`);
  console.log(`   To: ${toPhoneNumber}`);
  console.log(`   Message: ${message}`);
  console.log('');

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
    const formData = new URLSearchParams();
    formData.append('From', fromNumber);
    formData.append('To', toPhoneNumber);
    formData.append('Body', message);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Twilio API Error: ${error}`);
    }

    const result = await response.json();
    
    console.log('✅ SMS sent successfully!');
    console.log(`   Message SID: ${result.sid}`);
    console.log(`   Status: ${result.status}`);
    console.log('');
    console.log('📬 Check your phone for the SMS message!');
    console.log('');
    console.log('💡 Note: Trial accounts can only send to verified numbers.');
    
  } catch (error) {
    console.error('❌ Failed to send SMS:');
    console.error(error.message);
    console.log('');
    console.log('Common issues:');
    console.log('  - Check your TWILIO_ACCOUNT_SID is correct (starts with AC)');
    console.log('  - Check your TWILIO_AUTH_TOKEN is correct');
    console.log('  - Check your TWILIO_PHONE_NUMBER is correct (include + and country code)');
    console.log('  - For trial accounts: recipient number must be verified in Twilio');
    console.log('  - Phone number format: +1234567890 (include country code)');
    process.exit(1);
  }
}

sendSMS();

