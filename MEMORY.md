# Lisek Salon Groomerski — Project Memory

> Logbook for the Lisek grooming salon website. Read this FIRST every session.

## Project Snapshot
- **Type:** Static portfolio + booking site for a dog/cat grooming salon ("Lisek Salon Groomerski") in Leszno, PL.
- **Language of UI:** Polish only (per CLAUDE.md §3).
- **Stack:** **Astro 5 + React 18 islands + TypeScript (strict) + Tailwind CSS v3.** Static output, no SSR.
- **Branding asset:** `lisek_logo.png` (served from `public/`).

## Source-of-truth files
- `CLAUDE.md` — project rules (memory, design, content, accessibility, tooling).
- `DESIGN.md` — visual system (colors, typography, spacing, components). **Single source of truth for UI.**
- `info.txt` — salon contact, hours, services, pricing.
- `lisek_logo.png` — logo asset (also copied to `public/lisek_logo.png`).

## Design tokens (from DESIGN.md → tailwind.config.ts)
- **Colors:** primary `#F68B1F`, secondary/background `#F2EAD3`, accent `#FDB813`, surface `#FFFFFF`, ink-primary `#111827`, ink-secondary `#4B5563`, line `#E5E7EB`.
- **Type:** Inter (display), Playfair Display (body), JetBrains Mono (labels). Loaded via Google Fonts in `Layout.astro`.
- **Spacing:** section 80px, card 24px, gap 16px.
- **Radius:** card 16px, control 8px, pill 9999px.
- **Shadow:** custom `shadow-card` and `shadow-lift` tokens.

## File layout
```
astro.config.mjs        # Astro config (base: /lisek-website for GH Pages)
tailwind.config.ts      # DESIGN.md tokens mapped to Tailwind theme
tsconfig.json           # strict + @/* path alias
package.json            # scripts: dev, build, preview, typecheck
public/
  lisek_logo.png        # served at /lisek-website/lisek_logo.png
src/
  env.d.ts
  data/salon.ts         # typed SalonInfo from info.txt (single source)
  styles/globals.css    # Tailwind layers + base + components (.btn-*, .card, .label)
  layouts/Layout.astro  # <html lang="pl">, meta, fonts, skip-link
  pages/index.astro     # composes all sections
  components/
    Header.tsx          # React island (client:load) — sticky nav, mobile menu, esc-to-close
    Hero.astro          # hosts HeroGallery island in right column
    HeroGallery.tsx     # React island (client:visible) — WCAG carousel: arrows, dots, autoplay, swipe, keyboard
    About.astro         # O nas + Certyfikaty (merged, certs anchor #certyfikaty)
    Services.astro
    Pricing.astro
    Offer.astro         # Special adoption offer (-50% for adopted pets)
    Booking.tsx         # React island (client:visible) — Booksy iframe or fallback
    PricingTabs.tsx     # React island (client:visible) — WCAG tab pattern, 3 categories
    Contact.astro       # contact + Google Maps embed
    Footer.astro
legacy/
  index.html, styles.css, main.js   # the old vanilla version, preserved
```

## Site sections
1. **Header** (island) — logo + anchor nav, mobile hamburger, scroll state, ESC-to-close.
2. **Hero** — Polish H1, primary CTA → rezerwacja, secondary → cennik, logo card.
3. **About** (`#o-nas`) — 4 value cards. Includes nested **Certyfikaty** block (`#certyfikaty` anchor) below a divider — credentials from `salon.certificates` (sourced from `info.txt` Certyfikaty section). Upcoming certs render with dashed border + "Wkrótce" label.
4. **Services** (`#uslugi`) — 5 services from `salon.ts`.
5. **Pricing** (`#cennik`) — `PricingTabs.tsx` island (client:visible). Three categories from `info.txt`: **Psy / Koty / Inne**. Each panel renders a zebra-row table. Full WAI-ARIA tab pattern: `role="tablist"/"tab"/"tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`, roving `tabindex` (0 on active tab, -1 on others). Keyboard: ←/→ wrap, Home/End jump to first/last, Space/Enter activate, focus follows selection.
6. **Offer** (`#oferta`) — Two promo blocks: (a) adoption promo -50% (Dalabuszki shelter partnership, from `oferta.jpg`); (b) Karta stałego klienta — 6 stamps → -50% loyalty reward (from `oferta_karta1.jpg` + `oferta_karta2.jpg`).
7. **Booking** (`#rezerwacja`, island) — Booksy iframe when `salon.booksyUrl` set; else phone fallback.
8. **Contact** (`#kontakt`) — address/phone/email/hours + Google Maps iframe (geocoded from address).
9. **Footer** — repeats nav, contact, hours.

## Accessibility (per CLAUDE.md §4)
- `lang="pl"` on `<html>`.
- Semantic landmarks: `<header>`, `<nav>`, `<main id="main">`, `<section aria-labelledby>`, `<footer>`.
- Skip-to-content link (`.skip-link`).
- `:focus-visible` rings via global CSS.
- ARIA: `aria-expanded`, `aria-controls`, `aria-label` on icon-only button; `aria-labelledby` per section.
- Decorative images use empty `alt=""`; meaningful images have Polish `alt`.
- `prefers-reduced-motion` honored globally.
- All anchor targets are real elements; no `tabindex>0`.

## Booksy integration
- `salon.booksyUrl` in `src/data/salon.ts` is currently `null`. When user provides URL, set it and the iframe replaces the fallback automatically — no other changes needed.

## How to develop
```
npm install
npm run dev        # http://localhost:4321/lisek-website
npm run build
npm run preview
npm run typecheck  # astro check
```

## Deployment — GitHub Pages
- **Repo:** https://github.com/TK-174/lisek-website
- **Live URL:** https://tk-174.github.io/lisek-website/
- `astro.config.mjs` sets `base: '/lisek-website'`. Asset URLs use `import.meta.env.BASE_URL`.
- Build output: `dist/`. Deploy `dist/` to GH Pages (Actions or `gh-pages` branch).
- **TODO:** add a GitHub Actions workflow to build Astro + publish `dist/` to `gh-pages`.

## Resolved decisions
- 2026-05-15: User confirmed: Booksy = placeholder, plain HTML/CSS/JS (no build), stock portfolio images, include contact form.
- 2026-05-16: User confirmed: rewrite to **Astro + React islands + TS + Tailwind**. Old files moved to `legacy/`.

## Open questions / next steps
1. **Real Booksy URL** → set `salon.booksyUrl` in `src/data/salon.ts`.
2. **Real salon photos** → add to `public/portfolio/` and build a gallery section (currently no gallery; the old version had Unsplash placeholders).
3. **GitHub Pages workflow** → `.github/workflows/deploy.yml` to build Astro and publish.
4. Optional: testimonials section, dark mode toggle, contact form (mailto or backend).

## Code review log

### 2026-05-22 — Local review of session changes (Offer, About+Certyfikaty, Hero+HeroGallery, salon.ts)

**Scope:** uncommitted changes from this session only (the prior-session Astro rewrite was reviewed at commit `a61ee2c`).

**Findings & status:**

| ID | Severity | File | Issue | Status |
|---|---|---|---|---|
| H1 | HIGH | `HeroGallery.tsx` | Dot indicators used `role="tablist"/"tab"/aria-selected` + roving `tabindex` — wrong for a carousel (Tabs pattern, not APG Carousel). | **Fixed** — plain `<button>`s with `aria-current="true"` on the active dot, container is `role="group"`. |
| H2 | HIGH | `HeroGallery.tsx` | `aria-controls` on prev/next pointed at the currently visible slide id (changed every render), not a stable region. | **Fixed** — added `useId()`-generated `rotationId` on the `<ul>`; prev/next/dots all `aria-controls={rotationId}`. |
| M1 | MEDIUM | `HeroGallery.tsx` | `onFocus`/`onBlur` on the wrapper bubbled across every child button focus change, causing pause-state flicker that could re-arm the autoplay timer mid-interaction. | **Fixed** — switched to `onFocusCapture`/`onBlurCapture` with `relatedTarget`-containment check (only unpauses when focus leaves the wrapper entirely). |
| M2 | MEDIUM | `Offer.astro` | Two `<h2>`s inside a single `<section aria-labelledby>` — ambiguous outline; loyalty-card heading was orphaned from any landmark. | **Fixed** — outer `<section id="oferta">` carries `aria-label="Oferta specjalna"`; each promo is its own nested `<section aria-labelledby="oferta-tytul">` / `aria-labelledby="karta-tytul">`. |
| M3 | MEDIUM | `Offer.astro` | `<aside>` used for the primary CTA cards (-50% blocks) — implies tangential content; the cards are the section's main CTA. | **Fixed** — both `<aside>`s → `<div>`s; styling unchanged. |
| M4 | MEDIUM | `HeroGallery.tsx` | `tabIndex={0}` on a container that already wraps focusable children added an extra tab stop with no visible focus indicator. | **Fixed** — dropped `tabIndex={0}`; keyboard handlers still fire because keydown bubbles from the inner focusable buttons (prev/next/dots) up to the wrapper. |
| L1 | LOW | `HeroGallery.tsx` | `liveRef` declared/assigned but never read. | **Fixed** — removed the ref; live region is a plain `<div aria-live="polite">`. |
| L4 | LOW | `salon.ts` | Upcoming "Certyfikowany Groomer" placeholder had no TODO marker — easy to forget. | **Fixed** — added `// TODO:` comment above the entry. |
| L2 | LOW | `HeroGallery.tsx` | `role="list"` on `<ul>` — redundant outside specific Safari `list-style: none` cases. | **Not changed** — harmless, kept for defense-in-depth. |
| L3 | LOW | `HeroGallery.tsx` | `key={photo.src}` could collide if seeds duplicate. | **Hardened** — keys now `slide-${i}-${photo.src}` and `dot-${i}-${photo.src}`. |

**Validation after fixes:** `npm run typecheck` → 0 errors / 0 warnings.

**Decision:** APPROVE — all HIGH/MEDIUM addressed, WCAG carousel pattern now matches WAI-ARIA APG.

---

## Progress log
- 2026-05-15: Created MEMORY.md, read CLAUDE.md / DESIGN.md / info.txt. Built first version in plain HTML/CSS/JS. Deployed to GH Pages.
- 2026-05-16: **Rewrite per CLAUDE.md §5** (TS + modern framework + Tailwind). Stack: Astro 5 + React 18 islands + Tailwind v3 + TS strict. Moved old files to `legacy/`. New structure: `src/{components,data,layouts,pages,styles}`. All Polish copy preserved. WCAG basics in place. `npm run build` and `npm run typecheck` both green (0 errors). Booksy slot still placeholder.
- 2026-05-16: **Pricing tabs** added. Updated `info.txt` now groups prices into Psy / Koty / Inne — `salon.pricing` restructured to `PriceCategory[]` (typed `PriceCategoryId = 'psy' | 'koty' | 'inne'`). New `PricingTabs.tsx` island implements the full WAI-ARIA Tabs pattern (tablist/tab/tabpanel, aria-selected, aria-controls, roving tabindex) with keyboard nav: ←/→ (wrap), Home/End, Space/Enter. Only the active panel is visible (others use the `hidden` attribute). Mobile-first responsive. Typecheck + build green.
