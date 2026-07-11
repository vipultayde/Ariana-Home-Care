# Ariana Home Care — Website

Responsive marketing website for **Ariana Home Care (एरियाना होम केयर)**, a professional
home healthcare / nursing agency in Gorewada, Nagpur — rated 5.0 on Google and open 24 hours.

## Tech

Pure static site — no build step, no dependencies:

- `index.html` — single-page site (hero, about, services, 4-level care scale, how it works, founder, contact)
- `styles.css` — responsive styling (desktop / tablet / mobile), scroll animations, mobile nav
- `script.js` — mobile menu, scroll reveal, active nav highlighting, WhatsApp enquiry form
- `images/founder.png` — founder photo (Vishal Tayde), shown in the Founder section

## Features

- **Click-to-call & WhatsApp** CTAs everywhere (`tel:` + `wa.me` links to 078880 17233)
- **Enquiry form** that opens WhatsApp with a pre-filled message — no backend required
- **Google Maps embed** of the business location
- **SEO**: meta description/keywords, Open Graph tags, and `MedicalBusiness` JSON-LD schema
- **Mobile**: hamburger nav, sticky call/WhatsApp bar, floating WhatsApp button
- Accessible: semantic HTML, aria labels, `prefers-reduced-motion` support

## Run locally

Just open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## Deploy

Upload the three files to any static host — Netlify, Vercel, GitHub Pages, or shared hosting.
No configuration needed.

## Business data sources

- Google Maps listing: https://maps.app.goo.gl/9BTj2P8yyB4WMgLZ7
- Founder LinkedIn: https://www.linkedin.com/in/vishal-tayde-16544973/
- Business LinkedIn page: https://www.linkedin.com/company/ariana-home-care/
