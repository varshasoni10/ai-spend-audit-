const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Setup nodemailer transporter
// IMPORTANT: You need to set EMAIL_USER and EMAIL_PASS in your backend/.env file
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SpendWise AI Backend is running' });
});

app.post('/api/summary', async (req, res) => {
  res.json({ 
    summary: "Your team can reduce AI spending by 35% by moving to lower-tier plans and optimizing API usage." 
  });
});

app.post('/api/lead', async (req, res) => {
  const { email, result, input } = req.body;
  
  const mockReportId = "abc" + Math.floor(Math.random() * 1000);

  // Email content
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

        <p>You can view your full report here: <a href="http://localhost:5173/report/${mockReportId}">http://localhost:5173/report/${mockReportId}</a></p>
        <p>Best,<br>The Credex Team</p>
      </div>
    `
  };

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to', email);
    } else {
      console.log('EMAIL_USER and EMAIL_PASS not set. Skipping actual email sending.');
    }
    res.json({ success: true, reportId: mockReportId });
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response && error.response.includes('Application-specific password required')) {
        res.status(500).json({ success: false, error: 'Gmail blocked the sign-in. You MUST use a 16-digit App Password instead of your regular Gmail password.' });
    } else {
        res.status(500).json({ success: false, error: 'Failed to send email. Check backend logs. Error: ' + error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
