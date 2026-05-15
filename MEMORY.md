# Lisek Salon Groomerski — Project Memory

> Logbook for the Lisek grooming salon website. Read this FIRST every session.

## Project Snapshot
- **Type:** Static portfolio + booking site for a dog/cat grooming salon ("Lisek Salon Groomerski") in Leszno, PL.
- **Language of UI:** Polish only (per CLAUDE.md §3).
- **Stack:** Plain HTML5 + CSS3 + vanilla JS. No build step. Deployable to any static host (Netlify/Vercel/GitHub Pages).
- **Branding asset:** `lisek_logo.png` (in repo root).

## Source-of-truth files
- `CLAUDE.md` — project rules (memory, design, content, accessibility, tooling).
- `DESIGN.md` — visual system (colors, typography, spacing, components). **Single source of truth for UI.**
- `info.txt` — salon contact, hours, services, pricing.
- `lisek_logo.png` — logo asset.

## Design tokens (from DESIGN.md)
- **Colors:** primary `#F68B1F` (orange), secondary/background `#F2EAD3` (cream), accent `#FDB813` (gold), surface `#FFFFFF`, text-primary `#111827`, text-secondary `#4B5563`, border `#E5E7EB`.
- **Type:** Inter (display), Playfair Display (body), JetBrains Mono (labels/metadata).
- **Spacing:** base 8px, gap 16px, card-padding 24px, section-padding 80px.
- **Radius:** card 16px, control 8px, pill 9999px.

## Site sections (planned)
1. **Header / Nav** — logo + anchor links, mobile menu.
2. **Hero** — strong H1 in Polish, CTA to booking, secondary CTA to pricing.
3. **About / Portfolio** — salon presentation + image grid (Unsplash placeholders, replace later).
4. **Services** — 5 services from `info.txt` (Kąpiel, Strzyżenie, Pielęgnacja, Pazurki, Uszy/oczy).
5. **Pricing (Cennik)** — table from `info.txt`.
6. **Booking (Booksy)** — placeholder iframe; user will inject real widget URL.
7. **Contact (Kontakt)** — address, phone, email, hours + simple mailto contact form.
8. **Footer** — copyright, repeat contact, social placeholders.

## Accessibility checklist (per CLAUDE.md §4)
- Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- `lang="pl"` on `<html>`.
- Skip-to-content link, visible focus rings, ARIA labels on icon-only controls.
- Color contrast ≥ 4.5:1 for body text against backgrounds.
- All interactive elements keyboard reachable; no `tabindex` >0.
- `alt` text in Polish on all meaningful images.

## Resolved decisions
- 2026-05-15: User confirmed: Booksy = placeholder, plain HTML/CSS/JS (no build), stock portfolio images, include contact form.

## Open questions / next steps
- Real Booksy URL for the salon (waiting on user).
- Real portfolio photos to replace Unsplash placeholders.
- Optional: testimonials section, Google Maps embed.

## Progress log
- 2026-05-15: Created MEMORY.md, read CLAUDE.md / DESIGN.md / info.txt. Confirmed design tokens. Beginning scaffold.
- 2026-05-15: Built `index.html`, `styles.css`, `main.js`. All 8 sections live (Header, Hero, About, Services, Pricing, Booking, Contact, Footer). Booksy iframe is a placeholder (`src="about:blank"`). Mobile nav, sticky header, IntersectionObserver reveals, mailto contact form, prefers-reduced-motion all wired. WCAG basics in place: `lang="pl"`, skip link, semantic landmarks, visible focus rings, ARIA on nav toggle / live region on form, alt text in Polish.

## Files in repo
- `index.html` — markup, all sections, semantic & a11y compliant
- `styles.css` — design tokens, components, Mobile First responsive, reduced-motion safe
- `main.js` — nav toggle, scroll state, reveals, mailto form
- `lisek_logo.png` — brand asset (used in header & footer)
- `CLAUDE.md` / `DESIGN.md` / `info.txt` — source-of-truth references
- `MEMORY.md` — this logbook

## How to preview locally
Open `index.html` directly in a browser, or run a static server in the project root, e.g.
`python -m http.server 8000` and visit http://localhost:8000

## Open follow-ups (need user input)
1. Real Booksy embed URL → replace `iframe[src="about:blank"]` in `index.html` (booking section).
2. Real salon photos → replace 4 Unsplash URLs in `.about-gallery` (about section).
3. Optional: add Google Maps iframe to contact section, testimonials, social links.
