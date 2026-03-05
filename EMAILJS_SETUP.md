# EmailJS Setup Guide - Quick Start

Your service ID is already configured: `service_uawhg26`

## Step 1: Get Your Public Key

1. Go to [EmailJS Account Settings](https://dashboard.emailjs.com/admin/account)
2. Find your **Public Key** (looks like: `xYz123AbC456`)
3. Copy it

## Step 2: Update Your Public Key in portfolio.html

Open `portfolio.html` and find line ~51:

```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

Replace `YOUR_PUBLIC_KEY` with your actual public key:

```javascript
emailjs.init('xYz123AbC456'); // Your actual key here
```

## Step 3: Create Email Template in EmailJS

1. Go to [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)
2. Click **"Create New Template"**
3. Open the file `EMAILJS_TEMPLATE.html` in this folder
4. Copy **EVERYTHING** from that file
5. Paste it into the EmailJS template editor
6. **Important:** Set the Template ID to exactly: `template_portfolio`
7. Click **Save**

### Alternative: Simple Text Template

If you prefer a simple text template instead of HTML:

**Subject:**
```
New Portfolio Contact: {{subject}}
```

**Body:**
```
You have a new message from your portfolio contact form.

FROM: {{from_name}}
EMAIL: {{from_email}}
SUBJECT: {{subject}}

MESSAGE:
{{message}}

---
Reply to: {{from_email}}
```

## Step 4: Set Email Destination

In the template settings:
- **To Email:** `aalamaynn@gmail.com`
- **From Name:** `Portfolio Contact Form`
- **From Email:** Use your EmailJS verified email

## Step 5: Test Your Setup

1. Save all changes
2. Refresh your portfolio page
3. Open the contact form
4. Send a test message
5. Check your email inbox

## Troubleshooting

### Error: "Failed to send message"
- Check if your Public Key is correct (line 51 in portfolio.html)
- Verify Template ID is exactly `template_portfolio`
- Make sure your EmailJS service is connected to your email provider

### Error: "Unauthorized"
- Your Public Key might be incorrect
- Check it in [Account Settings](https://dashboard.emailjs.com/admin/account)

### Email not received
- Check spam folder
- Verify your email address in EmailJS service settings
- Test the template directly in EmailJS dashboard

## Your Current Configuration

✅ Service ID: `service_uawhg26` (already configured)
⏳ Public Key: Needs to be added (line 51)
✅ Template ID: `template_portfolio` (already configured in code)
⏳ Template: Needs to be created in EmailJS dashboard

## Quick Checklist

- [ ] Get Public Key from EmailJS
- [ ] Update line 51 in portfolio.html with Public Key
- [ ] Create template in EmailJS dashboard
- [ ] Set Template ID to `template_portfolio`
- [ ] Set destination email to `aalamaynn@gmail.com`
- [ ] Test the contact form

---

## Need Help?

If you need your public key, go here:
👉 https://dashboard.emailjs.com/admin/account

To create the template:
👉 https://dashboard.emailjs.com/admin/templates

Your service is already set up:
👉 https://dashboard.emailjs.com/admin/services/service_uawhg26
