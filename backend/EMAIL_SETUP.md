# Email Sending Setup Guide

## Overview
The application supports sending generated emails directly to recipients via SMTP.

## Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Create App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and your device
3. Click "Generate"
4. Copy the 16-character password

### Step 3: Update .env File
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
FROM_EMAIL=your_email@gmail.com
```

## Other SMTP Providers

### Outlook/Office 365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASSWORD=your_password
FROM_EMAIL=your_email@outlook.com
```

### Custom SMTP Server
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=your_email@yourdomain.com
SMTP_PASSWORD=your_password
FROM_EMAIL=your_email@yourdomain.com
```

## Testing Email Functionality

1. Generate an email in the Email Generator page
2. Enter a receiver email address
3. Click "Send Email to Receiver"
4. Check the recipient's inbox

## Troubleshooting

### "Email service not configured"
- Make sure SMTP_USER and SMTP_PASSWORD are set in `.env`
- Restart the backend server after updating `.env`

### "SMTP Authentication failed"
- For Gmail: Use App Password, not your regular password
- Verify credentials are correct
- Check if 2FA is enabled (required for Gmail)

### "Connection timeout"
- Check firewall settings
- Verify SMTP_HOST and SMTP_PORT are correct
- Some networks block port 587

## Security Notes

1. Never commit `.env` file with real credentials
2. Use App Passwords for Gmail (not your account password)
3. Consider using environment variables in production
4. Rotate credentials periodically

## Features

- ✅ Send generated emails directly from the app
- ✅ Email validation before sending
- ✅ Track sent status in database
- ✅ Professional email formatting
- ✅ Support for multiple SMTP providers
