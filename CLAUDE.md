# ANVI website — build context

Static HTML/CSS/JS, no build step. Live: https://anvilagos.com (Vercel, auto-deploys on push to main).

## Critical mechanics
- TEASE PHASE: `vercel.json` gate — public sees ONLY coming-soon.html; `/sneak/` is the
  full-site preview corridor. LAUNCH = delete vercel.json, push. Do not break the gate.
- Local preview: `python3 -m http.server 8712` (or the "Open ANVI Website.command" launcher).
- After ANY edit to css/anvi.css or js/anvi.js: bump the `?v=` query on BOTH files in ALL
  eight HTML pages, or phones serve stale cached assets.

## Launch date — CONFIRMED: 28 August 2026
Soft launch is locked: **2026-08-28**. Four places must always agree — this line and the
three `data-count="2026-08-28"` attributes (coming-soon.html, index.html, reservations.html).
If the date ever moves: change all four together, then grep pages for "late August" copy.

## Canon — never contradict
- Floors: G "The Dining Room" (all ages, no bar service) · 1 "Bar One" (18+, one private
  dining room, seats up to 25) · 2 "The Social House" (80–90 guests, 18+). Never "terrace".
- Language: "the guest list" (never "Founding 100") · "Modern Indo-Asian Cuisine" ·
  "Restaurant · Bar · Social House" · tagline "Where cultures connect."
- Hours: Mon–Sun, 12 pm–11 pm (interim). No menu prices before opening.
- Contact: +234 811 043 8371 (temporary/personal) · info@anvilagos.com · @anvilagos, @anvisocial.

## Forms
All `data-anvi` forms POST to Web3Forms — key lives in js/anvi.js, delivers to the house
inbox. Server-side (curl) submits are blocked by their free tier: test from a real browser.
Keep the hidden `botcheck` honeypot in every form.

## DNS — hands off unless explicitly asked
Namecheap. Apex = ALIAS → cname.vercel-dns.com. NEVER point apex at A 76.76.21.21 (legacy
Vercel IP; times out from Nigerian ISPs). MX/SPF/DKIM rows = the company's Google email.

## Reference (open only when needed — do not preload)
README.md (full docs + pre-launch checklist) · COLLABORATE.md (git workflow) · git log (v1/v2).
