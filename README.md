# ANVI — Website (v3 · "The Invitation")

A candlelit, ceremonial website for **Anvi Hospitality Limited** — the third ground-up
design of this site, built from the full ANVI document set: the 2025 brand guidelines,
company profile, business plan, *Brand & Strategy Brief*, *Pre-Launch Command Plan*, the
Chromed design plans, the per-floor Rules of Engagement, and the live **ANVI & 343 MENU**
workbook. Static HTML/CSS/JS — no build step, no dependencies.

> **Anvi** — from the Sanskrit for *"connected"; one who brings people together.*
> Where cultures connect.

The design concept: **the site is a gilded invitation.** Dark, centered and ornamental —
Mughal-arch frames with fine gold linework, slow-turning peacock-eye mandalas, roman-numeral
medallions, checkerboard hairlines in gold thread, and parchment "invitation cards" for the
human moments (the signature menu, the RSVP). The homepage hero is a shrine: an arch of
slowly crossfading photography beneath the wordmark, with pointer-depth parallax.

Earlier versions live in git history: `v1` (classic dark editorial) and
`v2 — "one building, one evening"` (light-first magazine with the pinned floor Ascent).
`git log --oneline` to browse; any version can be restored.

---

## Quick start

```bash
cd anvi-website
python3 -m http.server 8712      # → http://localhost:8712
# or double-click "Open ANVI Website.command"
```

Deploy by uploading the folder to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3).

---

## Pages

| File | Page | Notes |
|------|------|-------|
| `index.html` | **Home** | The shrine hero (arch slideshow, pointer parallax, live T-minus), the invitation manifesto, **the Three Doors** (arch-framed floors with tilt), medallions, **the Banquet Card** (first tastes, in development), Anvi Social feature, the two opening rituals, arched colonnade gallery, Founding 100 RSVP card |
| `lagos.html` | **Dine** | The Dining Room (72 covers), The Bar & Dining (first floor, 18+), **the** private dining room, the kitchen's four crafts, Chef's Table |
| `social.html` | **Social** | **The Social House** (80–90 guests, 18+) — bar, DJ booth + LED stage, VIP booths, host feature, Sound Sessions |
| `menu.html` | **Menu** | Mirrors the family's working draft — **Food Menu v3 (Blended Indo-Asian)**: 75 dishes in 9 craft chapters ("in tasting" until opening; drinks list teased as *to follow*); scrollspy rail, search, vegetarian filter, print stylesheet |
| `about.html` | **Story** | The name, vision & mission (verbatim), five values in roman numerals, design philosophy, the peacock, road-to-opening |
| `reservations.html` | **Visit** | Three journeys (Reserve / Host / Founding 100) with deep links (`#reserve` `#host` `#list`), forms on invitation cards, house notes, contact & hours |
| `coming-soon.html` | **Take a Peek** | The pre-launch landing from the Digitol plan: interactive **peephole** over the room, live countdown, **email + WhatsApp capture**. Point the storefront QR here. |
| `404.html` | Not found | "This door doesn't open." |

---

## What's wired in from the strategy docs

- **Soft launch: mid-August 2026.** All countdowns target `2026-08-15 18:00 WAT` —
  change `data-count="2026-08-15"` (index, reservations, coming-soon) when the date locks.
- **The Founding 100** — pre-launch waitlist capture (email **and WhatsApp**) on the home
  page, visit page and peek page; framed as a numbered invitation. This is the CRM spine the
  strategy review and the Digitol plan prioritise.
- **Confirmed facts only** — Ground: dining (72 covers, all ages). First: **bar & dining**
  with ONE private dining room (18+). Second: the **Social House** (80–90, 18+) — never
  "terrace". Public branding is **Est. 2026**. (All confirmed by Pratik, 2–3 Jul 2026.)
- **House notes** — dress code, 18+ floors, smoking, photography, outside food — condensed
  from the three Rules of Engagement documents.
- **Footer legal** — Anvi Hospitality Limited · RC 8404218.

### On the menu, and "343 Degree North"
The site's menu mirrors the family's working draft — `07 Operations/MENU/ANVI - Food Menu
v3 (Blended Indo-Asian).docx` (75 dishes, 9 craft-based chapters, ★ signatures → ✦ on the
site). It is framed as **"the first card, in tasting"** because the draft's own notes say
dishes and pricing aren't locked. The internal *Backburner* pipeline and design notes are
deliberately NOT published. The drinks list is teased as "to follow", per the draft.
`ANVI & 343 MENU.xlsx` is an old menu from **343 — the family's other restaurant** — and
must never be used as Anvi's menu.

---

## Design system (css/anvi.css)

- **Fonts** (embedded, the actual brand files): Eternal Compressed (display),
  Silk Serif Text (body), Pitch Sans Medium/Bold (UI).
- **Palette tokens**: Saffron Burgundy `#51241B` · Ivory Stone `#E0DAD0` · Sandalwood
  `#E2CEC0` · Warm Sandstone `#BA9477` · Rich Soil `#5D4133` · Neem `#3F3E2A` ·
  Soft Rose Peach `#D48E61` (reads as antique gold on night) · Kohl `#231F20`.
- **Scenes**: `t-night`, `t-oxblood`, `t-soil`, `t-parchment` — sections declare their
  scene and every component re-themes via CSS variables.
- **Signature components**: the arch (`.arch` / `.arch-frame`, pure CSS round-top frames
  with a gold keystone ✦), invitation cards (`.invite`, double-ruled parchment), roman
  medallions, ornamental rules (─ ✦ ─), spinning peacock-eye mandalas (inline SVG),
  gold-thread checkerboard hairlines, gradient-gold display type (`.gilt`).
- **Motion**: arch-drawing entrance veil (once per session), pointer-depth parallax on the
  hero, door tilt, masked word reveals, arch clip reveals, marquees, view-transition page
  fades. Everything respects `prefers-reduced-motion`; fully readable with JS disabled.
- **Chrome**: centered-crest header (nav split around the wordmark), crest footer with the
  walking peacock.

The public programme is deliberately minimal for launch — **Chef's Table** (dining room,
bimonthly) and **Sound Sessions** (Social House, weekends) — one anchor per floor, with the
calendar framed to grow. The other activations from the strategy docs are held back for
later seasons. Pages chain through a **"next stop" ribbon** so the site reads as one
evening: Home → Dine → Social House → Menu → Reserve (Story → Dine).

---

## ⚠️ Before you go live

1. **Photography** — images are the AI-upscaled brand-guideline shots (ETHR Design), used
   as placeholders. Confirm rights or swap in the real shoot (filenames are semantic:
   `food-*`, `int-*`, `social-*`, `drink-*`).
2. **Wire the forms** — all four forms (reserve / host / Founding 100 / peek) validate and
   show success states but only log to the console. Point `form[data-anvi]` in `js/anvi.js`
   at a real endpoint (Formspree / CRM webhook / WATI) — this is the guest-data capture the
   Digitol engagement is about.
3. **Lock the date** — update the three `data-count` attributes and the "mid-August" copy
   when the soft-launch date is confirmed.
4. **Confirm contact & handles** — phone `+234 811 043 8371`, address
   `1613B Adewunmi Ogunsanya Ave`, `@anvilagos` / `@anvisocial`; add the public reservations
   email + domain (then fill `sitemap.xml` / `robots.txt`).
5. **Hours & pricing** — trading hours and menu prices are deliberately absent
   ("a living menu"); add at opening.
6. **Analytics + Google Business Profile** — add your snippet; the strategy flags Google as
   where Lagos diners *confirm* a venue.

---

## Hosting on Vercel — tease phase (coming-soon only)

The repo ships with a `vercel.json` **gate**: on Vercel, visitors see **only the
coming-soon page** at the root URL, and every other page (`/menu.html`, `/lagos`,
etc.) bounces back to it with a temporary redirect. Assets stay reachable, nothing
is cached permanently, and the full site remains hidden until you flip it.

**Deploy (one time, ~5 min):**
1. Create a free account at vercel.com — sign up **with GitHub**.
2. "Add New… → Project" → import **Anvi-Website** → framework: *Other*, no build
   command, output directory: (leave default) → **Deploy**.
3. You get a URL like `anvi-website.vercel.app`. Every `git push` redeploys it
   automatically.

**To launch the full site later:** delete `vercel.json` (or just its `rewrites`
and `redirects`), commit, push. That's the whole flip.

Note: direct asset URLs (e.g. a photo path) remain technically reachable during the
tease — fine for a restaurant, but don't put anything confidential in `assets/`.


Brand identity by **ETHR Design** · plans by **Chromed** · site built to that identity.
© Anvi Hospitality Limited · RC 8404218 · *Where cultures connect.*
