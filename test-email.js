/**
 * Simple script to test Resend email sending
 * Run with: node test-email.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;

if (!apiKey) {
  console.error('❌ RESEND_API_KEY not found in .env.local');
  console.log('Please add your Resend API key to .env.local');
  process.exit(1);
}

if (!fromEmail) {
  console.error('❌ RESEND_FROM_EMAIL not found in .env.local');
  console.log('Please add RESEND_FROM_EMAIL to .env.local');
  process.exit(1);
}

// Simple fetch request to Resend API
async function sendTestEmail(toEmail) {
  const url = 'https://api.resend.com/emails';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject: 'Test Email from StayDue 🎉',
      html: `
        <h1>Hello from StayDue!</h1>
        <p>This is a test email to verify your Resend configuration is working.</p>
        <p>If you received this, your email setup is correct! ✅</p>
        <hr>
        <p><small>Sent from: ${fromEmail}</small></p>
      `,
      text: `
        Hello from StayDue!
        
        This is a test email to verify your Resend configuration is working.
        
        If you received this, your email setup is correct! ✅
        
        Sent from: ${fromEmail}
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Resend API error: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

// Get email from command line or prompt
const toEmail = process.argv[2];

if (!toEmail) {
  console.log('Usage: node test-email.js your-email@example.com');
  console.log('\nExample:');
  console.log('  node test-email.js meron@example.com');
  process.exit(1);
}

// Send the email
console.log('📧 Sending test email...');
console.log(`   From: ${fromEmail}`);
console.log(`   To: ${toEmail}`);
console.log('');

sendTestEmail(toEmail)
  .then((result) => {
    console.log('✅ Email sent successfully!');
    console.log(`   Email ID: ${result.id}`);
    console.log('');
    console.log('Check your inbox (and spam folder) for the test email.');
  })
  .catch((error) => {
    console.error('❌ Failed to send email:');
    console.error(error.message);
    process.exit(1);
  });

