# ANVI — Website

A cinematic, editorial website for **Anvi Hospitality Ltd**, built directly from the
Anvi 2025 Brand Guidelines, the company profile, the marketing & strategy review, and the
live menu. Static HTML/CSS/JS — no build step, no dependencies.

> **Anvi** — from the Sanskrit for *“connected”; one who brings people together.*
> Where cultures connect.

---

## Quick start

It's a plain static site. Either:

```bash
# Option A — just open it
open index.html

# Option B — serve it (recommended; needed for fonts/SVG over http)
cd anvi-website
python3 -m http.server 8712
# → http://localhost:8712
```

Deploy by uploading the folder to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3, or a normal web server).

---

## Pages

| File | Page | Purpose |
|------|------|---------|
| `index.html` | **Home** | Hero, brand statement, the three floors, signatures, Anvi Social teaser, activations, gallery, guest-list capture |
| `lagos.html` | **Anvi Lagos** | The dining experience — ground + first floor, the kitchen, private dining, signature dishes |
| `social.html` | **Anvi Social** | The rooftop terrace — events, nightlife, the social calendar, enquiry |
| `menu.html` | **Menu** | The full Indo-Asian menu (123 dishes) with North Indian / Pan-Asian filtering; signatures marked ✦ |
| `about.html` | **Story** | The name, vision, mission, values, design philosophy, the peacock |
| `reservations.html` | **Visit** | Reserve a table · event enquiry · join the guest list · contact · hours · map |
| `coming-soon.html` | **Coming Soon** | A standalone luxury pre-launch landing — cinematic backdrop, live countdown, guest-list capture. Use this as the public site during the tease phase (rename to `index.html`, or point the domain root here), then switch to the full site at opening. Edit the opening date in the inline `<script>` (`TARGET`). |

---

## Design system → straight from the brand guidelines

**Fonts** (embedded in `assets/fonts/`, the actual brand files):
- **Eternal Compressed** → headings & display (the big serif)
- **Silk Serif Text** → body copy
- **Pitch Sans Bold** → sub-headings (uppercase)
- **Pitch Sans Medium** → accents / kickers (uppercase)

**Colour palette** (CSS tokens in `css/anvi.css`):
`Saffron Burgundy #51241B` · `Ivory Stone White #E0DAD0` · `Warm Sandstone Brown #BA9477` ·
`Rich Soil Brown #5D4133` · `Neem Leaf Green #3F3E2A` · `Sandalwood Dust Beige #E2CEC0` ·
`Soft Rose Peach #D48E61` · `Kohl Night Black #231F20`.

**Logo & peacock**: converted from the vector brand package to SVG (`assets/logo/`),
with white / burgundy / peach variants for light and dark backgrounds.

**Patterns**: the hand-drawn checkerboard motif from the brand package is used as a
subtle section divider (`assets/img/pattern-check.png`).

---

## How the marketing strategy is built in

Drawn from the *Marketing & Strategy Review* (the "five moves that matter"):

- **Two brands, one destination** — Anvi Lagos (dining) and Anvi Social (events) are
  distinct sections, cross-promoted throughout (*"dine downstairs, host upstairs"*).
- **Experience first, cuisine second** — the whole site leads with atmosphere and story.
- **Contact-capturing guest list** — the pre-launch waitlist collects **email + WhatsApp**
  (not just social follows) on the home page and `reservations.html#waitlist`, feeding the
  CRM spine the strategy calls for.
- **Two booking journeys** — separate **reservation** (dining) and **event enquiry** flows.
- **Activations as engines** — Chef's Table, Guest Chef Series, Sound Sessions, Founder's
  Club, etc. are surfaced as a programmed calendar.
- **Discovery ready** — clean semantic HTML, per-page `<title>`/meta descriptions and
  Open Graph tags, a WhatsApp click-to-chat, and an embedded Google map.

---

## ⚠️ Before you go live — please action these

1. **Photography.** The images in `assets/img/` are the exact shots used in the Anvi brand
   guidelines (by ETHR Design) — they perfectly match the intended art direction and are used
   here as *placeholders*. They were embedded in the guidelines at low resolution, so they've
   been **AI-upscaled (super-resolution) to ~1500px and saved as optimised JPEGs** for crisp
   display; dish labels have been matched to what each photo actually shows. Still: **confirm
   you have rights to them, or swap in Anvi's own professional shoot** before public launch.
   Filenames are semantic (`food-*`, `int-*`, `social-*`, `drink-*`) so replacement is a drop-in.
2. **Wire up the forms.** All three forms (reserve / enquiry / guest list) currently run a
   front-end demo (validate → success message; submissions logged to the console). Point
   them at a real endpoint — Formspree, a CRM, or a WhatsApp/email webhook — in
   `js/anvi.js` (`form[data-anvi-form]` handler). This is the CRM capture the strategy needs.
3. **Confirm contact details.** Phone `+234 811 043 8371` and address
   `1613B Adewunmi Ogunsanya Ave, Victoria Island` are from the company profile.
   Instagram handles `@anvilagos` / `@anvisocial` are from the strategy doc. Add a public
   reservations email and confirm the domain/handles.
4. **Opening date & hours.** Currently "Opening 2026" and *Tue–Sun, 4pm till late* (from the
   brand collateral). Update to the confirmed soft-launch date and trading hours.
5. **Menu pricing.** Dish names and descriptions are live; prices are intentionally omitted
   (the menu is marked "a living menu"). Add pricing when finalised.
6. **Analytics & Google Business Profile.** Add your analytics snippet and make sure the GBP
   is set up — the strategy flags reviews/Google as where Lagos diners "confirm" a venue.

---

## Structure

```
anvi-website/
├── index.html  lagos.html  social.html  menu.html  about.html  reservations.html
├── css/anvi.css          # design system + all components
├── js/anvi.js            # nav, scroll reveals, menu filter, forms
└── assets/
    ├── fonts/            # the four brand typefaces
    ├── logo/             # ANVI wordmark + peacock (SVG, colour variants)
    └── img/              # photography + brand pattern
```

Brand identity by **ETHR Design**. Website built to that identity.
© Anvi Hospitality Ltd · *Where Cultures Connect.*
