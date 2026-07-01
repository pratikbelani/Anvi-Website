# ANVI — Website (v2 · "One building. One evening.")

A cinematic, editorial website for **Anvi Hospitality Limited** — rebuilt from the ground
up against the full ANVI document set: the 2025 brand guidelines, company profile,
business plan, *Brand & Strategy Brief*, *Pre-Launch Command Plan*, the Chromed design
plans, the Rules of Engagement (per floor), and the live **ANVI & 343 MENU** workbook.
Static HTML/CSS/JS — no build step, no dependencies.

> **Anvi** — from the Sanskrit for *"connected"; one who brings people together.*
> Where cultures connect.

The design concept: **the site is an evening.** The homepage descends from ivory noon
into kohl night as you scroll — arrive (manifesto), ascend (a pinned three-floor journey:
dining room → lounge → terrace), dine (the kitchen & signatures), rise (Anvi Social).

---

## Quick start

```bash
cd anvi-website
python3 -m http.server 8712      # → http://localhost:8712
# or just double-click "Open ANVI Website.command"
```

Deploy by uploading the folder to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3). v1 of the site is preserved in git history (`git log`).

---

## Pages

| File | Page | Notes |
|------|------|-------|
| `index.html` | **Home** | Ken-burns hero + live T-minus counter, manifesto, **The Ascent** (scroll-pinned floor journey with elevator rail), stats band, kitchen feature, draggable signatures shelf, programme, gallery + lightbox, Founding 100 capture |
| `lagos.html` | **Dine** | The Dining Room (72 covers), The Lounge & Bar (18+), the two private rooms (20 + 22 → 42 combined), the four kitchen stations, dining programme |
| `social.html` | **Social** | The glasshouse terrace (80–90 guests) — bar, DJ booth + LED stage, VIP booths, event formats, terrace programme, host enquiry |
| `menu.html` | **Menu** | **All 150 dishes from the ANVI MENU sheet**, 12 chapters with a scrollspy rail, live search, cuisine / vegetarian / signature filters, print stylesheet |
| `about.html` | **Story** | The name, vision & mission (verbatim from the company profile), five values, design philosophy, the peacock, road-to-opening timeline |
| `reservations.html` | **Visit** | Three journeys in one page (Reserve / Host / Founding 100) with deep links (`#reserve` `#host` `#list`), house notes from the Rules of Engagement, contact & hours |
| `coming-soon.html` | **Take a Peek** | The pre-launch landing the Digitol plan calls for: an interactive **peephole** (mirrors the covered-storefront tease), live countdown, **email + WhatsApp capture**. Point the storefront QR here. |
| `404.html` | Not found | "This table doesn't exist." |

---

## What's wired in from the strategy docs

- **Soft launch: mid-August 2026.** All countdowns target `2026-08-15 18:00 WAT` —
  change `data-count="2026-08-15"` (index, reservations, coming-soon) when the date locks.
- **The Founding 100** — the pre-launch waitlist capture (email **and WhatsApp**, not just a
  follow) appears on the home page, the visit page and the peek page. This is the CRM spine
  the strategy review and the Digitol agenda both prioritise.
- **Two brands, one destination** — Anvi Lagos and Anvi Social have distinct art direction
  (day/cream vs night/ink) and separate booking journeys, cross-promoted "dine downstairs,
  host upstairs".
- **Real numbers throughout** — 72 covers, PDRs of 20 + 22 (42 combined), 80–90 on the
  terrace, 650 sq ft kitchen, four stations — all from the Chromed plans / Master Brain.
- **House notes** — dress code, 18+ floors, smoking, photography, outside food — condensed
  from the three Rules of Engagement documents.
- **Footer legal** — Anvi Hospitality Limited · RC 8404218.

### A note on "343 Degree North"
The menu workbook and the Pre-Launch Command Plan reference **343 Degree North** as a
sub-brand with its own 126-item menu (its fit-out programme dates to 2020). It is *not*
presented on this site, because the public-facing documents (Rules of Engagement, Brand &
Strategy Brief) consistently name the three ANVI floors as Anvi Restaurant / Anvi Lounge /
**Anvi Social**. If 343°N should appear on the site (as the terrace's own identity, a
sister venue, or a second menu), say the word and it can be added as a page or a menu tab —
the data is already extracted.

---

## Design system (css/anvi.css)

- **Fonts** (embedded, the actual brand files): Eternal Compressed (display),
  Silk Serif Text (body), Pitch Sans Medium/Bold (UI).
- **Palette tokens**: Saffron Burgundy `#51241B` · Ivory Stone `#E0DAD0` · Sandalwood
  `#E2CEC0` · Warm Sandstone `#BA9477` · Rich Soil `#5D4133` · Neem `#3F3E2A` ·
  Soft Rose Peach `#D48E61` · Kohl `#231F20` (+ deepened night tones).
- **Scenes**: sections declare their hour of the evening (`t-ivory`, `t-sand`,
  `t-oxblood`, `t-soil`, `t-night`) and every component re-themes via CSS variables.
- **Motifs**: pure-CSS checkerboard hairlines (`repeating-conic-gradient` — no image),
  the peacock watermark, a hand-drawn "peacock eye" SVG (veil + peek page), film-grain
  overlay on night scenes (inline SVG turbulence).
- **Motion**: entrance veil (once per session), masked word-reveals, clip-path image
  reveals, parallax frames, the pinned Ascent, marquees, magnetic buttons, view-transition
  page fades. Everything respects `prefers-reduced-motion`; the site is fully readable
  with JavaScript disabled.

Menu page content is generated from `07 Operations/MENU/ANVI & 343 MENU.xlsx`
(ANVI MENU sheet). Signatures = dishes named *Anvi* / *Signature* / *343*;
vegetarian tags come from the workbook's own subcategories.

---

## ⚠️ Before you go live

1. **Photography** — images are the AI-upscaled brand-guideline shots (ETHR Design),
   used as placeholders. Confirm rights or swap in the real shoot (filenames are semantic:
   `food-*`, `int-*`, `social-*`, `drink-*`).
2. **Wire the forms** — all four forms (reserve / host / Founding 100 / peek) validate and
   show success states but only log to the console. Point `form[data-anvi]` in `js/anvi.js`
   at a real endpoint (Formspree / CRM webhook / WATI) — this is the guest-data capture the
   Digitol meeting is about.
3. **Lock the date** — update the three `data-count` attributes and the "mid-August" copy
   when the soft-launch date is confirmed.
4. **Confirm contact & handles** — phone `+234 811 043 8371`, address
   `1613B Adewunmi Ogunsanya Ave`, `@anvilagos` / `@anvisocial`, and add the public
   reservations email + domain (then fill `sitemap.xml` / `robots.txt`).
5. **Hours & pricing** — trading hours and menu prices are deliberately absent
   ("a living menu"); add at opening.
6. **Analytics + Google Business Profile** — add your snippet; the strategy flags Google
   as where Lagos diners *confirm* a venue.

Brand identity by **ETHR Design** · plans by **Chromed** · site built to that identity.
© Anvi Hospitality Limited · RC 8404218 · *Where cultures connect.*
