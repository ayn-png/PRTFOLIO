# Portfolio Setup Guide

This guide will help you configure the missing features that require API keys or external service setup.

---

## 📧 EmailJS Setup (Contact Form)

Your contact form is integrated with EmailJS. Follow these steps to activate it:

### Step 1: Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create an Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the connection steps
5. Copy your **Service ID** (e.g., `service_xyz123`)

### Step 3: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Save and copy your **Template ID** (e.g., `template_abc456`)

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `xYz123AbC456`)

### Step 5: Update Your Portfolio
Open `portfolio.html` and replace these placeholders:

**Line ~35** (EmailJS initialization):
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
```

**Line ~1135** (Form submission function):
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
// Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual IDs
```

---

## 📊 Google Analytics 4 Setup

### Step 1: Create a GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** → **Create Property**
3. Fill in your website details
4. Create a **Web data stream**
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Update Your Portfolio
Open `portfolio.html` and replace the placeholder:

**Line ~27**:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); // Replace with your Measurement ID
</script>
```

---

## 🖼️ Adding Project Screenshots

Your projects currently have placeholder thumbnails. To add real screenshots:

### Option 1: Replace Placeholders with Images
1. Take screenshots of your projects (recommended size: 360x200px)
2. Save them in an `img/projects/` folder
3. Update the project HTML (around line 672):

```html
<!-- Change from: -->
<div class="project-thumb-placeholder">AI CHATBOT</div>

<!-- To: -->
<img src="img/projects/ai-chatbot.jpg" alt="AI Chatbot Screenshot" class="project-thumb">
```

### Option 2: Keep Placeholders
The current placeholders are styled and responsive. You can keep them until you have screenshots ready.

---

## 🎨 SEO Meta Tags Configuration

### Update Social Media Preview Images
1. Create Open Graph preview images (recommended size: 1200x630px)
2. Save them in the `img/` folder as:
   - `og-preview.jpg` (for Facebook/LinkedIn)
   - `twitter-preview.jpg` (for Twitter)

3. Update your domain in `portfolio.html` (line ~17):
```html
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:image" content="https://yourdomain.com/img/og-preview.jpg">
```

If you don't have a domain yet, you can use placeholder images or remove these lines.

---

## 🌗 Dark/Light Mode Toggle

The theme toggle is already functional! It:
- Starts in dark mode (your current design)
- Saves user preference to localStorage
- Shows 🌙 icon in dark mode, ☀️ in light mode

No additional setup needed.

---

## 📝 Blog Section

The blog section is ready with 3 placeholder posts. To add real blog posts:

1. Create blog post HTML/Markdown files
2. Update the blog cards (around line 715) with real content
3. Add links to your blog posts
4. Or integrate with a headless CMS like:
   - Contentful
   - Sanity
   - Strapi

---

## ✅ Features Added Checklist

- ✅ SEO meta tags (description, Open Graph, Twitter Card)
- ✅ Meta theme-color for mobile browsers
- ✅ Font-display: swap for Google Fonts
- ✅ Security: rel="noopener noreferrer" on external links
- ✅ Active navigation highlighting on scroll
- ✅ Dark/light mode toggle with localStorage
- ✅ Project screenshot placeholders
- ✅ Blog section with 3 placeholder posts
- ✅ EmailJS contact form integration (needs configuration)
- ✅ Google Analytics 4 integration (needs configuration)
- ✅ Fully responsive design on all devices

---

## 🚀 Quick Start

1. **Configure EmailJS** (required for contact form to work)
2. **Configure Google Analytics** (optional, for tracking visitors)
3. **Replace project placeholders** with real screenshots (optional)
4. **Update SEO meta tags** with your domain (when you have one)
5. **Test the site** on mobile, tablet, and desktop

---

## 📞 Need Help?

If you encounter any issues:
1. Check browser console for errors (F12)
2. Verify all API keys are correctly entered
3. Test the EmailJS template from the EmailJS dashboard
4. Check GA4 Real-time view to confirm tracking works

---

## 🎉 You're All Set!

Your portfolio now has all the modern features of a professional website. Just configure the API keys and you're ready to deploy!
