/**
 * Simple test script to send an email with Resend
 * 
 * First, make sure you have:
 * 1. RESEND_API_KEY in .env.local
 * 2. RESEND_FROM_EMAIL in .env.local
 * 
 * Then run:
 *   node test-email-simple.js your-email@example.com
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

const apiKey = envVars.RESEND_API_KEY;
const fromEmail = envVars.RESEND_FROM_EMAIL;

if (!apiKey) {
  console.error('❌ RESEND_API_KEY not found in .env.local');
  console.log('\nPlease add:');
  console.log('  RESEND_API_KEY=re_your-api-key');
  process.exit(1);
}

if (!fromEmail) {
  console.error('❌ RESEND_FROM_EMAIL not found in .env.local');
  console.log('\nPlease add:');
  console.log('  RESEND_FROM_EMAIL=onboarding@resend.dev');
  console.log('  (or noreply@staydue.com if domain verified)');
  process.exit(1);
}

// Get recipient email from command line
const toEmail = process.argv[2];

if (!toEmail) {
  console.log('📧 Resend Email Test Script');
  console.log('');
  console.log('Usage:');
  console.log('  node test-email-simple.js your-email@example.com');
  console.log('');
  console.log('Example:');
  console.log('  node test-email-simple.js meron@example.com');
  console.log('');
  process.exit(1);
}

// Validate email format
if (!toEmail.includes('@')) {
  console.error('❌ Invalid email address');
  process.exit(1);
}

// Send email using fetch (Node 18+)
async function sendEmail() {
  console.log('📧 Sending test email...');
  console.log(`   From: ${fromEmail}`);
  console.log(`   To: ${toEmail}`);
  console.log('');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: '✅ StayDue Test Email - Resend is Working!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Hello from StayDue! 🎉</h1>
            <p>This is a test email to verify your Resend configuration is working correctly.</p>
            <p>If you received this email, your setup is working perfectly! ✅</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px;">
              Sent from: ${fromEmail}<br>
              This is an automated test email from StayDue.
            </p>
          </div>
        `,
        text: `Hello from StayDue!

This is a test email to verify your Resend configuration is working correctly.

If you received this email, your setup is working perfectly! ✅

Sent from: ${fromEmail}
This is an automated test email from StayDue.`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Resend API Error: ${JSON.stringify(error, null, 2)}`);
    }

    const result = await response.json();
    
    console.log('✅ Email sent successfully!');
    console.log(`   Email ID: ${result.id}`);
    console.log('');
    console.log('📬 Check your inbox (and spam folder) for the test email.');
    console.log('');
    console.log('💡 Tip: If using onboarding@resend.dev, check spam folder.');
    
  } catch (error) {
    console.error('❌ Failed to send email:');
    console.error(error.message);
    console.log('');
    console.log('Common issues:');
    console.log('  - Check your RESEND_API_KEY is correct');
    console.log('  - Check your RESEND_FROM_EMAIL is correct');
    console.log('  - If using custom domain, make sure it\'s verified in Resend');
    process.exit(1);
  }
}

sendEmail();

