# Royal Drive Cameroun — Luxury Chauffeur Landing Page

A premium, fully responsive landing page for a luxury chauffeur booking service in Cameroon, built with Next.js 14 (App Router) and TailwindCSS.

## Tech Stack
- **Next.js 14** — App Router
- **TypeScript**
- **TailwindCSS** — utility-first styling
- **Google Fonts** — Cormorant Garamond (display) + Josefin Sans (body)

## Design
- **Color palette**: Obsidian black (#0a0a0a) + Royal gold (#D4AF37)
- **Typography**: Cormorant Garamond (elegant serif display) + Josefin Sans (clean geometric body)
- **Aesthetic**: Refined luxury — dark, minimal, high-contrast gold accents

## Folder Structure
```
royal-drive-cameroun/
├── app/
│   ├── globals.css          # Global styles, font imports, utility classes
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page composition
├── components/
│   ├── Navbar.tsx           # Fixed navbar with scroll effect + mobile menu
│   ├── HeroSection.tsx      # Full-screen hero with parallax bg + CTAs
│   ├── ServicesSection.tsx  # Confort & Confort Plus service cards
│   ├── WhySection.tsx       # 4-pillar trust section
│   ├── HowItWorks.tsx       # 3-step booking process
│   ├── CTASection.tsx       # Final call-to-action with bg image
│   ├── Footer.tsx           # Full footer with contact + cities
│   └── WhatsAppButton.tsx   # Floating WhatsApp button with pulse animation
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Setup & Run

```bash
# Install dependencies (requires Node v18+)
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## WhatsApp Integration

The floating button and CTA buttons use pre-filled WhatsApp deep links:

```
https://wa.me/?text=Hello%2C%20I%20would%20like%20to%20book%20a%20transfer...
```

To link to a specific phone number, update `WhatsAppButton.tsx` and `CTASection.tsx`:
```ts
// Change from:
const url = `https://wa.me/?text=${message}`;
// To (replace with real Cameroon number, no + or spaces):
const url = `https://wa.me/237600000000?text=${message}`;
```

## Customization

| File | What to change |
|------|---------------|
| `CTASection.tsx` | Phone number in `href="tel:+237..."` |
| `Footer.tsx` | Real phone number, address |
| `WhatsAppButton.tsx` | WhatsApp phone number |
| `ServicesSection.tsx` | Vehicle names, descriptions, prices |
| `app/globals.css` | Brand colors via CSS variables |
