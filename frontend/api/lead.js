import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, result, input } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  const mockReportId = "abc" + Math.floor(Math.random() * 1000);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your AI Spend Audit Report from SpendWise',
    html: `
      <div style="font-family: sans-serif; max-w-xl; margin: 0 auto;">
        <h2>Your SpendWise AI Report</h2>
        <p>Hi there,</p>
        <p>Thank you for running an audit. Here is the summary of your results:</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Stack Analyzed: ${input?.tool} (${input?.plan})</h3>
          <p><strong>Current Spend:</strong> $${result?.currentSpend}/mo</p>
          <p><strong>Optimized Spend:</strong> $${result?.recommendedSpend}/mo</p>
          <h3 style="color: #059669;">Total Annual Savings: $${result?.yearlySavings}</h3>
          <p><strong>Recommendation:</strong> ${result?.recommendedAction}</p>
        </div>

        <p>You can view your full report here: <a href="https://ai-spend-audit.vercel.app/report/${mockReportId}">View Report</a></p>
        <p>Best,<br>The Credex Team</p>
      </div>
    `
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ success: false, error: 'Server is missing email credentials (EMAIL_USER and EMAIL_PASS).' });
    }
    
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, reportId: mockReportId });
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.message && error.message.includes('Application-specific password required')) {
        return res.status(500).json({ success: false, error: 'Gmail blocked the sign-in. You must use a 16-digit App Password in the Vercel Environment Variables.' });
    }
    return res.status(500).json({ success: false, error: 'Failed to send email: ' + error.message });
  }
}
