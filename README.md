# Prasanth Travels – Landing Page

AI-powered travel planning landing page built with **Next.js 15** + **Tailwind CSS**, deployable to Vercel in minutes.

## 🚀 Quick Deploy to Vercel

### Option A — Vercel Dashboard (Easiest)
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Click **Deploy** — done!

### Option B — Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## ✏️ Customization Checklist

### 1. Set Your WhatsApp Number
Edit both files and replace `919876543210` with your number (country code + digits, no `+` or spaces):
- `components/Hero.tsx` → line 4
- `components/WhatsAppCTA.tsx` → line 2
- `components/InquiryForm.tsx` → line 5

**Example:** For +91 98765 43210 → use `919876543210`

### 2. Add Your Fillout Form
Edit `components/InquiryForm.tsx` → line 4:
```
const FILLOUT_FORM_URL = "https://form.fillout.com/t/YOUR-REAL-FORM-ID";
```
Get your embed URL from [fillout.com](https://fillout.com) → Your Form → Share → Embed

### 3. Update Business Name (optional)
Search and replace `Prasanth Travels` across all component files.

---

## 🛠 Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 📁 Project Structure

```
components/
  Hero.tsx          # Hero section with headline + CTA buttons
  Benefits.tsx      # Three benefit cards + stats row
  InquiryForm.tsx   # Fillout form embed
  WhatsAppCTA.tsx   # Full-width CTA + floating WhatsApp button
  Footer.tsx        # Footer

app/
  page.tsx          # Main page (assembles all components)
  layout.tsx        # HTML shell, fonts, metadata
  globals.css       # Design tokens + animations
```

## 🎨 Design Tokens (globals.css)

| Variable | Color | Usage |
|----------|-------|-------|
| `--terra` | #C4713A | CTA buttons, accents |
| `--ocean` | #2D6A8F | Secondary accent, hero gradient |
| `--forest` | #3D6B4F | Tertiary accent |
| `--sand` | #F5F0E8 | Background cards |
| `--cream` | #FAFAF7 | Page background |

