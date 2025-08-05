// src/lib/email-service.ts
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

// Create transporter (configure based on your email provider)
const createTransporter = () => {
  // Example using Gmail/SMTP
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const getEmailTemplate = (template: string, data: Record<string, any>): { html: string; text: string } => {
  switch (template) {
    case 'invoice-created':
      return {
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Payment Invoice Created</h2>
            <p>Hi ${data.customerName},</p>
            <p>Thank you for choosing Rajib's MLB Analysis! We've created your payment invoice.</p>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Order Details:</h3>
              <p><strong>Plan:</strong> ${data.planName}</p>
              <p><strong>Amount:</strong> $${data.amount}</p>
              <p><strong>Invoice ID:</strong> ${data.invoiceId}</p>
              <p><strong>Expires:</strong> ${new Date(data.expiresAt).toLocaleString()}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.paymentUrl}" style="background: #007cba; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Complete Payment
              </a>
            </div>
            
            <p><strong>Important:</strong> Please complete your payment within 24 hours. The invoice will expire after this time.</p>
            
            <p>Once payment is confirmed, you'll get instant access to all analysis features.</p>
            
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              Need help? Contact us at support@rajibsmlb.com
            </p>
          </div>
        `,
        text: `
Payment Invoice Created

Hi ${data.customerName},

Thank you for choosing Rajib's MLB Analysis! We've created your payment invoice.

Order Details:
- Plan: ${data.planName}
- Amount: $${data.amount}
- Invoice ID: ${data.invoiceId}
- Expires: ${new Date(data.expiresAt).toLocaleString()}

Complete your payment here: ${data.paymentUrl}

Important: Please complete your payment within 24 hours. The invoice will expire after this time.

Once payment is confirmed, you'll get instant access to all analysis features.

Need help? Contact us at support@rajibsmlb.com
        `
      };

    case 'payment-success':
      return {
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #22c55e;">🎉 Payment Confirmed - Welcome!</h2>
            <p>Hi ${data.customerName},</p>
            <p>Excellent! Your payment has been confirmed and your subscription is now active.</p>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
              <h3>Subscription Details:</h3>
              <p><strong>Plan:</strong> ${data.planName}</p>
              <p><strong>Amount Paid:</strong> $${data.amount}</p>
              <p><strong>Active From:</strong> ${new Date(data.startDate).toLocaleDateString()}</p>
              <p><strong>Expires:</strong> ${new Date(data.endDate).toLocaleDateString()}</p>
            </div>
            
            <h3>What's Next?</h3>
            <ul>
              <li>🔍 Access trap detection for all MLB games</li>
              <li>📊 Get signals across 18 betting markets</li>
              <li>🎯 Receive final picks with risk management</li>
              <li>📈 Use historical analysis data</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.loginUrl}" style="background: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Access Your Analysis
              </a>
            </div>
            
            <p>Welcome to the team! Start making smarter MLB bets today.</p>
            
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              Questions? Reply to this email or contact support@rajibsmlb.com
            </p>
          </div>
        `,
        text: `
🎉 Payment Confirmed - Welcome!

Hi ${data.customerName},

Excellent! Your payment has been confirmed and your subscription is now active.

Subscription Details:
- Plan: ${data.planName}
- Amount Paid: $${data.amount}
- Active From: ${new Date(data.startDate).toLocaleDateString()}
- Expires: ${new Date(data.endDate).toLocaleDateString()}

What's Next?
- Access trap detection for all MLB games
- Get signals across 18 betting markets
- Receive final picks with risk management
- Use historical analysis data

Login here: ${data.loginUrl}

Welcome to the team! Start making smarter MLB bets today.

Questions? Reply to this email or contact support@rajibsmlb.com
        `
      };

    case 'payment-failed':
      return {
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ef4444;">Payment Failed</h2>
            <p>Hi ${data.customerName},</p>
            <p>We're sorry, but your payment for ${data.planName} could not be processed.</p>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
              <h3>Payment Details:</h3>
              <p><strong>Plan:</strong> ${data.planName}</p>
              <p><strong>Amount:</strong> $${data.amount}</p>
              <p><strong>Invoice ID:</strong> ${data.invoiceId}</p>
            </div>
            
            <h3>What can you do?</h3>
            <ul>
              <li>Check your cryptocurrency wallet balance</li>
              <li>Verify the payment address</li>
              <li>Try a different cryptocurrency</li>
              <li>Contact our support team</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.retryUrl}" style="background: #ef4444; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Try Again
              </a>
            </div>
            
            <p>Don't worry - you can try again anytime. We're here to help!</p>
            
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              Need assistance? Contact support@rajibsmlb.com
            </p>
          </div>
        `,
        text: `
Payment Failed

Hi ${data.customerName},

We're sorry, but your payment for ${data.planName} could not be processed.

Payment Details:
- Plan: ${data.planName}
- Amount: $${data.amount}
- Invoice ID: ${data.invoiceId}

What can you do?
- Check your cryptocurrency wallet balance
- Verify the payment address
- Try a different cryptocurrency
- Contact our support team

Try again: ${data.retryUrl}

Don't worry - you can try again anytime. We're here to help!

Need assistance? Contact support@rajibsmlb.com
        `
      };

    case 'admin-invoice-notification':
      return {
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Payment Invoice Created</h2>
            <p>A new payment invoice has been created.</p>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Details:</h3>
              <p><strong>Customer:</strong> ${data.customerEmail}</p>
              <p><strong>Plan:</strong> ${data.planName}</p>
              <p><strong>Amount:</strong> $${data.amount}</p>
              <p><strong>Invoice ID:</strong> ${data.invoiceId}</p>
              <p><strong>User ID:</strong> ${data.userId}</p>
            </div>
          </div>
        `,
        text: `
New Payment Invoice Created

Customer: ${data.customerEmail}
Plan: ${data.planName}
Amount: $${data.amount}
Invoice ID: ${data.invoiceId}
User ID: ${data.userId}
        `
      };

    case 'admin-payment-success':
      return {
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #22c55e;">💰 Payment Confirmed - New Subscriber</h2>
            <p>Great news! A payment has been confirmed and a new subscription is active.</p>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Subscription Details:</h3>
              <p><strong>Customer:</strong> ${data.customerEmail}</p>
              <p><strong>Plan:</strong> ${data.planName}</p>
              <p><strong>Amount:</strong> $${data.amount}</p>
              <p><strong>User ID:</strong> ${data.userId}</p>
              <p><strong>Invoice ID:</strong> ${data.invoiceId}</p>
              <p><strong>Expires:</strong> ${new Date(data.subscriptionEndDate).toLocaleDateString()}</p>
            </div>
          </div>
        `,
        text: `
💰 Payment Confirmed - New Subscriber

Customer: ${data.customerEmail}
Plan: ${data.planName}
Amount: $${data.amount}
User ID: ${data.userId}
Invoice ID: ${data.invoiceId}
Expires: ${new Date(data.subscriptionEndDate).toLocaleDateString()}
        `
      };

    default:
      return {
        html: '<p>Email template not found</p>',
        text: 'Email template not found'
      };
  }
};

export async function sendEmail({ to, subject, template, data }: EmailOptions): Promise<void> {
  try {
    const transporter = createTransporter();
    const { html, text } = getEmailTemplate(template, data);

    const mailOptions = {
      from: `"Rajib's MLB Analysis" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}